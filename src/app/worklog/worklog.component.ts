import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { RecordType } from "../core/enums/record-type";
import { Worklog } from "../core/models/worklog";
import { WorklogService } from "./worklog.service";
import { TimerItem } from "../core/models/timerItem";

var _ = require("lodash");

@Component({
  selector: "app-worklog",
  templateUrl: "worklog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorklogComponent implements OnInit {
  title = "Worklog";
  recordType: RecordType = RecordType.Worklog;
  worklogItems: Worklog[];
  worklog: Worklog;
  dialogOpen = false;
  timerOpen = false;

  timerItem: TimerItem = null;

  constructor(
    private worklogService: WorklogService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.worklogService.worklogItems$.subscribe((res) => {
      this.worklogItems = res;
    });

    this.worklogService.timerItem$.subscribe((res) => {
      this.timerItem = _.cloneDeep(res);
      this.ref.detectChanges();
    });

    if (this.worklogService.isRunning()) {
      this.timerOpen = true;
      this.worklogService.subscribeTimer();
    }
  }

  // worklog actions
  //

  deleteWorklog(id: string): void {
    this.worklogService.removeWorklogItem(id);
  }

  editWorklog(id: string): void {
    this.worklog = this.worklogItems.find((x) => x.id == id);
    this.showDialog();
  }

  addOrUpdateTitle(worklog: Worklog): void {
    if (worklog.id) {
      this.worklogService.updateTitle(worklog.id, worklog.title);
    } else {
      this.worklogService.addWorklog(worklog);
    }

    this.closeDialog();
  }

  clearAll(): void {
    this.worklogService.removeAllWorklogItems();
  }

  exportWorklogs(): void {
    this.worklogService.exportWorklogs(this.worklogItems);
  }

  // dialog for editing worklog description
  //

  showDialog() {
    this.dialogOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
    this.worklog = undefined;
  }

  // timer trigger
  //

  showTimer() {
    this.timerOpen = true;
    this.worklogService.startTimer();
  }

  closeTimer(worklog: Worklog) {
    this.timerOpen = false;
    this.worklogService.stopTimer();
    this.worklogService.addWorklog(worklog);
  }
}

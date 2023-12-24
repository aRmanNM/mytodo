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
import { PrettifyMSPipe } from "../shared/pipes/prettify-ms.pipe";
import { DurationPipe } from "../shared/pipes/duration.pipe";

import { defaultWorkplaces } from "../core/models/workplaces";

var _ = require("lodash");

@Component({
  selector: "app-worklog",
  templateUrl: "worklog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorklogComponent implements OnInit {
  title;
  recordType: RecordType = RecordType.Worklog;
  worklogItems: Worklog[];
  worklog: Worklog;
  dialogOpen = false;
  timerOpen = false;

  timerItem: TimerItem = null;

  workplaces = defaultWorkplaces;

  constructor(
    private worklogService: WorklogService,
    private ref: ChangeDetectorRef,
    private prettifyMSPipe: PrettifyMSPipe,
    private durationPipe: DurationPipe
  ) {}

  ngOnInit() {
    this.worklogService.worklogItems$.subscribe((res) => {
      this.worklogItems = res;
      if (res.length > 0) {
        this.title = `WORKLOG (${this.prettifyMSPipe.transform(
          res.reduce(
            (n, { end, start }) => n + this.durationPipe.transform(start, end),
            0
          )
        )})`;
      } else {
        this.title = "WORKLOG";
      }
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

  addOrUpdate(worklog: Worklog): void {
    if (worklog.id) {
      this.worklogService.updateWorklogItem(
        worklog.id,
        worklog.title,
        worklog.workplaceIndex
      );
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
    this.title = "EDIT";
  }

  closeDialog() {
    this.dialogOpen = false;
    this.worklog = undefined;
  }

  // timer trigger
  //

  async showTimer() {
    await this.worklogService.startTimer();
    this.timerOpen = true;
    this.title = "TIMER";
  }

  closeTimer(worklog: Worklog) {
    this.timerOpen = false;
    this.worklogService.stopTimer();
    this.worklogService.addWorklog(worklog);
  }
}

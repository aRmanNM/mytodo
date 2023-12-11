import { Component, OnInit } from "@angular/core";
import { RecordType } from "../core/enums/record-type";
import { Worklog } from "../core/models/worklog";
import { WorklogService } from "./worklog.service";

@Component({
  selector: "app-worklog",
  templateUrl: "worklog.component.html",
})
export class WorklogComponent implements OnInit {
  title = "Worklog";
  recordType: RecordType = RecordType.Worklog;
  worklogItems: Worklog[];
  worklog: Worklog;
  dialogOpen = false;
  timerOpen = false;
  constructor(private worklogService: WorklogService) {}

  ngOnInit() {
    this.worklogService.worklogItems$.subscribe((res) => {
      this.worklogItems = res;
    });

    this.timerOpen = this.worklogService.checkTimerServiceRunning();
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
    this.worklogService.startTimerService();
  }

  closeTimer(worklog: Worklog) {
    this.timerOpen = false;
    this.worklogService.stopTimerService();
    this.worklogService.addWorklog(worklog);
  }
}

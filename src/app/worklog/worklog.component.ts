import { Component, OnInit } from "@angular/core";
import { Worklog } from "../core/models/worklog";
import { WorklogService } from "./worklog.service";

@Component({
  selector: "app-worklog",
  templateUrl: "worklog.component.html",
})
export class WorklogComponent implements OnInit {
  worklogItems: Worklog[];
  worklog: Worklog;
  dialogOpen = false;
  timerOpen = false;
  constructor(private worklogService: WorklogService) {}

  ngOnInit() {
    this.worklogService.worklogItems$.subscribe((res) => {
      this.worklogItems = res;
    });
  }

  deleteWorklog(key: string): void {
    this.worklogService.removeWorklogItem(key);
  }

  editWorklog(key: string): void {
    this.worklog = this.worklogItems.find((x) => x.key == key);
    this.showDialog();
  }

  showDialog() {
    this.dialogOpen = true;
  }

  showTimer() {
    this.timerOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
    this.worklog = undefined;
  }

  closeTimer(worklog: Worklog) {
    this.timerOpen = false;
    this.worklog;
    this.closeDialog();
    this.worklogService.addWorklog(worklog);
  }

  addOrUpdateTitle(worklog: Worklog): void {
    if (worklog.key) {
      this.worklogService.updateTitle(worklog.key, worklog.title);
    } else {
      this.worklogService.addWorklog(worklog);
    }

    this.closeDialog();
  }

  clearAll(): void {
    this.worklogService.removeAllWorklogItems();
  }
}

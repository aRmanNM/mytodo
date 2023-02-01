import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../core/services/storage.service";
import { Worklog } from "../core/models/worklog";
import { Base } from "../core/models/base";
import { RecordType } from "../core/enums/record-type";

@Injectable({ providedIn: "root" })
export class WorklogService {
  private readonly _worklogItems = new BehaviorSubject<Worklog[]>([]);
  readonly worklogItems$ = this._worklogItems.asObservable();
  constructor(private storageService: StorageService) {
    this.getWorklogItems();
  }

  getWorklogItems() {
    let items: Base[] = this.storageService.getAll();
    let worklogItems: Worklog[] = (items as Worklog[]).filter(
      (x) => x.recordType == RecordType.Worklog
    );
    // worklogItems.sort(
    //   (x, y) => x.start.getTime() - y.start.getTime()
    // );

    this._worklogItems.next(worklogItems);
  }

  updateTitle(key: string, title: string) {
    let worklogItem: Worklog = this.storageService.get(key);
    worklogItem.title = title;
    this.storageService.set(worklogItem);
    this.getWorklogItems();
  }

  removeWorklogItem(key: string) {
    this.storageService.remove(key);
    this.getWorklogItems();
  }

  removeAllWorklogItems() {
    this._worklogItems.value.forEach((x) => this.removeWorklogItem(x.key));
    this.getWorklogItems();
  }

  addWorklog(worklog: Worklog) {
    worklog.recordType = RecordType.Worklog;
    this.storageService.set(worklog);
    this.getWorklogItems();
  }
}

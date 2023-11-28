import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../core/services/storage.service";
import { Worklog } from "../core/models/worklog";
import { RecordType } from "../core/enums/record-type";
import { FileService } from "../core/services/file.service";
import { PersianDatePipe } from "../shared/pipes/persian-date.pipe";

@Injectable({ providedIn: "root" })
export class WorklogService {
  private readonly _worklogItems = new BehaviorSubject<Worklog[]>([]);
  readonly worklogItems$ = this._worklogItems.asObservable();
  constructor(
    private storageService: StorageService,
    private fileService: FileService,
    private persianDatePipe: PersianDatePipe
  ) {
    this.getWorklogItems();
  }

  getWorklogItems() {
    let worklogItems: Worklog[] = this.storageService.getAll(
      RecordType.Worklog
    );
    this._worklogItems.next(worklogItems);
  }

  updateTitle(id: string, title: string) {
    let worklogItem: Worklog = this.storageService.get(id);
    worklogItem.title = title;
    this.storageService.update(id, worklogItem);
    this.getWorklogItems();
  }

  removeWorklogItem(id: string) {
    this.storageService.remove(id);
    this.getWorklogItems();
  }

  removeAllWorklogItems() {
    this._worklogItems.value.forEach((x) => this.removeWorklogItem(x.id));
    this.getWorklogItems();
  }

  addWorklog(worklog: Worklog) {
    worklog.recordType = RecordType.Worklog;
    this.storageService.set(worklog);
    this.getWorklogItems();
  }

  exportWorklogs(worklogs: Worklog[]) {
    if (worklogs.length == 0) return;

    let exportModel: any[] = [];

    worklogs.forEach((worklog) => {
      let model = {
        start: this.persianDatePipe.transform(worklog.start.toString(), true),
        end: this.persianDatePipe.transform(worklog.end.toString(), true),
        title: worklog.title,
      };

      exportModel.push(model);
    });

    this.fileService.exportCSV(exportModel);
  }
}

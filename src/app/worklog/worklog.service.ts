import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../core/services/storage.service";
import { Worklog } from "../core/models/worklog";
import { RecordType } from "../core/enums/record-type";
import { FileService } from "../core/services/file.service";
import {
  DateTimeTransformType,
  PersianDatePipe,
} from "../shared/pipes/persian-date.pipe";
import { ToastService } from "../core/services/toast.service";
import { TimerService } from "../core/services/timer.service";

@Injectable()
export class WorklogService {
  private readonly _worklogItems = new BehaviorSubject<Worklog[]>([]);
  readonly worklogItems$ = this._worklogItems.asObservable();

  constructor(
    private storageService: StorageService,
    private fileService: FileService,
    private persianDatePipe: PersianDatePipe,
    private toastService: ToastService,
    private timerService: TimerService
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
        date: this.persianDatePipe.transform(
          worklog.start.toString(),
          DateTimeTransformType.Date
        ),
        startTime: this.persianDatePipe.transform(
          worklog.start.toString(),
          DateTimeTransformType.Time
        ),
        endTime: this.persianDatePipe.transform(
          worklog.end.toString(),
          DateTimeTransformType.Time
        ),
        title: worklog.title,
      };

      exportModel.push(model);
    });

    var res = this.fileService.exportCSV(exportModel);
    if (res) {
      this.toastService.createSimpleToast("DONE");
    } else {
      this.toastService.createSimpleToast("FAILED");
    }
  }

  startTimerService() {
    this.timerService.startTimerForegroundService();
  }

  stopTimerService() {
    this.timerService.stopTimerForegroundService();
  }

  checkTimerServiceRunning(): boolean {
    return this.timerService.checkServiceRunning();
  }
}

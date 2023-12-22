import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription, interval } from "rxjs";
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
import { TimerItem } from "../core/models/timerItem";
import { TimerForegroundService } from "../core/services/timer-foreground-service.android";

import { defaultWorkplaces } from "../core/models/workplaces";

@Injectable()
export class WorklogService {
  private readonly _worklogItems = new BehaviorSubject<Worklog[]>([]);
  readonly worklogItems$ = this._worklogItems.asObservable();

  private readonly _timerItem = new BehaviorSubject<TimerItem>(null);
  readonly timerItem$ = this._timerItem.asObservable();

  timerSubscription: Subscription = null;

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

  updateWorklogItem(id: string, title: string, workplaceIndex: number) {
    let worklogItem: Worklog = this.storageService.get(id);

    worklogItem.title = title;
    worklogItem.workplaceIndex = workplaceIndex;

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
        workplace: defaultWorkplaces[worklog.workplaceIndex],
        title: worklog.title,
      };

      exportModel.push(model);
    });

    var res = this.fileService.exportCSV(exportModel);
    if (res) {
      this.toastService.showSimpleToast("DONE");
    } else {
      this.toastService.showSimpleToast("FAILED");
    }
  }

  // timer functions
  //

  startTimer() {
    this.timerService.startTimerForegroundService();
    this.subscribeTimer();
  }

  stopTimer() {
    this.timerService.stopTimerForegroundService();
    this.unsubscribeTimer();
  }

  subscribeTimer() {
    if (this.timerSubscription != null) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      this._timerItem.next({
        startedAt: TimerForegroundService.StartedAt,
        timerValue: TimerForegroundService.TimerValue,
      });
    });
  }

  unsubscribeTimer() {
    if (this.timerSubscription != null) {
      this.timerSubscription.unsubscribe();
      return;
    }
  }

  isRunning(): boolean {
    return this.timerService.isRunning();
  }
}

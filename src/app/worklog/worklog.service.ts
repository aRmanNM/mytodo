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
import * as permission from "nativescript-permissions";
import { TimerForegroundService } from "./timer/timer-foreground-service.android";
import { getApplicationContext } from "@nativescript/core/utils/android";

@Injectable()
export class WorklogService {
  private readonly _worklogItems = new BehaviorSubject<Worklog[]>([]);
  readonly worklogItems$ = this._worklogItems.asObservable();

  constructor(
    private storageService: StorageService,
    private fileService: FileService,
    private persianDatePipe: PersianDatePipe,
    private toastService: ToastService
  ) {
    this.registerBroadCastReceiver();
    this.getWorklogItems();
  }

  // link: https://github.com/NikolayBa/NativeScriptTestAndroidService/blob/master/src/app/home/home.component.ts#L42
  registerBroadCastReceiver() {
    const cb = (<any>android.content.BroadcastReceiver).extend({
      onReceive: (context, data: android.content.Intent) => {
        const worklog: Worklog = {
          start: new Date(data.getStringExtra("StartedAt")),
          end: new Date(data.getStringExtra("EndedAt")),
          id: undefined,
          recordType: RecordType.Worklog,
          title: "",
          createdAt: Date.now(),
        };

        this.addWorklog(worklog);
      },
    });

    var _onReceivedCallback = new cb();
    var broadcastManager =
      androidx.localbroadcastmanager.content.LocalBroadcastManager.getInstance(
        getApplicationContext()
      );
    broadcastManager.registerReceiver(
      _onReceivedCallback,
      new android.content.IntentFilter(
        "org.nativescript.TimerForegroundService"
      )
    );
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

  startTimerForegroundService() {
    permission
      .requestPermission("android.permission.FOREGROUND_SERVICE")
      .catch((er) => {
        console.warn("failed to acquire permission: FOREGROUND_SERVICE");
      });

    // this is not used. just added this to avoid a runtime exception
    const tfs = new TimerForegroundService();

    const context = getApplicationContext();
    const intent = new android.content.Intent();
    intent.setClassName(context, "org.nativescript.TimerForegroundService");
    context.startForegroundService(intent);
  }

  stopTimerForegroundService() {
    const context = getApplicationContext();
    const intent = new android.content.Intent();
    intent.setClassName(context, "org.nativescript.TimerForegroundService");
    context.stopService(intent);
  }
}

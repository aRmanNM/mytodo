import { Injectable } from "@angular/core";
import { getApplicationContext } from "@nativescript/core/utils/android";
import * as permission from "nativescript-permissions";
import { TimerForegroundService } from "./timer-foreground-service.android";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class TimerService {
  private readonly _timerItem = new BehaviorSubject<any>({});
  readonly timerItem$ = this._timerItem.asObservable();

  constructor() {
    if (!this.checkServiceRunning()) {
      // this probably wont be disposed if app removed from ram
      this.registerBroadCastReceiver();
    }
  }

  startTimerForegroundService() {
    // clear previous state
    this._timerItem.next({});

    permission
      .requestPermission("android.permission.FOREGROUND_SERVICE")
      .catch((er) => {
        console.warn("failed to acquire permission: FOREGROUND_SERVICE");
      });

    // what is this line of code doing ?!
    const srv = new TimerForegroundService();

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

  checkServiceRunning(): boolean {
    return TimerForegroundService.isRunning;
  }

  // link: https://github.com/NikolayBa/NativeScriptTestAndroidService/blob/master/src/app/home/home.component.ts#L42
  registerBroadCastReceiver() {
    const cb = (<any>android.content.BroadcastReceiver).extend({
      onReceive: (context, data: android.content.Intent) => {
        const timerItem = {
          startedAt: new Date(data.getStringExtra("StartedAt")),
          timerValue: data.getStringExtra("TimerValue"),
        };

        this._timerItem.next(timerItem);
      },
    });

    var _onReceivedCallback = new cb();

    getApplicationContext().registerReceiver(
      _onReceivedCallback,
      new android.content.IntentFilter(
        "org.nativescript.TimerForegroundService"
      )
    );
  }
}

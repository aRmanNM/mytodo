import { Injectable } from "@angular/core";
import { getApplicationContext } from "@nativescript/core/utils/android";
import * as permission from "nativescript-permissions";
import { TimerForegroundService } from "./timer-foreground-service.android";

@Injectable()
export class TimerService {
  constructor() {}

  startTimerForegroundService() {
    permission
      .requestPermission("android.permission.FOREGROUND_SERVICE")
      .catch((er) => {
        console.warn("failed to acquire permission: FOREGROUND_SERVICE");
      });

    // this is somehow required to make sure class is created
    const t = new TimerForegroundService();

    const context = getApplicationContext();
    const intent = new android.content.Intent();
    intent.setClassName(context, "org.nativescript.TimerForegroundService");
    context.startForegroundService(intent);
  }

  stopTimerForegroundService() {
    TimerForegroundService.IntervalSubscription.unsubscribe();
    TimerForegroundService.Running = false;
    const context = getApplicationContext();
    const intent = new android.content.Intent();
    intent.setClassName(context, "org.nativescript.TimerForegroundService");
    context.stopService(intent);
  }

  isRunning(): boolean {
    if (TimerForegroundService.Running == null) {
      return false;
    }

    return TimerForegroundService.Running;
  }
}

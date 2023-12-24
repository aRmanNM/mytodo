import { Injectable } from "@angular/core";
import { getApplicationContext } from "@nativescript/core/utils/android";
import * as permission from "nativescript-permissions";
import { TimerForegroundService } from "./timer-foreground-service.android";
import { isAndroid } from "@nativescript/core";

@Injectable()
export class TimerService {
  constructor() {}

  async startTimerForegroundService() {
    if (isAndroid) {
      const sdkVersion = android.os.Build.VERSION.SDK_INT;
      if (sdkVersion > 27) {
        await permission.requestPermission(
          "android.permission.FOREGROUND_SERVICE"
        );
      }
    } else {
      throw Error("PLATFORM NOT SUPPORTED"); // maybe use a simple timer instead of worker service
    }

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

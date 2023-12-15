/// this foreground service boilerplate copied from sample code on this issue:
/// link: https://github.com/NativeScript/NativeScript/issues/6994

/// for sending broadcast intent i used this code sample:
/// link: https://github.com/NikolayBa/NativeScriptTestAndroidService/blob/master/src/app/testAndroidService.ts

import { Subscription, interval } from "rxjs";

@NativeClass()
@JavaProxy("org.nativescript.TimerForegroundService")
class TimerForegroundService extends android.app.Service {
  static Running: boolean = false;
  static IntervalSubscription: Subscription = null;

  static TimerValue: number = null;
  static StartedAt: Date = null;

  constructor() {
    super();
    return global.__native(this);
  }

  onStartCommand(intent, flags, startId) {
    if (!TimerForegroundService.Running) {
      TimerForegroundService.TimerValue = 0;
      TimerForegroundService.StartedAt = new Date();
      TimerForegroundService.IntervalSubscription = interval(1000).subscribe(
        () => {
          TimerForegroundService.TimerValue += 1000;
        }
      );
    }

    super.onStartCommand(intent, flags, startId);
    TimerForegroundService.Running = true;
    return android.app.Service.START_STICKY;
  }

  onCreate() {
    super.onCreate();
    this.startForeground(1, this.getNotification());
  }

  onBind(intent) {
    return super.onBind(intent);
  }

  onUnbind(intent) {
    return super.onUnbind(intent);
  }

  onDestroy() {
    this.stopForeground(true);
  }

  private getNotification() {
    const channel = new android.app.NotificationChannel(
      "channel_01",
      "TimerForegroundService Channel",
      android.app.NotificationManager.IMPORTANCE_DEFAULT
    );
    const notificationManager = this.getSystemService(
      android.content.Context.NOTIFICATION_SERVICE
    ) as android.app.NotificationManager;
    notificationManager.createNotificationChannel(channel);
    const builder = new android.app.Notification.Builder(
      this.getApplicationContext(),
      "channel_01"
    );

    return builder.build();
  }
}

// check here: https://docs.nativescript.org/best-practices/native-class#when-exported-from-a-file-and-used-elsewhere
export { TimerForegroundService };

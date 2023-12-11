/// this foreground service boilerplate copied from sample code on this issue:
/// link: https://github.com/NativeScript/NativeScript/issues/6994

/// for sending broadcast intent i used this code sample:
/// link: https://github.com/NikolayBa/NativeScriptTestAndroidService/blob/master/src/app/testAndroidService.ts

import { Subscription, interval } from "rxjs";

@NativeClass()
@JavaProxy("org.nativescript.TimerForegroundService")
class TimerForegroundService extends android.app.Service {
  static isRunning = false;

  started: boolean = false;
  intervalSub: Subscription;
  startedAt: Date;
  timerValue: number;

  constructor() {
    super();

    return global.__native(this);
  }

  onStartCommand(intent, flags, startId) {
    // setting initial values here is important!
    this.started = true;
    this.startedAt = new Date();
    this.timerValue = 0;

    this.intervalSub = interval(5000).subscribe(() => {
      this.timerValue += 5000;
      const intent = new android.content.Intent(
        "org.nativescript.TimerForegroundService"
      );

      intent.putExtra("StartedAt", this.startedAt.toString());
      intent.putExtra("TimerValue", this.timerValue.toString());

      this.getApplication().sendBroadcast(intent);
    });

    super.onStartCommand(intent, flags, startId);
    return android.app.Service.START_STICKY;
  }

  onCreate() {
    super.onCreate();
    this.startForeground(1, this.getNotification());
    TimerForegroundService.isRunning = true;
  }

  onDestroy() {
    this.stopForeground(true);
    this.intervalSub.unsubscribe(); // this is important!
    this.timerValue = 0;
    TimerForegroundService.isRunning = false;
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

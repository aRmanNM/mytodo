/// this foreground service boilerplate copied from sample code on this issue:
/// link: https://github.com/NativeScript/NativeScript/issues/6994

/// for sending broadcast intent i used this code sample:
/// link: https://github.com/NikolayBa/NativeScriptTestAndroidService/blob/master/src/app/testAndroidService.ts

import { Subscription, interval } from "rxjs";

@NativeClass()
@JavaProxy("org.nativescript.TimerForegroundService")
class TimerForegroundService extends android.app.Service {
  started: boolean = false;
  startedAt: Date;
  timerValue: number = 0;
  intervalSub: Subscription;

  constructor() {
    super();
    return global.__native(this);
  }

  onStartCommand(intent, flags, startId) {
    this.started = true;
    this.startedAt = new Date();

    this.intervalSub = interval(1000).subscribe(() => {
      this.timerValue += 1000;
    });

    super.onStartCommand(intent, flags, startId);
    return android.app.Service.START_STICKY;
  }

  onCreate() {
    super.onCreate();
    this.startForeground(1, this.getNotification());
  }

  onDestroy() {
    const intent = new android.content.Intent(
      "org.nativescript.TimerForegroundService"
    );
    var broadcastManager =
      androidx.localbroadcastmanager.content.LocalBroadcastManager.getInstance(
        this.getApplicationContext()
      );

    intent.putExtra("StartedAt", this.startedAt.toString());
    intent.putExtra("EndedAt", new Date().toString());

    broadcastManager.sendBroadcast(intent);

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

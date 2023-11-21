import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { interval, Subscription } from "rxjs";
import { RecordType } from "~/app/core/enums/record-type";
import { Worklog } from "~/app/core/models/worklog";
import { keepAwake, allowSleepAgain } from "@nativescript-community/insomnia";
import { Brightness } from "@nativescript/brightness";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit, OnDestroy {
  started: boolean = false;
  startedAt: Date;
  timerValue: number = 0;
  intervalSub: Subscription;
  brightness: Brightness;
  defaultBrightness: number;

  @Output() onStop = new EventEmitter<Worklog>();

  constructor() {}

  ngOnDestroy(): void {
    this.started = false;
    this.timerValue = 0;
    this.intervalSub.unsubscribe();
  }

  ngOnInit() {
    this.started = true;
    this.startedAt = new Date();

    keepAwake();

    this.intervalSub = interval(1000).subscribe(() => {
      this.timerValue += 1000;
    });
  }

  stop() {
    let worklog: Worklog = {
      start: this.startedAt,
      end: new Date(),
      id: undefined,
      recordType: RecordType.Worklog,
      title: "",
      createdAt: Date.now(),
    };

    allowSleepAgain();

    this.onStop.emit(worklog);
  }
}

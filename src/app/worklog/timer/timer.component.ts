import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { interval, Subscription } from "rxjs";
import { keepAwake, allowSleepAgain } from "@nativescript-community/insomnia";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit, OnDestroy {
  started: boolean = false;
  startedAt: Date;
  timerValue: number = 0;
  intervalSub: Subscription;

  @Output() onStop = new EventEmitter<void>();

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
    allowSleepAgain();
    this.onStop.emit();
  }
}

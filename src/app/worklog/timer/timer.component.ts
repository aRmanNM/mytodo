import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { interval, Subscription } from "rxjs";
import { Worklog } from "~/app/core/models/worklog";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit, OnDestroy {
  started: boolean = false;
  startedAt: Date;
  timerValue: number = 0;
  intervalSub: Subscription;

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

    this.intervalSub = interval(1000).subscribe(() => {
      this.timerValue += 1000;
    });
  }

  stop() {
    let worklog: Worklog = {
      start: this.startedAt,
      end: new Date(),
      key: undefined,
      recordType: undefined,
      title: undefined,
    };

    this.onStop.emit(worklog);
  }
}

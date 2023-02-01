import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Worklog } from "~/app/core/models/worklog";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit, OnDestroy {
  started: boolean = false;
  startedAt: Date;
  secondsPassed: number = 0;
  timer: NodeJS.Timer;

  @Output() onStop = new EventEmitter<Worklog>();

  constructor() {}

  ngOnDestroy(): void {
    this.started = false;
    this.secondsPassed = 0;
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.started = true;
    this.startedAt = new Date();

    this.timer = setInterval(() => {
      this.secondsPassed++;
    }, 1000);
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

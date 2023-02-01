import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Observable } from "@nativescript/core";
import { interval, Subscription, timer } from "rxjs";
import { Worklog } from "~/app/core/models/worklog";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit, OnDestroy {
  started: boolean = false;
  startedAt: Date;
  secondsPassed: number = 0;
  intervalSub: Subscription;

  @Output() onStop = new EventEmitter<Worklog>();

  constructor(private ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.started = false;
    this.secondsPassed = 0;
    this.intervalSub.unsubscribe();
  }

  ngOnInit() {
    this.started = true;
    this.startedAt = new Date();

    this.intervalSub = interval(1000).subscribe(() => {
      this.secondsPassed = this.secondsPassed + 1;
      // this.ref.markForCheck();
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

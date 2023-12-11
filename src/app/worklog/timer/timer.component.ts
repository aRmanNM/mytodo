import {
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
} from "@angular/core";
import { TimerService } from "~/app/core/services/timer.service";
import { Worklog } from "~/app/core/models/worklog";
import { RecordType } from "~/app/core/enums/record-type";
import { Subscription } from "rxjs";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit {
  @Output() onStop = new EventEmitter<Worklog>();

  startedAt;
  timerValue;

  timerItemSubscription: Subscription;

  constructor(private timerService: TimerService, private zone: NgZone) {}

  ngOnInit() {
    this.timerItemSubscription = this.timerService.timerItem$.subscribe(
      (timerItem) => {
        console.log("timerItem: ", timerItem);
        console.log("startedAt: ", this.startedAt);
        console.log("timerValue: ", this.timerValue);
        // this.zone.run(() => {
        //   this.startedAt = timerItem.startedAt;
        //   this.timerValue = timerItem.timerValue;
        // });
      }
    );
  }

  stop() {
    this.timerItemSubscription.unsubscribe();

    let worklog: Worklog = {
      start: this.startedAt,
      end: new Date(), // TODO: calculate this (startedAt + timerValue)
      id: undefined,
      recordType: RecordType.Worklog,
      title: "",
      createdAt: Date.now(),
    };

    this.onStop.emit(worklog);
  }
}

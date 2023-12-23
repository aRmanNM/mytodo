import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Worklog } from "~/app/core/models/worklog";
import { RecordType } from "~/app/core/enums/record-type";
import { TimerItem } from "~/app/core/models/timerItem";

@Component({
  selector: "app-timer",
  templateUrl: "timer.component.html",
})
export class TimerComponent implements OnInit {
  @Output() onStop = new EventEmitter<Worklog>();

  private _timerItem;
  @Input() set timerItem(value: TimerItem) {
    this._timerItem = value;
  }

  get timerItem(): TimerItem {
    return this._timerItem;
  }

  constructor() {}

  ngOnInit() {
    this._timerItem = null;
  }

  stop() {
    const worklog: Worklog = {
      start: this.timerItem?.startedAt,
      end: new Date(
        this.timerItem?.startedAt.getTime() + this.timerItem?.timerValue
      ),
      id: undefined,
      recordType: RecordType.Worklog,
      title: "",
      createdAt: Date.now(),
      workplaceIndex: 0
    };

    this.onStop.emit(worklog);
  }
}

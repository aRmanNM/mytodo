import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  AndroidActivityBackPressedEventData,
  AndroidApplication,
  Application,
  isAndroid,
} from "@nativescript/core";
import { RecordType } from "~/app/core/enums/record-type";
import { Base } from "~/app/core/models/base";

@Component({
  selector: "app-modal",
  templateUrl: "modal.component.html",
})
export class ModalComponent implements OnInit {
  @Input() model: Base;
  @Output() onSubmit = new EventEmitter<Base>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild("input") input: ElementRef;

  title: string = "";

  constructor() {}

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  ngOnInit() {
    if (this.model) {
      this.title = this.model.title;
    }

    if (isAndroid) {
      Application.android.on(
        AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {
          this.cancel();
        }
      );
    }
  }

  addOrEdit(): void {
    if (this.model) {
      this.model.title = this.title;
    } else {
      this.model = {
        title: this.title,
        key: undefined,
        recordType: RecordType.Todo, // TODO: do something about this.
      };
    }

    this.onSubmit.emit(this.model);
  }

  cancel(): void {
    this.onCancel.emit();
    this.title = "";
  }
}

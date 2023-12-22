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
import { defaultWorkplaces } from "~/app/core/models/workplaces";

@Component({
  selector: "app-modal",
  templateUrl: "modal.component.html",
})
export class ModalComponent implements OnInit {
  workplaces: string[] = defaultWorkplaces;
  workplaceIndex: number = 0;

  @Input() model: Base;
  @Input() recordType: RecordType;

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
      this.workplaceIndex = this.model.workplaceIndex ?? 0;
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
      this.model.workplaceIndex = this.workplaceIndex;
    } else {
      this.model = {
        title: this.title,
        id: undefined,
        recordType: this.recordType,
        createdAt: Date.now(),
        workplaceIndex: this.workplaceIndex,
      };
    }

    this.onSubmit.emit(this.model);
  }

  cancel(): void {
    this.onCancel.emit();
    this.title = "";
  }
}

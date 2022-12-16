import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Todo } from "../todo";

@Component({
  selector: "todo-modal",
  templateUrl: "todo-modal.component.html",
})
export class TodoModalComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onSubmit = new EventEmitter<Todo>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild("todoInput") input: ElementRef;

  title: string = "";

  constructor() {}

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  ngOnInit() {
    if (this.todo) {
      this.title = this.todo.title;
    }
  }

  addOrEdit(): void {
    if (this.todo) {
      this.todo.title = this.title;
    } else {
      this.todo = {
        completed: false,
        title: this.title,
        key: undefined,
        createdAt: Date.now()
      };
    }

    this.onSubmit.emit(this.todo);
    this.title = "";
  }

  cancel(): void {
    this.onCancel.emit();
    this.title = "";
  }
}

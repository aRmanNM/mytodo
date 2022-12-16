import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Todo } from "../todo";

@Component({
  selector: "todo-modal",
  templateUrl: "todo-modal.component.html",
})
export class TodoModalComponent implements OnInit, OnDestroy {
  @Input() todo: Todo;
  @Output() onSubmit = new EventEmitter<Todo>();
  @Output() onCancel = new EventEmitter<void>();

  title: string = "";

  constructor() {}

  ngOnDestroy(): void {
    // console.log("modal destroyed!");
  }

  ngOnInit() {
    if (this.todo) {
      this.title = this.todo.title;
    }
  }

  addOrEdit(): void {
    if (this.todo) {
      this.todo.title = this.title;
      this.todo.completed = false;
      this.onSubmit.emit(this.todo);
      this.title = "";
      return;
    }

    let todo: Todo = {
      completed: false,
      title: this.title,
      key: undefined,
    };

    this.onSubmit.emit(todo);
    this.title = "";
  }

  cancel(): void {
    this.onCancel.emit();
    this.title = "";
  }
}

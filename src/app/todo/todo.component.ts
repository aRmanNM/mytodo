import { Component, OnInit } from "@angular/core";
import {
  EventData,
  ItemEventData,
  SwipeGestureEventData,
} from "@nativescript/core";
import { Todo } from "./todo";
import { registerElement } from "@nativescript/angular";
import { TodoService } from "./todo.service";
registerElement(
  "Fab",
  () => require("@nstudio/nativescript-floatingactionbutton").Fab
);

@Component({
  selector: "app-todo",
  templateUrl: "todo.component.html",
})
export class TodoComponent implements OnInit {
  todoItems: Todo[];
  todo: Todo;
  dialogOpen = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todoItems$.subscribe((res) => {
      this.todoItems = res;
    });

    // this.todoService.removeAllTodoItems();
  }

  toggleTodo(key: number): void {
    this.todoService.toggleTodo(key.toString());
  }

  deleteTodo(args: SwipeGestureEventData, key: number): void {
    this.todoService.removeTodoItem(key.toString());
  }

  editTodo(key: number): void {
    this.todo = this.todoItems.find((x) => x.key == key);
    this.showDialog();
  }

  showDialog() {
    this.dialogOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
    this.todo = undefined;
  }

  addOrUpdate(todo: Todo): void {
    if (todo.key) {
      this.todoService.updateTitle(todo.key.toString(), todo.title);
      this.closeDialog();
      return;
    }

    this.todoService.addTodoItem(todo.title);
    this.closeDialog();
  }
}

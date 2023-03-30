import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AndroidActivityBackPressedEventData,
  AndroidApplication,
  Application,
  isAndroid,
} from "@nativescript/core";
import { Todo } from "../core/models/todo";
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
  title = "Todo";
  todoItems: Todo[];
  todo: Todo;
  dialogOpen = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todoItems$.subscribe((res) => {
      this.todoItems = res;
    });
  }

  toggleTodo(key: string): void {
    this.todoService.toggleTodo(key);
  }

  deleteTodo(key: string): void {
    this.todoService.removeTodoItem(key);
  }

  editTodo(key: string): void {
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
      this.todoService.updateTitle(todo.key, todo.title);
    } else {
      this.todoService.addTodoItem(todo);
    }

    this.closeDialog();
  }

  clearAll(): void {
    this.todoService.removeAllTodoItems();
  }
}

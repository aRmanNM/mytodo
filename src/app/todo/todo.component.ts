import { Component, OnInit } from "@angular/core";
import {
  AndroidActivityBackPressedEventData,
  AndroidApplication,
  Application,
  isAndroid,
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
  headerEmoji: string;
  dialogOpen = false;

  emojis = [
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คฃ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คฉ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คช",
    "๐",
    "๐ค",
    "๐ค",
    "๐คญ",
    "๐คซ",
    "๐ค",
    "๐ค",
    "๐คจ",
    "๐",
    "๐คฏ",
    "๐ค ",
    "๐",
    "๐ค",
    "๐ง",
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    let index = Math.floor(Math.random() * this.emojis.length);
    this.headerEmoji = this.emojis[index];

    this.todoService.todoItems$.subscribe((res) => {
      this.todoItems = res;
    });

    if (isAndroid) {
      Application.android.on(
        AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {
          if (this.dialogOpen) {
            data.cancel = true;
            this.closeDialog();
          }
        }
      );
    }
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
}

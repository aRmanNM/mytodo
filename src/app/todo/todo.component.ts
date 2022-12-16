import { Component, OnInit } from "@angular/core";
import {
  AndroidActivityBackPressedEventData,
  AndroidApplication,
  Application,
  EventData,
  isAndroid,
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
  headerEmoji: string;
  dialogOpen = false;

  emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😏", "🤯", "🤠", "😎", "🤓", "🧐"]

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    let index = Math.floor(Math.random() * this.emojis.length);
    // console.log(this.emojis[index]);
    this.headerEmoji = this.emojis[index]

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

    this.todoService.removeAllTodoItems();
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

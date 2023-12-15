import { Component, OnInit } from "@angular/core";
import { Todo } from "../core/models/todo";
import { registerElement } from "@nativescript/angular";
import { TodoService } from "./todo.service";
import { RecordType } from "../core/enums/record-type";
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
  recordType: RecordType = RecordType.Todo;
  todoItems: Todo[];
  todo: Todo;
  dialogOpen = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todoItems$.subscribe((res) => {
      this.todoItems = res;
    });
  }

  toggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: string): void {
    this.todoService.removeTodoItem(id);
  }

  editTodo(id: string): void {
    this.todo = this.todoItems.find((x) => x.id == id);
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
    if (todo.id) {
      this.todoService.updateTitle(todo.id, todo.title);
    } else {
      todo.completed = false;
      this.todoService.addTodoItem(todo);
    }

    this.closeDialog();
  }

  clearAll(): void {
    this.todoService.removeAllTodoItems();
  }
}

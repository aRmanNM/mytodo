import { Component, OnInit } from "@angular/core";
import { Todo } from "../core/models/todo";
import { registerElement } from "@nativescript/angular";
import { TodoService } from "./todo.service";
import { RecordType } from "../core/enums/record-type";
registerElement(
  "Fab",
  () => require("@nstudio/nativescript-floatingactionbutton").Fab
);

import { defaultWorkplaces } from "../core/models/workplaces";

@Component({
  selector: "app-todo",
  templateUrl: "todo.component.html",
})
export class TodoComponent implements OnInit {
  title;
  recordType: RecordType = RecordType.Todo;
  todoItems: Todo[];
  todo: Todo;
  dialogOpen = false;

  workplaces = defaultWorkplaces;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todoItems$.subscribe((res) => {
      this.todoItems = res;
      if (res.length > 0) {
        this.title = `TODO (${res.filter((value) => value.completed).length}/${
          res.length
        })`;
      } else {
        this.title = "TODO";
      }
    });
  }

  toggleTodo(id: string): void {
    this.todoService.toggleTodoItem(id);
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
    this.title = "EDIT";
  }

  closeDialog() {
    this.dialogOpen = false;
    this.todo = undefined;
  }

  addOrUpdate(todo: Todo): void {
    if (todo.id) {
      this.todoService.updateTodoItem(todo.id, todo.title, todo.workplaceIndex);
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

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../core/services/storage.service";
import { Todo } from "../core/models/todo";
import { RecordType } from "../core/enums/record-type";

@Injectable({ providedIn: "root" })
export class TodoService {
  private readonly _todoItems = new BehaviorSubject<Todo[]>([]);
  readonly todoItems$ = this._todoItems.asObservable();

  constructor(private storageService: StorageService) {
    this.getTodoItems();
  }

  getTodoItems() {
    let todoItems: Todo[] = this.storageService.getAll(RecordType.Todo);
    this._todoItems.next(todoItems);
  }

  addTodoItem(todo: Todo) {
    todo.recordType = RecordType.Todo;
    this.storageService.set(todo);
    this.getTodoItems();
  }

  toggleTodo(id: string) {
    let todoItem: Todo = this.storageService.get(id);
    todoItem.completed = !todoItem.completed;
    this.storageService.update(id, todoItem);
    this.getTodoItems();
  }

  updateTitle(id: string, title: string) {
    let todoItem: Todo = this.storageService.get(id);
    todoItem.title = title;
    this.storageService.update(id, todoItem);
    this.getTodoItems();
  }

  removeTodoItem(id: string) {
    this.storageService.remove(id);
    this.getTodoItems();
  }

  removeAllTodoItems() {
    this._todoItems.value.forEach((x) => this.removeTodoItem(x.id));
    this.getTodoItems();
  }
}

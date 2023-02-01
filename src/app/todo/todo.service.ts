import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../core/services/storage.service";
import { Todo } from "../core/models/todo";
import { Base } from "../core/models/base";
import { RecordType } from "../core/enums/record-type";

@Injectable({ providedIn: "root" })
export class TodoService {
  private readonly _todoItems = new BehaviorSubject<Todo[]>([]);
  readonly todoItems$ = this._todoItems.asObservable();

  constructor(private storageService: StorageService) {
    this.getTodoItems();
  }

  getTodoItems() {
    let items: Base[] = this.storageService.getAll();
    let todoItems: Todo[] = (items as Todo[]).filter(
      (x) => x.recordType == RecordType.Todo
    );
    todoItems.sort((x, y) => x.createdAt - y.createdAt);
    this._todoItems.next(todoItems);
  }

  addTodoItem(todo: Todo) {
    todo.recordType = RecordType.Todo;
    this.storageService.set(todo);
    this.getTodoItems();
  }

  toggleTodo(key: string) {
    let todoItem: Todo = this.storageService.get(key);
    todoItem.completed = !todoItem.completed;
    this.storageService.set(todoItem);
    this.getTodoItems();
  }

  updateTitle(key: string, title: string) {
    let todoItem: Todo = this.storageService.get(key);
    todoItem.title = title;
    this.storageService.set(todoItem);
    this.getTodoItems();
  }

  removeTodoItem(key: string) {
    this.storageService.remove(key);
    this.getTodoItems();
  }

  removeAllTodoItems() {
    this._todoItems.value.forEach((x) => this.removeTodoItem(x.key));
    this.getTodoItems();
  }
}

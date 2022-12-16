import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "../services/storage.service";
import { Todo } from "./todo";

@Injectable({ providedIn: "root" })
export class TodoService {
  private readonly _todoItems = new BehaviorSubject<Todo[]>([]);
  readonly todoItems$ = this._todoItems.asObservable();

  constructor(private storageService: StorageService) {
    this.getTodoItems();
  }

  getTodoItems() {
    let todoItems: Todo[] = this.storageService.getAll();
    todoItems.sort((x, y) => x.createdAt - y.createdAt);
    this._todoItems.next(todoItems);
  }

  addTodoItem(todo: Todo) {
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
    this.storageService.removeAll();
    this.getTodoItems();
  }
}

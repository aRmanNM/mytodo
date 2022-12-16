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
    this._todoItems.next(this.storageService.getItems());
  }

  addTodoItem(title: string) {
    this.storageService.setItem({ completed: false, title });
    this.getTodoItems();
  }

  removeTodoItem(key: string) {
    this.storageService.removeItem(key);
    this.getTodoItems();
  }

  removeAllTodoItems() {
    this.storageService.removeAllItems();
    this.getTodoItems();
  }

  toggleTodo(key: string) {
    const todoItem: Todo = this.storageService.getItem(key);
    this.storageService.updateItem(key, {
      completed: !todoItem.completed,
      title: todoItem.title,
    });

    this.getTodoItems();
  }

  updateTitle(key: string, title: string) {
    const todoItem: Todo = this.storageService.getItem(key);
    this.storageService.updateItem(key, {
      title: title,
      completed: todoItem.completed,
    });

    this.getTodoItems();
  }
}

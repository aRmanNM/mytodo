import { Component, OnInit } from "@angular/core";
import { EventData, ItemEventData } from "@nativescript/core";
import { Todo } from "./todo";

@Component({
  selector: "app-todo",
  templateUrl: "todo.component.html",
})
export class TodoComponent implements OnInit {
  todoItems: Todo[];
  constructor() {}

  ngOnInit() {
    this.todoItems = [
      { title: "do this", completed: false, key: 0 },
      { title: "do that", completed: true, key: 1 },
      { title: "a long todo item to do", completed: true, key: 2 },
    ];
  }

  toggleTodo(args: ItemEventData): void {
    let todo = this.todoItems.find((x) => x.key == args.index);
    if (todo) {
        todo.completed = !todo.completed;
    }
  }
}

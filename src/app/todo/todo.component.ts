import { Component, OnInit } from "@angular/core";
import { EventData, ItemEventData, SwipeGestureEventData } from "@nativescript/core";
import { Todo } from "./todo";
import { registerElement } from '@nativescript/angular';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

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
      { title: "a very long todo item that is really hard to fit in", completed: false, key: 1 },
      { title: "do that", completed: true, key: 2 },
      { title: "a longer todo item to do", completed: true, key: 3 },
    ];
  }

  toggleTodo(key: number): void {
    let todo = this.todoItems.find((x) => x.key == key);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(args: SwipeGestureEventData, key: number): void {
    if ([0, 2].includes(args.direction)) {
      this.todoItems = this.todoItems.filter((x) => x.key != key);
    }
  }
}

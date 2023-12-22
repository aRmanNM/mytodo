import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-actionbar",
  templateUrl: "actionbar.component.html",
})
export class ActionbarComponent implements OnInit {
  @Input() title: string;
  @Input() set stat(value: string) {
    this.text = value ? `${this.title} (${value})` : `${this.title}`;
  }

  text: string;

  constructor() {}

  ngOnInit() {}
}

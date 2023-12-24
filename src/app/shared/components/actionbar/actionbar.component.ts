import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-actionbar",
  templateUrl: "actionbar.component.html",
})
export class ActionbarComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}

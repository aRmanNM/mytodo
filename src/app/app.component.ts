import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private router: Router) {}
}

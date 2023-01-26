import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private router: Router) {}

  changePage(event: Event): void {
    console.log("this called!", event.target);
    // if (event.target === "Todo") {
    //   this.router.navigate(["worklog"]);
    // } else if (currentPage === "Worklog") {
    //   this.router.navigate(["todo"]);
    // }
  }
}

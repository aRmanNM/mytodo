import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { TodoComponent } from "./todo/todo.component";

const routes: Routes = [
  { path: "", redirectTo: "/todo", pathMatch: "full" },
  { path: "todo", component: TodoComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
  { path: "", redirectTo: '/(todoTab:todo//worklogTab:worklog)', pathMatch: "full" },
  {
    path: "todo",
    loadChildren: () => import("./todo/todo.module").then((m) => m.TodoModule),
    outlet: "todoTab"
  },
  {
    path: "worklog",
    loadChildren: () => import("./todo/todo.module").then((m) => m.TodoModule),
    outlet: "worklogTab"
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

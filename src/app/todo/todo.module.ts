import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { SharedModule } from "../shared/shared.module";
import { TodoComponent } from "./todo.component";
import { TodoService } from "./todo.service";

const routes: Routes = [
  {
    path: "",
    component: TodoComponent,
  },
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forChild(routes)],
  exports: [],
  declarations: [TodoComponent],
  providers: [TodoService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TodoModule {}

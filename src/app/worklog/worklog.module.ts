import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { WorklogComponent } from "./worklog.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: WorklogComponent,
  },
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forChild(routes)],
  exports: [],
  declarations: [WorklogComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WorklogModule {}

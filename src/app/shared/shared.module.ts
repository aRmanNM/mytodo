import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { ActionbarComponent } from "./components/actionbar/actionbar.component";
import { ModalComponent } from "./components/modal/modal.component";
import { DurationPipe } from "./pipes/duration.pipe";
import { PersianDatePipe } from "./pipes/persian-date.pipe";
import { PrettifyMSPipe } from "./pipes/prettify-ms.pipe";

const MODULES = [NativeScriptCommonModule, NativeScriptFormsModule];
const PIPES = [DurationPipe, PersianDatePipe, PrettifyMSPipe];
const COMPONENTS = [ActionbarComponent, ModalComponent];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...PIPES],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}

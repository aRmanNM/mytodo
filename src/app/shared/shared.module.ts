import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { COMPONENTS } from "./components/index";
import { PIPES } from "./pipes/index";
import { PersianDatePipe } from "./pipes/persian-date.pipe";

const MODULES: any[] = [NativeScriptCommonModule, NativeScriptFormsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [PersianDatePipe],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}

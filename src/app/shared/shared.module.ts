import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { COMPONENTS } from "./components/index";

const MODULES: any[] = [NativeScriptCommonModule, NativeScriptFormsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}

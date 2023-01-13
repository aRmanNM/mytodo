import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ModalComponent } from "./components/modal/modal.component";

@NgModule({
  imports: [NativeScriptCommonModule],
  exports: [NativeScriptCommonModule],
  declarations: [ModalComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}

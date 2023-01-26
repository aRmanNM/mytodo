import { NgModule, Optional, SkipSelf } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptHttpClientModule,
} from "@nativescript/angular";
import { SERVICES } from "./services/index";

const MODULES: any[] = [NativeScriptModule, NativeScriptHttpClientModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [...SERVICES],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}

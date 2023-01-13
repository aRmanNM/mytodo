import { NgModule, Optional, SkipSelf } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpClientModule,
} from "@nativescript/angular";
import { StorageService } from "./services/storage.service";

const MODULES: any[] = [
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpClientModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [StorageService],
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

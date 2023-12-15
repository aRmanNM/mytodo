import { NgModule, Optional, SkipSelf } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptHttpClientModule,
} from "@nativescript/angular";
import { FileService } from "./services/file.service";
import { StorageService } from "./services/storage.service";
import { TimerService } from "./services/timer.service";
import { ToastService } from "./services/toast.service";

const MODULES = [NativeScriptHttpClientModule, NativeScriptModule];
const SERVICES = [FileService, StorageService, TimerService, ToastService];

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
        "core module already loaded, only import in app.module.ts file"
      );
    }
  }
}

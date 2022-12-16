import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptFormsModule,
  NativeScriptModule,
} from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { TodoComponent } from "./todo/todo.component";
import { TodoModalComponent } from "./todo/modal/todo-modal.component";
import { TodoService } from "./todo/todo.service";
import { StorageService } from "./services/storage.service";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, NativeScriptFormsModule],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    TodoComponent,
    TodoModalComponent,
  ],
  providers: [TodoService, StorageService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

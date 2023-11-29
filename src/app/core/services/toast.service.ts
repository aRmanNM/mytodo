import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core";
import { Toasty } from "@triniwiz/nativescript-toasty";

@Injectable()
export class ToastService {
  constructor() {}

  createToast(message: string): void {
    new Toasty({
      text: message,
    //   backgroundColor: new Color("white"),
    //   textColor: new Color("black"),
    //   tapToDismiss: true
    }).show();
  }
}

import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core";
import { ToastPosition, Toasty } from "@triniwiz/nativescript-toasty";

@Injectable()
export class ToastService {
  constructor() {}

  createToast(message: string): void {
    new Toasty({
      text: message,
      //   backgroundColor: new Color("white"),
      //   textColor: new Color("black"),
      //   tapToDismiss: true
      position: ToastPosition.CENTER,
      backgroundColor: new Color("grey"),
    }).show();
  }
}

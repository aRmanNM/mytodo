import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core";
import { ToastPosition, Toasty } from "@triniwiz/nativescript-toasty";

@Injectable({ providedIn: "root" })
export class ToastService {
  constructor() {}

  showSimpleToast(message: string): void {
    new Toasty({
      text: message ?? "INTERNAL ERROR OCCURRED",
      //   backgroundColor: new Color("white"),
      //   textColor: new Color("black"),
      //   tapToDismiss: true
      position: ToastPosition.CENTER,
      backgroundColor: new Color("grey"),
    }).show();
  }
}

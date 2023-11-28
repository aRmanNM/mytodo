import * as jalaliMoment from "jalali-moment";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "persianDate" })
export class PersianDatePipe implements PipeTransform {
  transform(value: string, withTime: boolean = true): any {
    if (withTime) {
      return jalaliMoment(value).format("jYYYY/jMM/jDD - H:mm");
    } else {
      return jalaliMoment(value).format("jYYYY/jMM/jDD");
    }
  }
}

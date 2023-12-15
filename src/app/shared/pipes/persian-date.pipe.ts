import * as jalaliMoment from "jalali-moment";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "persianDate" })
export class PersianDatePipe implements PipeTransform {
  transform(
    value: string,
    type: DateTimeTransformType = DateTimeTransformType.DateTime
  ): any {
    if (value == null) return null;
    switch (type) {
      case DateTimeTransformType.Date:
        return jalaliMoment(value).format("jYYYY/jMM/jDD");
      case DateTimeTransformType.Time:
        return jalaliMoment(value).format("HH:mm");
      case DateTimeTransformType.DateTime:
        return jalaliMoment(value).format("jYYYY/jMM/jDD-HH:mm");
      default:
        break;
    }
  }
}

export enum DateTimeTransformType {
  Date,
  Time,
  DateTime,
}

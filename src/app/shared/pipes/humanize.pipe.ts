import { Pipe, PipeTransform } from "@angular/core";
import * as humanizeDuration from "humanize-duration";

@Pipe({
  name: "humanize",
})
export class HumanizePipe implements PipeTransform {
  transform(num: number): string {
    return humanizeDuration(num, { round: true, largest: 2 });
  }
}

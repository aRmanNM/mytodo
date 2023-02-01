import { Pipe, PipeTransform } from "@angular/core";
import * as humanizeDuration from "humanize-duration";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(start: Date, end: Date): number {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    return duration;
  }
}

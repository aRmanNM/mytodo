import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(start: Date, end: Date): number {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    return duration;
  }
}

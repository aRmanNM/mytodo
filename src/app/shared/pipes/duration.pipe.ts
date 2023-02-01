import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  toReturn: string = "";
  transform(start: Date, end: Date): string {
    let durationInMS = new Date(end).getTime() - new Date(start).getTime();
    this.calculateDuration(durationInMS / 1000);
    return this.toReturn;
  }

  private calculateDuration(input: number) {
    if (input == 0) return;
    this.toReturn =
      Math.floor(input % 60).toString() +
      (this.toReturn ? ":" + this.toReturn : this.toReturn);
    this.calculateDuration(Math.floor(input / 60));
  }
}

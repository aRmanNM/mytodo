import { Pipe, PipeTransform } from "@angular/core";
import prettyMilliseconds from "pretty-ms";

@Pipe({
  name: "prettifyMS",
})
export class PrettifyMSPipe implements PipeTransform {
  transform(ms: number): string {
    if (ms == null) return "null";
    if (ms > 999) {
      return prettyMilliseconds(ms, { unitCount: 2, secondsDecimalDigits: 0 });
    }
  }
}

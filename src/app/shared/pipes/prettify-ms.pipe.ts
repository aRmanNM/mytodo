import { Pipe, PipeTransform } from "@angular/core";
import prettyMilliseconds from "pretty-ms";

@Pipe({
  name: "prettifyMS",
})
export class PrettifyMSPipe implements PipeTransform {
  transform(ms: number): string {
    return prettyMilliseconds(ms, { unitCount: 2, secondsDecimalDigits: 0 });
  }
}

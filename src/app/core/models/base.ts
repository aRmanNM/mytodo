import { RecordType } from "../enums/record-type";
export interface Base {
  key: string;
  title: string;
  recordType: RecordType;
}

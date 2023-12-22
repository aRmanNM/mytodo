import { RecordType } from "../enums/record-type";

export interface Base {
  id: string;
  title: string;
  createdAt: EpochTimeStamp;
  recordType: RecordType;
  workplaceIndex: number;
}

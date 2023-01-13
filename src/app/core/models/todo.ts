import { Base } from "./base";

export interface Todo extends Base {
  completed: boolean;
  createdAt: EpochTimeStamp;
}

import { Injectable } from "@angular/core";
import { CouchBase, ConcurrencyMode } from "@triniwiz/nativescript-couchbase";
import { RecordType } from "../enums/record-type";

@Injectable()
export class StorageService {
  dbName = "myTodoDb";
  database: CouchBase;
  constructor() {
    this.database = new CouchBase(this.dbName);
  }

  getAll(recordType: RecordType): any[] {
    return this.database.query({
      select: [],
      from: this.dbName,
      where: [
        { property: "recordType", comparison: "equalTo", value: recordType },
      ],
      order: [{ property: "createdAt", direction: "asc" }],
    });
  }

  get(id: string): any {
    return this.database.getDocument(id);
  }

  set(value: any): void {
    this.database.createDocument(value);
  }

  update(id: string, value: any): void {
    this.database.updateDocument(id, value);
  }

  remove(id: string): void {
    this.database.deleteDocument(id);
  }
}

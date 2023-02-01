import { Injectable } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";

@Injectable()
export class StorageService {
  constructor() {}

  getAll(): any[] {
    const keys: string[] = ApplicationSettings.getAllKeys();
    let items: any[] = [];
    for (let key in keys) {
      let item = this.get(keys[key]);
      if (item) {
        items.push(item);
      }
    }

    return items;
  }

  get(key: string): any {
    let item = ApplicationSettings.getString(key);
    if (item) {
      return JSON.parse(item);
    }
  }

  set(value: any): void {
    if (!value.key) {
      value.key = this.generateGuid();
    }

    ApplicationSettings.setString(value.key, JSON.stringify(value));
  }

  remove(key: string): void {
    ApplicationSettings.remove(key);
  }

  // removeAll(): void {
  //   ApplicationSettings.clear();
  // }

  generateGuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

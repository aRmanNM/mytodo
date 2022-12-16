import { Injectable } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";

@Injectable()
export class StorageService {
  constructor() {}

  getItems(): any[] {
    let keys = ApplicationSettings.getAllKeys();
    let items: any[] = [];
    for (const key in keys) {
      items.push(this.getItem(key));
    }

    return items;
  }

  setItem(value: any): void {
    let key = this.getNewKey();
    ApplicationSettings.setString(key, JSON.stringify(value));
  }

  updateItem(key: string, value: any): void {
    ApplicationSettings.setString(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    let item = ApplicationSettings.getString(key);
    if (item) {
      return { key, ...JSON.parse(item) };
    }
  }

  removeItem(key: string): void {
    ApplicationSettings.remove(key);
  }

  removeAllItems(): void {
    ApplicationSettings.clear();
  }

  getNewKey(): string {
    let num = 0;
    while (ApplicationSettings.hasKey(num.toString())) num++;
    return num.toString();
  }
}

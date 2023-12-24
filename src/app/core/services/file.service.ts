import { Injectable } from "@angular/core";
import { Utils, isAndroid } from "@nativescript/core";
import { asString, generateCsv, mkConfig } from "export-to-csv";
import * as moment from "jalali-moment";
import * as permission from "nativescript-permissions";

@Injectable({ providedIn: "root" })
export class FileService {
  constructor() {}

  async exportCSV(model: any) {
    if (isAndroid) {
      await permission.requestPermission(
        permission.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      const csvConfig = mkConfig({ useKeysAsHeaders: true });
      const csv = generateCsv(csvConfig)(model);
      const fileName = `worklog-export-${moment(new Date()).format(
        "YYYY-MM-DD-HH-mm"
      )}.csv`;

      this.writeToFile("/Documents", fileName, asString(csv));
    } else {
      throw Error("PLATFORM NOT SUPPORTED");
    }
  }

  writeToFile(folderName, fileName, text) {
    const storages = this.getStorages();

    for (const storage of storages) {
      if (!storage.exists()) {
        continue;
      }

      const file = new java.io.File(storage + folderName + "/" + fileName);
      const folder = new java.io.File(storage + folderName);

      console.log(folder.getPath());

      if (!folder.exists()) {
        folder.mkdirs();
        folder.setReadable(true);
        folder.setWritable(true);
      }

      if (file.createNewFile()) {
        const myWriter = new java.io.FileWriter(file);
        myWriter.write(text);
        myWriter.close();
      }

      break; // do not continue if successful at any stage
    }
  }

  getStorages(): java.io.File[] {
    const filesDir = Utils.android
      .getApplicationContext()
      .getExternalFilesDir(null)
      .getAbsolutePath();
    const storage0 = new java.io.File(
      filesDir.substring(0, filesDir.indexOf("/Android"))
    );
    const storage1 = new java.io.File("/storage/emulated/0");
    const storage2 = new java.io.File("/sdcard");
    return [storage0, storage1, storage2]; // order is important
  }
}

import { Injectable } from "@angular/core";
import { Utils, isAndroid } from "@nativescript/core";
import { asString, generateCsv, mkConfig } from "export-to-csv";
import * as moment from "jalali-moment";
import * as permission from "nativescript-permissions";

@Injectable()
export class FileService {
  constructor() {}

  exportCSV(model: any) {
    if (isAndroid) {
      if (
        android.os.Build.VERSION.SDK_INT <= android.os.Build.VERSION_CODES.Q
      ) {
        permission
          .requestPermission(permission.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const csvConfig = mkConfig({ useKeysAsHeaders: true });
      const csv = generateCsv(csvConfig)(model);
      const fileName = `worklog-export-${moment(new Date()).format("YYYY-MM-DD-HH-MM")}.csv`;

      this.writeToFile("/Documents", fileName, asString(csv));
    } else {
      // TODO: add an unsupported toast
    }
  }

  writeToFile(folderName, fileName, text) {
    const filesDir = Utils.android
      .getApplicationContext()
      .getExternalFilesDir(null)
      .getAbsolutePath();
    const storage0 = new java.io.File(
      filesDir.substring(0, filesDir.indexOf("/Android"))
    );
    const storage1 = new java.io.File("/storage/emulated/0");
    const storage2 = new java.io.File("/sdcard");
    let file;

    if (text == null) {
      text = "";
    }

    if (storage0.exists()) {
      file = new java.io.File(storage0 + folderName + "/" + fileName);
      const folder = new java.io.File(storage0 + folderName);

      if (!folder.exists()) {
        folder.mkdirs();
        folder.setReadable(true);
        folder.setWritable(true);
      }
    } else if (storage1.exists()) {
      file = new java.io.File(storage1 + folderName + "/" + fileName);
      const folder = new java.io.File(storage1 + folderName);

      if (!folder.exists()) {
        folder.mkdirs();
        folder.setReadable(true);
        folder.setWritable(true);
      }
    } else if (storage2.exists()) {
      file = new java.io.File(storage2 + folderName + "/" + fileName);
      const folder = new java.io.File(storage2 + folderName);

      if (!folder.exists()) {
        folder.mkdirs();
        folder.setReadable(true);
        folder.setWritable(true);
      }
    } else {
      return false;
    }

    if (file.createNewFile()) {
      const myWriter = new java.io.FileWriter(file);
      myWriter.write(text);
      myWriter.close();

      return true;
    } else {
      return false;
    }
  }
}

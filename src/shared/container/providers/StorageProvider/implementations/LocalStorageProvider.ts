import upload from "@config/upload";
import fs from "fs";
import { resolve } from "path";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    console.log("local");
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`);

    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };

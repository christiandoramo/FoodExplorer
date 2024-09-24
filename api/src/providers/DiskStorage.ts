import path from "path";
import fs from "fs";
import * as uploadConfig from "../configs/upload";

class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TEMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );
    return file;
  }
  async deleteFile(file: string) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      console.error(error);
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorage;

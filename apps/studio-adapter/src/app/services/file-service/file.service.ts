import * as fs from 'fs';
import { File } from "../../models/File";

/**
 * This service handles file I/O and streaming.
 */
export class FileService {
  public getFiles(dir: string): File[] {
    return fs.readdirSync(dir).map((file) => new File(file));
  }
}

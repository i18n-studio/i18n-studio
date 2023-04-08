import * as fs from 'fs';
import { File } from '../../models/File';
import LoggingService from '../../../../../../libs/api/src/lib/service/LoggingService';

/**
 * This service handles file I/O and streaming.
 */
export class FileService {
  logger = LoggingService.getInstance();

  /**
   * Get every file from a specific directory.
   * @param dir {string} directory to search for files.
   */
  public getFiles(dir: string): File[] {
    this.logger.info('FileService', 'getFiles', 'Get files');
    return fs.readdirSync(dir).map((file) => new File(file));
  }

  /**
   * Filter files by a specific filter.
   * @param files {File[]} the files to filter.
   * @param filter {string} regexp as a string.
   */
  public filterFiles(files: File[], filter: string): File[] {
    return files.filter((File) => File.filenameMatching(filter));
  }
}

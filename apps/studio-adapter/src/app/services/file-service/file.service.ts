import * as fs from 'fs';
import { File } from '../../../../../../libs/api/src/lib/models/File';
import LoggingService from '../../../../../../libs/api/src/lib/service/LoggingService';
import { Injectable } from '@nestjs/common';

/**
 * This service handles file I/O and streaming.
 */
@Injectable()
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
   * Get the content of a specific file and parse it to JSON.
   * @param filePath {string}.
   */
  public getFileContent(filePath: string): any {
    if (!fs.existsSync(filePath)) {
      this.logger.error(
        'FileService',
        'getFileContent',
        `Can't find file ${filePath}.`
      );
      return JSON.parse('{}');
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * Filter files by a specific filter.
   * @param files {File[]} the files to filter.
   * @param filter {string} regexp as a string.
   */
  public filterFiles(files: File[], filter: string): File[] {
    return files.filter((File) => File.filenameMatching(filter));
  }

  updateFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, JSON.stringify(content));
  }
}

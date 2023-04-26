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

  public updateFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
  }

  /**
   * Creates a new file on a specific path.
   * @param filePath {string} - folder, in which the file should be created
   * @param filename {string} - the name of the file
   * @param defaultContent {string|object} - the default content of the file
   * @return true, if the file can be created, false if file already exists.
   */
  public createFile(
    filePath: string,
    filename: string,
    defaultContent: string | object = {}
  ): boolean {
    const path = `${filePath}/${filename}`;
    console.log(path);
    if (!fs.existsSync(path)) {
      fs.writeFileSync(
        path,
        typeof defaultContent === 'object'
          ? JSON.stringify(defaultContent)
          : defaultContent,
        'utf8'
      );
      return true;
    }
    return false;
  }
}

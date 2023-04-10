import { FileService } from '../file-service/file.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TranslationService {
  constructor(private readonly fileService: FileService) {}

  /**
   * Add a translation to a file.
   * @param filePath {string} the file in which the translation should be added.
   * @param key {string} the key, which should be added.
   * @param value {string} the value, which should be added.
   */
  public addTranslation(filePath: string, key: string, value: string): void {
    const content = this.fileService.getFileContent(filePath);
    content[key] = value;
    this.fileService.updateFile(filePath, content);
  }
}

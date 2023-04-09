import { AnalyzeResult } from '../../../../../../libs/api/src/lib/models/AnalyzeResult';
import { FileService } from '../file-service/file.service';
import { ConfigService } from '../config-service/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AnalyzerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService
  ) {}

  /**
   * Soft analyzes compares the different translation files with each other and
   * checks, if the amount of keys in the files are the same.
   *
   * If this is not the case, it writes the different into the AnalyzeResult.
   * @see https://github.com/dominique-boerner/i18n-studio/wiki/Analyzer#soft-analysis
   */
  public softAnalyze(): AnalyzeResult[] {
    const path = this.configService.getConfig().dir;
    const files = this.fileService.getFiles(path);
    const analyzeResults: AnalyzeResult[] = [];

    const keys = files.map((file) => {
      const content = this.fileService.getFileContent(
        `${path}/${file.filename}`
      );
      return this.flattenObject(content);
    });

    files.forEach((file, index) => {
      const currentFileContent = keys[index];
      const nextFileContent = keys[index + 1];

      if (!nextFileContent) {
        return;
      }

      const currentFileKeyCount = Object.keys(currentFileContent).length;
      const nextFileKeyCount = Object.keys(nextFileContent).length;

      const hasDifference =
        nextFileContent && currentFileKeyCount !== nextFileKeyCount;

      if (hasDifference) {
        const result: AnalyzeResult = {
          src: file.filename,
          target: files[index + 1].filename,
          differentKeysCount: currentFileKeyCount - nextFileKeyCount,
        };
        analyzeResults.push(result);
      }
    });

    return analyzeResults;
  }

  /**
   * Flatten the keys of an object.
   * @param object {any} to flatten
   * @private
   */
  private flattenObject(object) {
    const result = {};

    for (const i in object) {
      if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
        const temp = this.flattenObject(object[i]);
        for (const j in temp) {
          result[i + '.' + j] = temp[j];
        }
      } else {
        result[i] = object[i];
      }
    }
    return result;
  }
}

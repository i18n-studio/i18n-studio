import { AnalyzeResult } from '../../../../../../libs/api/src/lib/models/AnalyzeResult';
import { FileService } from '../file-service/file.service';
import { ConfigService } from '../config-service/config.service';
import { Injectable } from '@nestjs/common';
import { File } from '../../../../../../libs/api/src/lib/models/File';
import LoggingService from '../../../../../../libs/api/src/lib/service/LoggingService';

/**
 * This service handles the analyzing of the different translation file. It
 * compares the translation file with the default translation file, given in
 * the _defaultLanguage_ key of the configuration.
 */
@Injectable()
export default class AnalyzerService {
  private readonly logger: LoggingService = LoggingService.getInstance();

  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService
  ) {}

  /**
   * Soft analyzes compares the different translation files with each other and
   * checks, if the amount of keys in the files are the same.
   *
   * If this is not the case, it writes the different into the AnalyzeResult.
   */
  public softAnalyze(): AnalyzeResult[] {
    const path = this.configService.getConfig().dir;
    const defaultLanguage = this.configService.getConfig().defaultLanguage;

    const defaultLanguageContent = this.fileService.getFileContent(
      `${path}/${defaultLanguage}.json`
    );
    const defaultLanguageTranslationAmount = this.getTranslationAmount(
      defaultLanguageContent
    );

    const languageFiles: File[] = this.fileService
      .getFiles(path)
      .filter((file) => !file.filenameMatching(`${defaultLanguage}.json`));

    const analyzeResults: AnalyzeResult[] = [];

    languageFiles.forEach((file) => {
      const content = this.fileService.getFileContent(
        `${path}/${file.filename}`
      );
      const translationAmount = this.getTranslationAmount(content);

      if (translationAmount !== defaultLanguageTranslationAmount) {
        const result: AnalyzeResult = {
          src: file.filename,
          target: `${defaultLanguage}.json`,
          differentKeysCount:
            translationAmount - defaultLanguageTranslationAmount,
        };
        analyzeResults.push(result);
      }
    });

    this.logger.info(
      'AnalyzerService',
      'softAnalyze',
      `${analyzeResults.length} differences found while soft analyzing.`
    );

    return analyzeResults;
  }

  /**
   * Get the amount of translations from the translation file content.
   * @param content
   * @private
   */
  private getTranslationAmount(content): number {
    const flatObject = this.flattenObject(content);
    return Object.keys(flatObject).length;
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

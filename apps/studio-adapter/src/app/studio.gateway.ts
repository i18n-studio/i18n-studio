import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FileService } from './services/file-service/file.service';
import { ConfigService } from './services/config-service/config.service';
import LoggingService from '../../../../libs/api/src/lib/service/LoggingService';
import AnalyzerService from './services/analyzer-service/analyzer.service';
import TranslationService from './services/translation-service/translation.service';
import { HttpStatus } from '@nestjs/common';
import { Config } from './models/Config';
import { File } from '../../../../libs/api/src/lib/models/File';
import { AnalyzeResult } from '../../../../libs/api/src/lib/models/AnalyzeResult';
import AdapterResponse from '../../../../libs/api/src/lib/models/AdapterResponse';

/**
 * Socket.io Gateway for the adapter.
 * @see https://docs.nestjs.com/websockets/gateways
 */
@WebSocketGateway({ cors: true })
export class StudioGateway {
  private static readonly NAME = 'StudioGateway';

  private readonly translationDir = this.configService.getConfig().dir;

  private readonly logger: LoggingService = LoggingService.getInstance();

  @WebSocketServer()
  server;

  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly analyzerService: AnalyzerService,
    private readonly translationService: TranslationService
  ) {}

  /**
   * Get the current i18n-studio configuration.
   * @example
   * // client - basic usage:
   *
   * // emit the operation to the studio-adapter
   * this.socket.emit("config");
   *
   * // retrieve the configuration file
   * const config = this.socket.on("config");
   */
  @SubscribeMessage('config')
  public handleConfig() {
    const config = this.configService.getConfig();
    this.logger.info(
      StudioGateway.NAME,
      'handleConfig',
      `Get configuration: ${JSON.stringify(config)}`
    );
    const response: AdapterResponse<Config> = {
      statusCode: HttpStatus.OK,
      data: config,
    };
    this.server.emit('config', response);
  }

  /**
   * Get every translation file, based on configuration and filter by pattern.
   * @example
   * // client - basic usage:
   *
   * // emit the operation to the studio-adapter
   * this.socket.emit("files");
   *
   * // retrieve the name of the files as array
   * const files = this.socket.on("files");
   */
  @SubscribeMessage('files')
  public handleFiles() {
    this.logger.info(
      StudioGateway.NAME,
      'handleFiles',
      'Get every translation file.'
    );
    const files = this.fileService.getFiles(this.translationDir);
    const filteredFiles = this.fileService.filterFiles(files, '.json');
    const response: AdapterResponse<File[]> = {
      statusCode: HttpStatus.OK,
      data: filteredFiles,
    };
    this.server.emit('files', response);
  }

  /**
   * Get the content of a specific translation file.
   * @param filename {string} the name of the file without the path
   * @example
   * // client - basic usage:
   *
   * // emit the operation to the studio-adapter
   * this.socket.emit("fileContent", "de.json");
   *
   * // retrieve the content of the given file
   * const content = this.socket.on("fileContent");
   */
  @SubscribeMessage('fileContent')
  public handleFileContent(@MessageBody('filename') filename: string) {
    this.logger.info(
      StudioGateway.NAME,
      'handleFileContent',
      `Get content of file ${filename}.`
    );
    const file = this.fileService.getFileContent(
      `${this.translationDir}/${filename}`
    );
    const response: AdapterResponse<File[]> = {
      statusCode: HttpStatus.OK,
      data: file,
    };
    this.server.emit('fileContent', response);
  }

  /**
   * Add a translation to a file. If the given key already exists, it will be
   * overwritten by the new value.
   * It returns the new file content back to the client.
   * @param filename {string} the file in which the translation should be added.
   * @param key {string} the key, which should be added.
   * @param value {string} the value, which should be added.
   *
   * @example
   * // client - basic usage:
   *
   * // emit the operation to the studio-adapter
   * this.socket.emit("addTranslation", "de.json", "hello", "Hallo");
   */
  @SubscribeMessage('addTranslation')
  public handleAddTranslation(
    @MessageBody('filename') filename: string,
    @MessageBody('key') key: string,
    @MessageBody('value') value: string
  ) {
    this.logger.info(
      StudioGateway.NAME,
      'handleAddTranslation',
      `Add translation ${key}:${value} to ${filename}.`
    );

    const file = `${this.translationDir}/${filename}`;
    this.translationService.addTranslation(file, key, value);
    const fileContent = this.fileService.getFileContent(
      `${this.translationDir}/${filename}`
    );
    const response: AdapterResponse<any> = {
      statusCode: HttpStatus.OK,
      data: fileContent,
    };
    this.server.emit('addTranslation', response);
  }

  @SubscribeMessage('addTranslationFile')
  public handleAddTranslationFile(@MessageBody('filename') filename: string) {
    this.logger.info(
      StudioGateway.NAME,
      'handleAddTranslationFile',
      `Create translation file ${filename}.`
    );

    const success = this.fileService.createFile(this.translationDir, filename);
    const response: AdapterResponse<any> = {
      statusCode: HttpStatus.OK,
      data: success,
    };

    this.server.emit('addTranslationFile', response);
  }

  /**
   * Soft analyze the translation files.
   * @see https://github.com/dominique-boerner/i18n-studio/wiki/Analyzer#soft-analysis
   * @example
   * // client - basic usage:
   *
   * // emit the operation to the studio-adapter
   * this.socket.emit("softAnalyze");
   *
   * // retrieve the results
   * const result = this.socket.on("softAnalyze");
   */
  @SubscribeMessage('softAnalyze')
  public handleSoftAnalyze() {
    const result = this.analyzerService.softAnalyze();
    const response: AdapterResponse<AnalyzeResult[]> = {
      statusCode: HttpStatus.OK,
      data: result,
    };
    this.server.emit('softAnalyze', response);
  }
}

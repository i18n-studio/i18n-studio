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

/**
 * Socket.io Gateway for the adapter.
 * @see https://docs.nestjs.com/websockets/gateways
 */
@WebSocketGateway({ cors: true })
export class StudioGateway {
  private static readonly NAME = 'StudioGateway';

  private readonly filePath = this.configService.getConfig().dir;

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
    this.server.emit('config', config);
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
    const files = this.fileService.getFiles(this.filePath);
    const filteredFiles = this.fileService.filterFiles(files, '.json');
    this.server.emit('files', filteredFiles);
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
      `${this.filePath}/${filename}`
    );
    this.server.emit('fileContent', file);
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

    const file = `${this.filePath}/${filename}`;
    this.translationService.addTranslation(file, key, value);
    const fileContent = this.fileService.getFileContent(
      `${this.filePath}/${filename}`
    );
    this.server.emit('addTranslation', fileContent);
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
    this.server.emit('softAnalyze', result);
  }
}

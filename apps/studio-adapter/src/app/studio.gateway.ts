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
    private readonly analyzerService: AnalyzerService
  ) {}

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

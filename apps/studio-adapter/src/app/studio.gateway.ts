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

@WebSocketGateway({ cors: true })
export class StudioGateway {
  private static readonly NAME = 'StudioGateway';

  private readonly logger: LoggingService = LoggingService.getInstance();

  private filePath = this.configService.getConfig().dir;

  @WebSocketServer()
  server;

  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly analyzerService: AnalyzerService
  ) {}

  /**
   * Get every translation file, based on configuration and filter by pattern.
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

  @SubscribeMessage('softAnalyze')
  public handleSoftAnalyze() {
    const result = this.analyzerService.softAnalyze();
    this.server.emit('softAnalyze', result);
  }
}

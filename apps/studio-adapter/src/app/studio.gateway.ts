import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FileService } from './services/file-service/file.service';
import { ConfigService } from './services/config-service/config.service';
import LoggingService from '../../../../libs/api/src/lib/service/LoggingService';

@WebSocketGateway({ cors: true })
export class StudioGateway {
  private static readonly NAME = 'StudioGateway';

  private readonly fileService: FileService = new FileService();
  private readonly configService: ConfigService = new ConfigService();
  private readonly logger: LoggingService = new LoggingService();

  @WebSocketServer()
  server;

  /**
   * Get every translation file, based on configuration and filter by pattern.
   */
  @SubscribeMessage('files')
  handleFiles() {
    this.logger.info(
      StudioGateway.NAME,
      'handleFiles',
      'Get every translation file.'
    );
    const files = this.fileService.getFiles(this.getFilePathFromConfig());
    const filteredFiles = this.fileService.filterFiles(files, '.json');
    this.server.emit('files', filteredFiles);
  }

  /**
   * Get the content of a specific translation file.
   * @param filename {string} the name of the file without the path
   */
  @SubscribeMessage('fileContent')
  handleFileContent(@MessageBody('filename') filename: string) {
    this.logger.info(
      StudioGateway.NAME,
      'handleFileContent',
      `Get content of file ${filename}.`
    );
    const file = this.fileService.getFileContent(
      `${this.getFilePathFromConfig()}/${filename}`
    );
    this.server.emit('fileContent', file);
  }

  private getFilePathFromConfig() {
    const configFile = this.configService.getConfigFilePath();
    const config = this.configService.readConfigFile(configFile);
    return config.dir;
  }
}

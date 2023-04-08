import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FileService } from './services/file-service/file.service';

@WebSocketGateway({ cors: true })
export class StudioGateway {
  @WebSocketServer()
  server;

  fileService: FileService = new FileService();

  @SubscribeMessage('files')
  handleFiles() {
    const files = this.fileService.getFiles('./example/i18n');
    const filteredFiles = this.fileService.filterFiles(files, '.json');
    this.server.emit('files', filteredFiles);
  }
}

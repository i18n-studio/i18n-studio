import { Module } from '@nestjs/common';
import { StudioGateway } from './studio.gateway';
import { FileService } from './services/file-service/file.service';
import { ConfigService } from './services/config-service/config.service';
import AnalyzerService from './services/analyzer-service/analyzer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StudioGateway, FileService, ConfigService, AnalyzerService],
})
export class AppModule {}

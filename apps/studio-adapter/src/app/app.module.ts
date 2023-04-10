import { Module } from '@nestjs/common';
import { StudioGateway } from './studio.gateway';
import { FileService } from './services/file-service/file.service';
import { ConfigService } from './services/config-service/config.service';
import AnalyzerService from './services/analyzer-service/analyzer.service';
import TranslationService from './services/translation-service/translation.service';

const services = [
  FileService,
  ConfigService,
  AnalyzerService,
  TranslationService,
];

@Module({
  imports: [],
  controllers: [],
  providers: [StudioGateway, ...services],
})
export class AppModule {}

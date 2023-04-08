import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should get config from project root', () => {
    const config = configService.getConfigFilePath();

    expect(config).toContain('i18n.config.json');
    expect(config).not.toContain('null');
  });

  describe('read config file', () => {
    it('should read local config file', () => {
      const config = configService.getConfigFilePath();
      const configFileContent = configService.readConfigFile(config);

      expect(configFileContent).toEqual({
        dir: './example/i18n',
        pattern: '.json',
      });
    });

    it('should use default config', () => {
      const configFileContent = configService.readConfigFile('');

      expect(configFileContent).toEqual({
        dir: './i18n',
        pattern: '.json',
      });
    });
  });
});

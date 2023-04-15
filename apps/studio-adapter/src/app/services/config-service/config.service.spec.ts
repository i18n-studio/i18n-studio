import { Test } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { Config } from '../../models/Config';

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

      const expected: Config = {
        dir: './example/i18n',
        defaultLanguage: 'en',
        pattern: '.json',
      };

      expect(configFileContent).toEqual(expected);
    });

    it('should use default config', () => {
      const configFileContent = configService.readConfigFile('');

      const expected: Config = {
        dir: './i18n',
        defaultLanguage: 'en',
        pattern: '.json',
      };

      expect(configFileContent).toEqual(expected);
    });
  });
});

import * as fs from 'fs';
import { Config } from '../../models/Config';
import LoggingService from '../../../../../../libs/api/src/lib/service/LoggingService';
import * as process from 'process';
import { Injectable } from '@nestjs/common';

/**
 * Service which handles the usage of the i18n config file.
 */
@Injectable()
export class ConfigService {
  public static CONFIG_FILE = 'i18n.config.json';

  logger = LoggingService.getInstance();

  /**
   * Get the path of the config file.
   */
  public getConfigFilePath(): string | null {
    try {
      const projectRoot = this.getProjectRoot();
      const file = `${projectRoot}\\${ConfigService.CONFIG_FILE}`;
      this.logger.info(
        'ConfigService',
        'getConfigFilePath',
        `Use config file ${file}.`
      );
      return file;
    } catch (e) {
      this.logger.info('ConfigService', 'getConfigFilePath', e);
      return null;
    }
  }

  /**
   * Read the config file.
   * If no config file exists, use the default config instead.
   * @param filepath {string} the path where the config exists.
   */
  public readConfigFile(filepath: string): Config {
    const defaultConfig = this.getDefaultConfig();

    let config: Config = {
      ...defaultConfig,
    };

    if (fs.existsSync(filepath)) {
      const fileContent = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      config = {
        ...config,
        ...fileContent,
      };
    } else {
      this.logger.info(
        'ConfigService',
        'readConfigFile',
        'config file not found.'
      );
    }
    return config;
  }

  public getConfig(): Config {
    const configFile = this.getConfigFilePath();
    return this.readConfigFile(configFile);
  }

  private getDefaultConfig(): Config {
    return {
      dir: './i18n',
      pattern: '.json',
      defaultLanguage: 'en',
    };
  }

  /**
   * Get the root of the project, by traversing the file system backwards, until
   * we found the node_modules folder.
   * @private
   */
  private getProjectRoot(): string {
    let projectRoot = null;
    const currentPath = __dirname;
    const pathDelimiter = this.getPathDelimiter();

    const pathParts = currentPath.split(pathDelimiter);

    // we need a temporary variable, which we pop() every time we iterate over
    // the file system.
    const pathPartsCopy = currentPath.split(pathDelimiter);

    pathParts.forEach(() => {
      pathPartsCopy.pop();
      const buildNewPath = pathPartsCopy.join(pathDelimiter);

      const currentPathWithNodeModules = `${buildNewPath}${pathDelimiter}node_modules`;
      if (fs.existsSync(currentPathWithNodeModules)) {
        projectRoot = buildNewPath;
      }
    });

    return projectRoot;
  }

  private getPathDelimiter(): string {
    const platform = process.platform;

    if (platform === 'win32') {
      return '\\';
    }

    return '/';
  }
}

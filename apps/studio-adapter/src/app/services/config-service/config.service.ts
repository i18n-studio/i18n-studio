import * as fs from 'fs';
import { Config } from '../../models/Config';

/**
 * Service which handles the usage of the i18n config file.
 */
export class ConfigService {
  public static CONFIG_FILE = 'i18n.config.json';

  /**
   * Get the path of the config file.
   */
  public getConfigFilePath(): string | null {
    try {
      const projectRoot = this.getProjectRoot();
      return `${projectRoot}\\${ConfigService.CONFIG_FILE}`;
    } catch (e) {
      console.error(e);
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
        ...fileContent,
      };
    }
    return config;
  }

  private getDefaultConfig(): Config {
    return {
      dir: './i18n',
      pattern: '.json',
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

    const pathParts = currentPath.split('\\');

    // we need a temporary variable, which we pop() every time we iterate over
    // the file system.
    const pathPartsCopy = currentPath.split('\\');

    pathParts.forEach(() => {
      pathPartsCopy.pop();
      const buildNewPath = pathPartsCopy.join('\\');

      const currentPathWithNodeModules = `${buildNewPath}\\node_modules`;
      if (fs.existsSync(currentPathWithNodeModules)) {
        projectRoot = buildNewPath;
      }
    });

    return projectRoot;
  }
}
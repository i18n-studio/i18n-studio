/**
 * Interface representing the configuration file.
 */
export interface Config {
  dir?: string; // directory, in which the translation files are
  pattern?: string; // the pattern, which matches the configuration files
  defaultLanguage?: string; // the default language
}

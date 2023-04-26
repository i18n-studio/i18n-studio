const fs = require('fs');

/**
 * Set up the developer workspace by:
 * * creating a dev-folder on project root
 * * create 3 different translation files for testing
 * * create the base configuration file
 */
(function setup() {
  const root = './../../';
  console.log('Setup your workspace');
  const devFolder = createDevFolder();

  createTranslationFile('de.json', { hello: 'Hallo' }, devFolder);
  createTranslationFile('en.json', { hello: 'Hello' }, devFolder);
  createTranslationFile('it.json', { hello: 'Ciao' }, devFolder);
  createConfigFile(root);

  console.log('Done!');

  function createConfigFile(path) {
    const configFile = `${path}/i18n.config.json`;
    const defaultConfig = {
      dir: './dev/i18n',
      pattern: '.json',
      defaultLanguage: 'en',
    };

    if (!fs.existsSync(configFile)) {
      console.log(`Create config file i18n.config.json`);
      fs.writeFileSync(configFile, JSON.stringify(defaultConfig), 'utf8');
    }
  }

  function createDevFolder() {
    const devFolder = `${root}/dev`;
    if (!fs.existsSync(devFolder)) {
      console.log('Create folder for translations.');
      fs.mkdirSync(devFolder);
    }
    return `${root}/dev`;
  }

  function createTranslationFile(name, content, path) {
    const i18nFolder = `${path}/i18n`;
    const filePath = `${i18nFolder}/${name}`;
    if (!fs.existsSync(i18nFolder)) {
      console.log('Create folder for translations.');
      fs.mkdirSync(i18nFolder);
    }

    if (!fs.existsSync(filePath)) {
      console.log(`Create translation file ${name}`);
      fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
    }
  }
})();

import fs from 'fs-extra';
import path from 'path';
const { BLOG_ARTICL_PATH, RES_PATH, BLOG_PATH } = require('../tools/filePath').default;
// With async/await:
const log = require('electron-log');
const writeFile = (text, fileName) => {
  try {
    const filePath = `${BLOG_ARTICL_PATH}${fileName}.md`;
    fs.outputFile(filePath, text);
  } catch (err) {
    log.error(err);
  }
};

const writeConfigFile = (text) => {
  try {
    const filePath = `${RES_PATH}blog_config.json`;

    fs.outputFile(filePath, text);
  } catch (err) {
    log.error(err);
  }
};

const copyTemplate2Local = (text) => {
  try {
    const filePath = `${BLOG_PATH}_config.yml`;
    fs.copySync(path.resolve(__dirname, '../../template'), BLOG_PATH);
    fs.outputFile(filePath, text);

    return true;
  } catch (err) {
    log.error(err);
  }

  return false;
};

export default { writeFile, writeConfigFile, copyTemplate2Local };

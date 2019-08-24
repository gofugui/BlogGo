import { app, remote } from 'electron';
import { sep } from 'path';
import fs from 'fs-extra';

const APP = process.type === 'renderer' ? remote.app : app; // 根据process.type来分辨在哪种模式使用哪种模块
const STORE_PATH = APP.getPath('temp'); // 获取electron应用的用户目录

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
  }
}

const RES_PATH = `${STORE_PATH}blogGo${sep}`;
const BLOG_PATH = `${STORE_PATH}blogGo${sep}template${sep}`;
const BLOG_ARTICL_PATH = `${BLOG_PATH}source${sep}_posts${sep}`;


export default { RES_PATH, BLOG_PATH, BLOG_ARTICL_PATH };


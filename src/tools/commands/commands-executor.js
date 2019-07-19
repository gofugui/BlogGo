const { exec } = require('child_process');
const { BLOG_PATH } = require('../filePath').default;
const log = require('electron-log');

const runCommand = (path, cmdStr, callback = () => {}) => {
  process.chdir(path);
  const workerProcess = exec(cmdStr, {});
  // 打印正常的后台可执行程序输出
  workerProcess.stdout.on('data', (data) => {
    log.info(`stdout: ${data}`);
  });

  // 打印错误的后台可执行程序输出
  workerProcess.stderr.on('data', (data) => {
    log.info(`stderr: ${data}`);
    callback(data, null);
  });

  // 退出之后的输出
  workerProcess.on('close', (code) => {
    log.info(`out code：${code}`);
    callback(null, code);
  });
};

const initModule = (callback) => {
  runCommand(BLOG_PATH, 'yarn', callback);
};

const preViewBlog = (callback) => {
  runCommand(BLOG_PATH, 'hexo server', callback);
};

export default { initModule, preViewBlog };

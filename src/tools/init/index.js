
const config = require('./config.json');
const { writeConfigFile, copyTemplate2Local } = require('../writeFile').default;
const { initModule } = require('../commands/commands-executor').default;
const YAML = require('../yaml').default;

function createConfigJSON(params) {
  const configJSON = { ...config, ...params };
  writeConfigFile(JSON.stringify(configJSON, undefined, 2));

  return configJSON;
}

const init = (args, callback) => {
  const {
    account,
  } = args;
  const url = `https://${account}.github.io`;

  const type = 'git';
  const repository = `git@github.com:${account}/${account}.github.io.git`;

  const branch = 'master';
  const deploy = { type, repository, branch };
  const params = { ...args, url, deploy };
  const configJSON = createConfigJSON(params);
  const configYML = YAML.stringify(configJSON);
  copyTemplate2Local(configYML);
  initModule(callback);
};


export default { init };

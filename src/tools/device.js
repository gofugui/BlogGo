const touchid = require('macos-touchid');
const device = {
  isWindows: process.platform === 'win32',
  canUseTouchBar: process.platform === 'darwin' && touchid.canAuthenticate(),
};


export default device;


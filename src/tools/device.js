
const device = {
  isWindows: process.platform === 'win32',
  canUseTouchBar: false,
  // process.platform === 'darwin' && require('macos-touchid').canAuthenticate(),
};


export default device;

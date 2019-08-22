const md5 = require('./md5');
function md5Pass(str) {
  const hash = md5(str);
  return md5(str, hash);
}
export default md5Pass;

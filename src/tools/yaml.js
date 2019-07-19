
import { typeOf } from 'remedial';
const maxText = 60;
const wrap = require('wordwrap')(maxText);

function stringify(data) {
  let indentLevel = '';

  const handlers = {
    undefined() {
      // objects will not have `undefined` converted to `null`
      // as this may have unintended consequences
      // For arrays, however, this behavior seems appropriate
      return 'null';
    },
    null() {
      return 'null';
    },
    number(x) {
      return x;
    },
    boolean(x) {
      return x ? 'true' : 'false';
    },
    string(x) {
      let output = '|';
      if (x.length <= maxText && x.indexOf('\n') === -1) {
        return JSON.stringify(x);
      }
      const text = wrap(x).split(/\\n|\n/);
      indentLevel = indentLevel.replace(/$/, '  ');
      text.forEach((y) => {
        output += `\n${indentLevel}${y}`;
      });
      indentLevel = indentLevel.replace(/ {2}/, '');

      return output;
    },
    date(x) {
      return x.toJSON();
    },
    array(x) {
      let output = '';

      if (x.length === 0) {
        output += '[]';
        return output;
      }

      indentLevel = indentLevel.replace(/$/, '  ');
      x.forEach((y) => {
        // TODO how should `undefined` be handled?
        const handler = handlers[typeOf(y)];

        if (!handler) {
          throw new Error(`what the crap: ${typeOf(y)}`);
        }

        output += `\n${indentLevel}- ${handler(y)}`;
      });
      indentLevel = indentLevel.replace(/ {2}/, '');

      return output;
    },
    object(x) {
      let output = '';

      if (Object.keys(x).length === 0) {
        output += '{}';
        return output;
      }

      indentLevel = indentLevel.replace(/$/, '  ');
      Object.keys(x).forEach((k) => {
        const val = x[k];
        const handler = handlers[typeOf(val)];

        if (typeof val === 'undefined') {
          // the user should do
          // delete obj.key
          // and not
          // obj.key = undefined
          // but we'll error on the side of caution
          return;
        }

        if (!handler) {
          throw new Error(`what the crap: ${typeOf(val)}`);
        }

        output += `\n${indentLevel}${k}: ${handler(val)}`;
      });
      indentLevel = indentLevel.replace(/ {2}/, '');

      return output;
    },
    function() {
      // TODO this should throw or otherwise be ignored
      return '[object Function]';
    },
  };

  return `${handlers[typeOf(data)](data)}\n`;
}
export default { stringify };

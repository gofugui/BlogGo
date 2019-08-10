// eslint-disable-next-line no-unused-vars
function resolveData(block) {
  const {
    data, type,
  } = block;
  const arr = [];
  const {
    text, content, title, message, caption, items, code,
  } = data;
  switch (type) {
    case 'paragraph':
      arr.push(text);
      break;
    case 'table':
      content.forEach((element) => {
        element.forEach((text) => {
          arr.push(text);
        });
      });
      break;
    case 'warning':
      arr.push(title, message);
      break;
    case 'quote':
      arr.push(text, caption);
      break;
    case 'list':

      items.forEach((text) => {
        arr.push(text);
      });
      break;
    case 'code':
      arr.push(code);
      break;
    case 'checklist':
      items.forEach(({ text }) => {
        arr.push(text);
      });
      break;
    case 'header':
      arr.push(text);
      break;
    default:
      break;
  }
  return arr.join('');
}
const resolveTitle = ({ blocks }) => {
  // eslint-disable-next-line no-console

  if (blocks.length) {
    return resolveData(blocks[0]);
  }
  return '';
};
const resolveContent = ({ blocks }) => {
  // eslint-disable-next-line no-console

  if (blocks.length > 1) {
    const tempBlocks = blocks.slice(1);
    const content = tempBlocks.reduce((total, item) => { total += resolveData(item); return total; }, '');
    return content;
  }
  return '';
};
exports.default = { resolveTitle, resolveContent };


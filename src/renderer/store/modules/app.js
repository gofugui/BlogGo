
import db from '../../../db';
function sort(arr) {
  const temp = arr.concat([]);
  const { length } = temp;
  if (length <= 2) return temp;
  const defaultItemFirst = temp[0];
  const defaultItemLast = temp[1];
  const sortArr = temp.slice(2).sort((a, b) => (a.name.charCodeAt(0) - b.name.charCodeAt(0)) ||
  (a.name.length - b.name.length) || a.name.localeCompare(b.name));

  return [defaultItemFirst, ...sortArr, defaultItemLast];// tempDefaultArr.splice(1, 0, tempAddArr);
}
const state = {
  tags: sort(db.select('tags')),
};
export default{
  namespaced: true,
  state,
  mutations: {
    addTags(state, tag) {
      db.add('tags', tag);
      const tags = sort(db.select('tags'));
      state.tags = tags;
    },
    deleteTags(state, id) {
      db.deleteById('tags', id);
      const tags = sort(db.select('tags'));
      state.tags = tags;
    },
    renameTags(state, value) {
      db.update('tags', value);
      const tags = sort(db.select('tags'));
      state.tags = tags;
    },

  },
};


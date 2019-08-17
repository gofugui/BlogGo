
import db from '../../../db';
function sortByName(arr) {
  const temp = arr;
  const { length } = temp;
  if (length <= 2) {
    return temp;
  }
  const defaultItemFirst = temp[0];
  const defaultItemLast = temp[1];
  const sortArr = temp.slice(2).sort((a, b) => (a.name.charCodeAt(0) - b.name.charCodeAt(0)) ||
  (a.name.length - b.name.length) || a.name.localeCompare(b.name));
  return [defaultItemFirst, ...sortArr, defaultItemLast];
}
const folderSelectId = db.select('tags')[0].id;
const defaultState = {
  tags: sortByName(db.select('tags')),
  posts: db.select('posts'),
  folderSelectId,
};
export default{
  namespaced: true,
  state: defaultState,
  mutations: {

    addTags(state, tag) {
      const id = db.add('tags', tag);
      state.folderSelectId = id;
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    deleteTags(state, id) {
      const folderList = this.getters['app/folderList'];
      const index = folderList.findIndex(item => item.id === id);

      const currentFloderPosts = db.select('posts', 'tagId', id);
      const trashTagId = this.getters['app/trashId'];
      currentFloderPosts.forEach((item) => {
        const isDelete = { tagId: trashTagId, oldTagID: id };
        db.update('posts', item.id, isDelete);
      });
      const count = db.selectCount('posts', 'tagId', trashTagId);
      db.update('tags', trashTagId, { count });

      db.deleteById('tags', id);
      const tags = sortByName(db.select('tags'));
      state.folderSelectId = tags[index - 1].id;
      state.tags = tags;
    },
    renameTags(state, value) {
      const { id } = value;
      db.update('tags', id, value);
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    currentSelectFolder(state, id) {
      state.folderSelectId = id;
    },

    addPosts(state) {
      const title = '新建备忘录';
      const content = { blocks: [] };
      const post = { title, tagId: state.folderSelectId, content };
      db.add('posts', post);
      const posts = db.select('posts');
      state.posts = posts;

      // 更新数量
      const count = db.selectCount('posts', 'tagId', state.folderSelectId);
      db.update('tags', state.folderSelectId, { count });
      // 更新state
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    deletePost(state, value) {
      const { id, tagId } = value;
      const trashTagId = this.getters['app/trashId'];


      // 废纸篓里面的数据直接删除,否则移到废纸篓
      // 废纸篓删除后直接减1
      // 非废纸篓的，减一，废纸篓加一，
      if (tagId === trashTagId) {
        db.deleteById('posts', id);
      } else {
        const isDelete = { tagId: trashTagId, oldTagID: tagId, fixed: false };
        db.update('posts', id, isDelete);
        // 更新数量
        const count = db.selectCount('posts', 'tagId', trashTagId);
        db.update('tags', trashTagId, { count });
        // 更新state
        const tags = sortByName(db.select('tags'));
        state.tags = tags;
      }
      const count = db.selectCount('posts', 'tagId', state.folderSelectId);
      db.update('tags', tagId, { count });

      const posts = db.select('posts');
      state.posts = posts;
    },
    updatePost(state, post) {
      const { time, id } = post;
      const updateContent = { timestamp: time, content: post };
      db.update('posts', id, updateContent);
      const posts = db.select('posts');
      state.posts = posts;
    },
    fixedPost(state, { id, fixed }) {
      const updateToFixed = { fixed };
      db.update('posts', id, updateToFixed);
      const posts = db.select('posts');
      state.posts = posts;
    },
  },
  getters: {
    folderList: state => state.tags.filter(item => !item.EmptyNotShow || item.count),
    trashId: state => state.tags.find(item => item.name === '最近删除').id,
    currentSelectFolder: state => state.tags.findIndex(item => item.id === state.folderSelectId),
    currentFolderPosts: state => state.posts.filter(item =>
      item.tagId === state.folderSelectId).sort((a, b) => {
      if (b.timestamp === a.timestamp) {
        return -1;
      }
      return b.timestamp - a.timestamp;
    }),
    // lastPost: state => state.posts[state.posts.length - 1].id,
  },
};


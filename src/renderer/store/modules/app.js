
import { systemPreferences } from 'electron';
import db from '../../../db';
import md5Pass from '../../utils/md5';
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
  isUnLock: false,
  isWindows: process.platform === 'win32',
  canUseTouchBar: process.platform === 'darwin' && systemPreferences.canPromptTouchID(),
  password: '',
};
export default{
  namespaced: true,
  state: defaultState,
  mutations: {
    init(state, initialState) {
      state = { ...state, ...initialState };
    },
    addFolder(state, tag) {
      const id = db.add('tags', tag);
      state.folderSelectId = id;
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    deleteFolder(state, id) {
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
    renameFolder(state, value) {
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
      const { time, id, title } = post;
      const updateContent = { timestamp: time, content: post, title };
      db.update('posts', id, updateContent);
      const posts = db.select('posts');
      state.posts = posts;
    },
    lockPost(state, post) {
      const { isLock, id } = post;
      const updateContent = { isLock };
      db.update('posts', id, updateContent);
      const posts = db.select('posts');
      state.posts = posts;
    },
    unlockPosts(state, flag = true) {
      state.isUnLock = flag;
    },
    fixedPost(state, { id, fixed }) {
      const updateToFixed = { fixed };
      db.update('posts', id, updateToFixed);
      const posts = db.select('posts');
      state.posts = posts;
    },
    moveToAnotherFolder(state, { postId, tagId }) {
      const movetoFolder = { tagId, oldTagID: state.folderSelectId };
      db.update('posts', postId, movetoFolder);
      // 更新数量
      const moveToFolderCount = state.tags.find(item => item.id === tagId).count;
      db.update('tags', tagId, { count: moveToFolderCount ? moveToFolderCount + 1 : 1 });
      const moveFolderCount = state.tags.find(item => item.id === state.folderSelectId).count;
      db.update('tags', state.folderSelectId, { count: moveFolderCount - 1 });

      const posts = db.select('posts');
      state.posts = posts;
      // 更新state
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    resumePost(state, { postId, tagId, oldTagID }) {
      const resumetoFolder = { tagId: oldTagID, oldTagID: tagId };
      db.update('posts', postId, resumetoFolder);

      // 更新数量
      const resumeToFolderCount = state.tags.find(item => item.id === oldTagID).count;
      db.update('tags', oldTagID, { count: resumeToFolderCount ? resumeToFolderCount + 1 : 1 });
      const resumeFolderCount = state.tags.find(item => item.id === tagId).count;
      db.update('tags', tagId, { count: resumeFolderCount - 1 });
      const posts = db.select('posts');
      state.posts = posts;
      // 更新state
      const tags = sortByName(db.select('tags'));
      state.tags = tags;
    },
    lockPostByPassword(state, password) {
      if (password) {
        state.password = md5Pass(password);
      }
    },
  },
  actions: {
    init(context, initialState) {
      context.commit('init', initialState);
    },
    updatePost(context, post) {
      context.commit('updatePost', post);
    },
    deletePost(context, value) {
      context.commit('deletePost', value);
    },
    addPosts(context) {
      context.commit('addPosts');
    },
    fixedPost(context, { id, fixed }) {
      context.commit('fixedPost', { id, fixed });
    },
    lockPost(context, post) {
      context.commit('lockPost', post);
      context.commit('unlockPosts');
    },
    unlockPosts(context, flag) {
      context.commit('unlockPosts', flag);
    },
    currentSelectFolder(context, id) {
      context.commit('currentSelectFolder', id);
    },
    renameFolder(context, value) {
      context.commit('renameFolder', value);
    },
    addFolder(context, tag) {
      context.commit('addFolder', tag);
    },
    deleteFolder(context, id) {
      context.commit('deleteFolder', id);
    },
    moveToAnotherFolder(context, id) {
      context.commit('moveToAnotherFolder', id);
    },
    resumePost(context, params) {
      context.commit('resumePost', params);
    },
    lockPostByPassword(context, { post, password }) {
      context.commit('lockPost', post);
      context.commit('unlockPosts');
      if (password) {
        context.commit('lockPostByPassword', password);
      }
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


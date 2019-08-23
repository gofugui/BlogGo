<template>
  <div @blur="divOnBlur" @focus="divOnFocus" tabindex="1" class="leftSider">
      <Modal
        v-model="modal1"
        :title="tipInfo"
          @on-ok="ok"
          @on-cancel="cancel">
          <div style="display:flex;justify-content:center;align-items:center;">
            
            <Input autofocus v-model="password" type="password" placeholder="输入密码..." style="width: 300px" />
          </div>
      </Modal>
      <div  class="item" @dblclick.prevent='onItemDoubleClick(index)' @click.prevent='onItemClick(index)' v-bind:class="{select:sel === index,unfocus:sel === index&&(!isFocus)}" v-for="(item,index) in factory()" :key="item.id">
        <div class="leftContent">
            <div v-show="item.isLock">
                <span class="icon iconfont" v-if="isUnLock">&#xe69a;</span>
                <Icon v-else type="ios-lock"/>
            </div>
           
        </div>
        <div class="itemContent">
          <div class="contentTitle"><Tag v-show="item.fixed" color="orange">置顶</Tag><span v-html="getTitle(item)"></span></div>
          <div class="describer">
            <span style="color:rgba(224,224,224,1);font-size:13px">{{formatTime(item.timestamp)}}</span>
            <span v-if="item.isLock" style="color:rgba(174,174,174,1);font-size:13px;" v-html="isUnLock?'已解锁': '已锁定'"></span>
            <span v-else v-html="getContent(item)"></span>
          </div>
          <div class="folderInfo" v-if="searchText"> 
            <Icon type="ios-folder-open" /><span style="font-size:13px;">{{matchFolderName(item.tagId)}}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import momentLocale from 'moment/locale/zh-cn';
import bus from '../../common/js/bus';
import md5Pass from '../../utils/md5';

const { resolveContent, resolveMatchContent } = require('../../../tools/resolveContentJson').default;
const moment = require('moment');
moment.updateLocale('zh-cn', momentLocale);
export default {

  data() {
    return {
      type: 1, // 菜单的当前状态
      sel: 0,
      isFocus: false,
      lastSelFolderId: '',
      searchText: '',
      modal1: false,
      tagId: '',
      routeParams: '',
      password: '',
      tipInfo: '',
    };
  },
  methods: {

    // 用于切换显示文件夹下备忘录和搜索备忘录功能
    factory() {
      const { name, params } = this.$route;
      /**
       * 1、路由侦听,自己所在的路由和，从自身下发的路由
       */
      if (name === 'editor') {
        return this.searchText ? this.sortSearchPosts : this.currentFolderPosts;
      }
      const text = params.searchText;
      if (text) {
        if (this.searchText !== text) {
          this.searchText = text;
          this.searchPosts = this.onSearch;

          // 存储搜索前列表的选项索引，在搜索完成后还原
          if (!this.storeSel) {
            // 当页面处于搜索状态时，菜单状态为2，只可以删除或者移到其他文件夹
            this.type = 2;
            this.emitMenu();
            this.storeSel = this.sel;
          }
          this.sel = 0;
        }

        return this.sortSearchPosts;
      }
      this.sel = this.storeSel ? this.storeSel : this.sel;
      this.storeSel = '';
      // 当页面恢复常规状态时，状态为1可进行各种操作
      this.type = 1;
      this.emitMenu();
      this.searchText = '';

      return this.currentFolderPosts;
    },
    matchFolderName(tagId) {
      const value = this.$store.state.app.tags.find(item => item.id === tagId);

      if (!value) return '';
      const { name } = value;
      return name;
    },
    resume() {
      const { oldTagID, tagId } = this.currentSelPost;
      const params = { postId: this.id, tagId, oldTagID };
      this.$store.dispatch('app/resumePost', params);
    },
    routeTo() {
      const {
        id, time, isLock,
      } = this.currentSelPost;
      const routerStr = `/router-view/editor/${id}/${time}/${isLock}`;

      this.$router.push(routerStr);
    },
    formatTime(timestamp, type) {
      if (type) {
        return moment(timestamp).format(type);
      }
      return moment(timestamp).calendar(); // moment(timestamp).startOf('hour').fromNow();//
    },
    emitMenu() {
      const currentPosts = this.searchText ? this.sortSearchPosts : this.currentFolderPosts;
      const value = currentPosts.find((item, _index) => this.sel === _index);
      if (!value) {
        bus.$emit('show', {
          menu: [
            [{ label: '新建备忘录', onPress: this.addBlog }],
          ],
        });
        return;
      }
      const fixLabel = value.fixed ? '取消置顶备忘录' : '置顶备忘录';
      const lockLabel = value.isLock ? '移除锁定' : '锁定备忘录';
      // const fixLabel = '置顶备忘录';
      if (this.type === 1) {
        if (this.folderSelectId === this.trashId) {
          bus.$emit('show', {
            menu: [
              [{ label: '删除', onPress: this.deletePost }],

              [{
                type: 'separator',
              }],
              [{ label: '移到', submenu: this.allFolder }],
              [{
                type: 'separator',
              }],
              [{ label: '恢复', onPress: this.resume }],
            ],
          });
        } else {
          bus.$emit('show', {
            menu: [
              [{ label: '删除', onPress: this.deletePost }],
              [{
                type: 'separator',
              }],
              [
                { label: fixLabel, onPress: this.fixPost },
                { label: lockLabel, onPress: this.lockPost },
              ],
              [{
                type: 'separator',
              }],
              [{ label: '移到', submenu: this.allFolder }],
              [{
                type: 'separator',
              }],
              [{ label: '新建备忘录', onPress: this.addBlog }],
            ],
          });
        }
      } else if (this.type === 2) {
        bus.$emit('show', {
          menu: [
            [{ label: '删除', onPress: this.deletePost }],
            [{ type: 'separator' }],
            [{ label: '移到', submenu: this.allFolder }],
          ],
        });
      }
    },
    lockPost() {
      const { id, isLock } = this.currentSelPost;
      if (this.canUseTouchBar) {
        const { ipcRenderer } = require('electron');

        ipcRenderer.send(
          'asynchronous-touchBar',
          {
            type: 'app/lockPost',
            tipInfo: isLock ? '移除对此备忘录的锁定' : '锁定此备忘录',
            params: { isLock: !isLock, id },
          },
        );
        return;
      }
      // 清空密码输入框
      this.password = '';
      if (!this.validatePassword) {
        this.tipInfo = '输入备忘录密码锁定备忘录';
        this.modal1 = true;
      } else { // 有密码
        // 移除锁定
        if (isLock) {
          this.tipInfo = '验证备忘录密码,移除对此备忘录的锁定';
        } else {
          this.tipInfo = '验证备忘录密码,锁定备忘录';
        }
        this.modal1 = true;
      }
    },
    onItemClick(index) {
      this.sel = index;
      this.isFocus = true;
      this.routeTo();
      const { id, tagId } = this.currentSelPost;
      this.id = id;
      this.tagId = tagId;

      this.emitMenu();
    },
    onItemDoubleClick(index) {
      // const { BrowserWindow } = require('electron').remote;

      const { ipcRenderer } = require('electron');

      this.sel = index;
      const { id, time, isLock } = this.currentSelPost;
      ipcRenderer.send('asynchronous-message', { id, time, isLock });
    },
    divOnFocus() {
      //
      this.emitMenu();
    },
    divOnBlur() {
      this.isFocus = false;
    },
    addBlog() {
      const index = this.currentFolderPosts.findIndex(item => !item.content.blocks.length);
      if (index > -1) {
        this.sel = index;
        this.isFocus = true;
        this.routeTo();
      } else {
        this.$store.dispatch('app/addPosts');
      }
      //
    },
    deletePost() {
      const postsArr = this.searchText ? this.sortSearchPosts : this.currentFolderPosts;
      const value = postsArr.find((item, index) => index === this.sel);
      if (!value) {
        this.$Message.info('没有待删除项');
        return;
      }
      this.$store.dispatch('app/deletePost', value);
      if (this.sel) {
        this.sel = this.sel - 1 > -1 ? this.sel - 1 : 0;
      }
    },
    // 置顶备忘录或取消置顶
    fixPost() {
      const value = this.currentFolderPosts.find((item, index) => this.sel === index);
      const { id } = value;

      this.$store.dispatch('app/fixedPost', { id, fixed: !value.fixed });
    },
    subStrMatchText(text, num = 10) {
      if (this.searchText) {
        const index = text.indexOf(this.searchText);

        if (index > -1) {
          const lastIndex = index + this.searchText.length;
          const str = `<font color="#DAA520">${this.searchText}</font>`;
          if (index - num > -1) {
            return `...${text.substring(index - num, index)}${str}${text.substring(lastIndex)}`;
          }
          return text.substring(0, index) + str + text.substring(lastIndex);
        }
      }
      return '';
    },
    // // 截取字符作为标题
    getTitle({ title }) {
      return this.subStrMatchText(title) || title;
    },
    // 截取字符作为内容简介
    getContent({ content }) {
      const subContent = resolveContent(content);
      return this.subStrMatchText(subContent, 3) || subContent || '无附加文本';
    },
    ok() {
      const { id, isLock } = this.currentSelPost;

      if (!this.validatePassword) {
        this.$store.dispatch('app/lockPostByPassword', { post: { isLock: !isLock, id }, password: this.password });
      } else { // 验证当前密码
        if (this.validatePassword !== md5Pass(this.password)) {
          // 密码验证失败，锁定备忘录失败
          this.$Message.info('密码验证失败，锁定备忘录失败');
          return;
        }
        this.$store.dispatch('app/lockPostByPassword', { post: { isLock: !isLock, id } });
      }
      // this.$Message.info('Clicked ok');
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    },
    moveToAnotherFolder(tagId) {
      this.$store.dispatch('app/moveToAnotherFolder', { postId: this.id, tagId });
    },
  },
  mounted() {
    this.lastSelFolderId = this.folderSelectId;
    this.routeTo();

    bus.$on('addPost', () => {
      this.addBlog();
    });
    bus.$on('deletePost', () => {
      this.deletePost();
    });
  },
  computed: {
    currentFolderPosts() {
      const posts = this.$store.getters['app/currentFolderPosts'];
      const fixedPosts = posts.filter(item => item.fixed);
      const noFixedPosts = posts.filter(item => !item.fixed);
      const newPostsList = [...fixedPosts, ...noFixedPosts];

      return newPostsList;
    },
    currentSelPost() {
      const postsArr = this.searchText ? this.sortSearchPosts : this.currentFolderPosts;
      const currentIndex = this.sel || 0;
      const post = postsArr.find((item, index) => index === currentIndex);

      if (post) {
        const {
          id, timestamp, isLock, tagId, oldTagID,
        } = post;
        return {
          id, time: this.formatTime(timestamp, 'LLL'), isLock, tagId, oldTagID,
        };
      }
      return { id: '404', time: '0', isLock: false };
    },
    folderSelectId() {
      return this.$store.state.app.folderSelectId;
    },
    trashId() {
      return this.$store.getters['app/trashId'];
    },
    allPosts() {
      return this.$store.state.app.posts;
    },
    canUseTouchBar() {
      return this.$store.state.app.canUseTouchBar;
    },
    isUnLock() {
      return this.$store.state.app.isUnLock;
    },
    allFolder() {
      return this.$store.state.app.tags.filter(item =>
        item.id !== this.trashId && item.id !== this.tagId).map(item => ({
        label: item.name,
        onPress: () => { this.moveToAnotherFolder(item.id); },
      }));
    },
    sortSearchPosts() {
      const tempSearchPosts = this.searchPosts.sort((a, b) => b.timestamp - a.timestamp);
      const searchFixedPosts = tempSearchPosts.filter(item => item.fixed);
      const searchUnFixedPosts = tempSearchPosts.filter(item => !item.fixed);
      return [...searchFixedPosts, ...searchUnFixedPosts];
    },
    onSearch() {
      const matchPosts = this.allPosts.reduce((total, item) => {
        const flag = resolveMatchContent(item.content, this.searchText);
        if (flag) {
          total.push(item);
        }
        return total;
      }, []);
      return matchPosts;
    },
    validatePassword() {
      return this.$store.state.app.password;
    },
  },
  updated() {
    if (this.lastSelFolderId !== this.folderSelectId) {
      this.sel = 0;
      this.lastSelFolderId = this.folderSelectId;
      this.routeTo();
    }
  },
  watch: {
    $route: 'factory',
    searchText() {
      this.routeTo();
    },
    currentFolderPosts(newList, oldList) {
      if (this.lastSelFolderId === this.folderSelectId) {
        if (newList.length > oldList.length) {
          this.sel = newList.findIndex(item => item.title === '新建备忘录');
          const post = newList.find(item => item.title === '新建备忘录');
          if (post) {
            this.id = post.id;
          }

          this.routeTo();
        } else if (newList.length < oldList.length) {
          this.routeTo();
        } else if (this.id) {
          this.sel = newList.findIndex(item => item.id === this.id);
        }
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
   
    .leftSider
      font  bold 14px/20px arial,sans-serif;
      outline 0
      width 100%
      height 100%
      box-shadow -2px 0 8px rgba(0,0,0,.15)
      position absolute
      
      overflow hidden
      &:hover
       overflow overlay
      
    .defaultStyle
      background rgba(52,53,55,1)
    .select
      background rgba(194,150,60,1)
      div.itemContent
        border-bottom: 0px
    .unfocus
      background rgba(52,53,55,1)
    .item 
      width 100%
      display flex
      flex-direction row
      cursor pointer
      .leftContent
        width 1.25rem
        height 100%
        padding-top 9px
        text-align center
      .itemContent
        width 100%
        height 100%
        padding-top 10px
        border-bottom:.05px solid rgba(52,53,55,1);
        padding-bottom 10px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        .contentTitle
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
        .describer
          color rgba(174,174,174,1)
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
    .folderInfo
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        color rgba(174,174,174,1)
</style>
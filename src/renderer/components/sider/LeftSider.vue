<template>
  <div @blur="divOnBlur" @focus="divOnFocus" tabindex="1" class="leftSider">
      
      <div  class="item" @click.prevent='onItemClick(index)' v-bind:class="{select:sel === index,unfocus:sel === index&&(!isFocus)}" v-for="(item,index) in this.factory()" :key="item.id">
        <div class="itemContent">
          <div v-html="getTitle(item)"></div>
          <div class="describer">
            <span style="color:rgba(224,224,224,1);font-size:13px">{{formatTime(item.timestamp)}}</span>
            <span style="color:rgba(174,174,174,1);font-size:13px;" v-html="getContent(item)"></span>
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
const { resolveTitle, resolveContent, resolveMatchContent } = require('../../../tools/resolveContentJson').default;

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
    };
  },
  methods: {
    matchFolderName(tagId) {
      const value = this.$store.state.app.tags.find(item => item.id === tagId);

      if (!value) return '';
      const { name } = value;
      return name;
    },
    factory() {
      const routerName = this.$route.name;
      /**
       * 1、路由侦听,自己所在的路由和，从自身下发的路由
       */
      if (routerName === 'editor') {
        return this.searchText ? this.searchPosts : this.currentFolderPosts;
      }
      const text = this.$route.params.searchText;
      if (text) {
        if (this.searchText !== text) {
          // 存储搜索前列表的选项索引，在搜索完成后还原
          if (!this.storeSel) {
            // 当页面处于搜索状态时，菜单状态为2，只可以删除或者移到其他文件夹
            this.type = 2;
            this.emitMenu();
            this.storeSel = this.sel;
          }
          this.searchPosts = this.onSearch(text);
          this.searchText = text;
          this.sel = 0;
        }
        return this.searchPosts;
      }
      this.sel = this.storeSel;
      this.storeSel = '';
      // 当页面恢复常规状态时，状态为1可进行各种操作
      this.type = 1;
      this.emitMenu();
      this.searchText = '';

      return this.currentFolderPosts;
    },
    onSearch(text) {
      const matchPosts = this.allPosts.reduce((total, item) => {
        const flag = resolveMatchContent(item.content, text);
        if (flag) {
          total.push(item);
        }
        return total;
      }, []);
      return matchPosts;
    },
    routeTo() {
      const { id, time } = this.currentSelPostId();

      this.$router.push(`/router-view/editor/${id}/${time}`);
    },
    formatTime(timestamp, type) {
      if (type) {
        return moment(timestamp).format(type);
      }
      return moment(timestamp).calendar(); // moment(timestamp).startOf('hour').fromNow();//
    },
    emitMenu() {
      if (this.type === 1) {
        if (this.folderSelectId === this.trashId) {
          bus.$emit('show', {
            menu: [
              [{ label: '删除', onPress: this.deletePost }],

              [{
                type: 'separator',
              }],
              [{ label: '移到', onPress: () => null }],
              [{
                type: 'separator',
              }],
              [{ label: '恢复', onPress: () => null }],
            ],
          });
        } else {
          bus.$emit('show', {
            menu: [
              [{ label: '删除', onPress: this.deletePost }],
              [{ type: 'separator' }],
              [{ label: '置顶备忘录', onPress: () => null },
                { label: '锁定备忘录', onPress: () => null }],
              [{
                type: 'separator',
              }],
              [{ label: '移到', onPress: () => null }],
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
            [{ label: '移到', onPress: () => null }],
          ],
        });
      }
    },
    onItemClick(index) {
      this.sel = index;
      this.routeTo();
      this.emitMenu();
      this.isFocus = true;
    },
    divOnFocus() {
      //
      this.emitMenu();
    },
    divOnBlur() {
      this.isFocus = false;
    },
    currentSelPostId() {
      const postsArr = this.searchText ? this.searchPosts : this.currentFolderPosts;

      const post = postsArr.find((item, index) => index === this.sel);
      if (post) {
        const { id, timestamp } = post;
        return { id, time: this.formatTime(timestamp, 'LLL') };
      }
      return { id: '404', time: 0 };
    },
    addBlog() {
      const index = this.currentFolderPosts.findIndex(item => !item.content.blocks.length);
      if (index > -1) {
        this.sel = index;
        this.isFocus = true;
      } else {
        this.$store.commit('app/addPosts');
        this.sel = 0;
      }
      this.routeTo();
    },
    deletePost() {
      const postsArr = this.searchText ? this.searchPosts : this.currentFolderPosts;
      const value = postsArr.find((item, index) => index === this.sel);
      if (!value) {
        this.$Message.info('没有待删除项');
        return;
      }
      this.$store.commit('app/deletePost', value);
      if (this.sel) {
        this.sel = this.sel - 1 > -1 ? this.sel - 1 : 0;
      }
      this.routeTo();
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
    // 截取字符作为标题
    getTitle({ content, title }) {
      const subTitle = resolveTitle(content);

      return this.subStrMatchText(subTitle) || subTitle || title;
    },
    // 截取字符作为内容简介
    getContent({ content }) {
      const subContent = resolveContent(content);
      return this.subStrMatchText(subContent, 3) || subContent || '无附加文本';
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
    isActive: vm => vm.$store.state.app.isActive,
    currentFolderPosts() {
      return this.$store.getters['app/currentFolderPosts'];
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
    
      padding-left 20px
      padding-top 10px
      cursor pointer
      .itemContent
        width 100%
        height 100%
        border-bottom:.05px solid rgba(52,53,55,1);
        padding-bottom 10px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
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
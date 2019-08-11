<template>
  <div @blur="divOnBlur" @focus="divOnFocus" tabindex="1" class="leftSider">
      <div class="item" @click.prevent='onItemClick(index)' v-bind:class="{select:sel === index,unfocus:sel === index&&(!isFocus)}" v-for="(item,index) in currentFolderPosts" :key="index">
        <div class="itemContent">
          {{getTitle(item)}}
          <div class="describer">
            <span style="color:rgba(224,224,224,1);font-size:13px">{{formatTime(item.timestamp)}}</span>
            <span style="color:rgba(174,174,174,1);font-size:13px;">{{getContent(item)}}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import momentLocale from 'moment/locale/zh-cn';
import bus from '../../common/js/bus';
const { resolveTitle, resolveContent } = require('../../../tools/resolveContentJson').default;

const moment = require('moment');

moment.updateLocale('zh-cn', momentLocale);
export default {

  data() {
    return {

      sel: 0,
      isFocus: false,
      lastSelFolderId: '',
    };
  },
  methods: {
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
    },
    onItemClick(value) {
      this.sel = value;
      const item = this.currentFolderPosts.find((item, index) => value === index);
      const { id } = item;
      // this.$store.commit('app/currentSelectPost', id);
      this.routeTo(id);
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
      const post = this.currentFolderPosts.find((item, index) => index === this.sel);
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
      const value = this.currentFolderPosts.find((item, index) => index === this.sel);
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
    // 截取字符作为标题
    getTitle({ content, title }) {
      const subTitle = resolveTitle(content);

      return subTitle || title;
    },
    // 截取字符作为内容简介
    getContent({ content }) {
      const subContent = resolveContent(content);
      return subContent || '无附加文本';
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
  },
  updated() {
    if (this.lastSelFolderId !== this.folderSelectId) {
      this.sel = 0;
      this.lastSelFolderId = this.folderSelectId;
      this.routeTo();
    }
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
      height 58px
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
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
</style>
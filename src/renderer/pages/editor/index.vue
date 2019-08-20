<template>
  <div id="editLayout" @click="onNewBlog">
    
    <div v-show="id">
      <div v-show="isLock" class="lockMask">
          <button @click="unLockPost" style="background:transparent;border:0px;outline:0">
          
            <div><Icon size="120" style="color:rgba(64,64,64,1)" type="md-lock" /></div>
            <div v-show="touchBar" style="margin-top:-38px;"><span :class="['icon','iconfont','touchStyle']">&#xe602;</span></div>  
          </button>  
          <div style="margin-top: 10px"><h3>此备忘录已被锁定</h3></div> 
          <div>{{touchBar?'请使用触控ID查看此备忘录':'请输入备忘录密码查看此备忘录'}}</div> 
          <div v-show="!touchBar" style="margin-top: 10px"><input placeholder="输入密码" style="width: 200px" type="password"/></div>
      </div>
      <div > 
        <div class="label"><label>{{time}}</label></div>
        <div id="editor"/>
      </div>
    </div> 
  </div>
</template>
<script>
import momentLocale from 'moment/locale/zh-cn';
import EditorJS from '@editorjs/editorjs';
import bus from '../../common/js/bus';
const moment = require('moment');
const touchid = require('macos-touchid');
moment.updateLocale('zh-cn', momentLocale);
// const AttachesTool = require('@editorjs/attaches');
// const Personality = require('@editorjs/personality');
const Quote = require('@editorjs/quote');
const Header = require('@editorjs/header');
const Delimiter = require('@editorjs/delimiter');
const SimpleImage = require('@editorjs/simple-image');
const List = require('@editorjs/list');
const Checklist = require('@editorjs/checklist');
const Warning = require('@editorjs/warning');
const Marker = require('@editorjs/marker');
const CodeTool = require('@editorjs/code');
const InlineCode = require('@editorjs/inline-code');
const Embed = require('@editorjs/embed');
const LinkTool = require('@editorjs/link');
const Table = require('@editorjs/table');
const currentWindow = require('electron').remote.getCurrentWindow();
const { resolveTitle } = require('../../../tools/resolveContentJson').default;
export default {
  name: 'EditorPage',
  data() {
    return {
      id: '',
      content: '',
      time: '',
      isLock: false,
      touchBar: false,
    };
  },
  methods: {
    // 比较文档是否还存在差异
    contentDiff(newData) {
      // if (!newData.blocks.length) return false;
      if (!this.content) return true;

      const replaceSpace = (text) => {
        if (!text) return '';
        return text.replace(/&nbsp;/g, '');
      };

      for (let i = 0; i < newData.blocks.length; i += 1) {
        if (!this.content.blocks[i]) return true;
        const keys = Object.keys(newData.blocks[i]);
        for (let j = 0; j < keys.length; j += 1) {
          if (!this.content.blocks[i][keys[j]]) {
            return true;
          }
          const oldText = replaceSpace(JSON.stringify(this.content.blocks[i][keys[j]]));
          const newText = replaceSpace(JSON.stringify(newData.blocks[i][keys[j]]));
          if (oldText !== newText) {
            return true;
          }
        }
      }
      return false;
    },
    unLockPost() {
      if (process.platform === 'darwin') {
        const { ipcRenderer } = require('electron');


        ipcRenderer.send('asynchronous-unlock');
        // if (touchid.canAuthenticate() === false) {
        //   return;
        // }
        // touchid.authenticate('解锁此备忘录', (err, didAuthenticate) => {
        //   if (!err) {
        //     if (didAuthenticate) {
        //       this.$store.dispatch('app/unlockPosts');
        //     }
        //   }
        // });
      }
    },
    async save() {
      if (!currentWindow.isFocused()) return;

      // 当从不同的文件夹切换时处理
      if (this.oldId && this.oldId !== this.id) {
        this.oldId = this.id;
        return;
      }
      const [error, content] = await this.editor.save().then(outputData =>
        [null, outputData]).catch(error => [error, null]);
      if (this.currentFolderId === this.trashId) {
        this.$Message.info({ content: '不能编辑最近删除的备忘录，您需要先恢复备忘录', duration: 2.0 });
        this.editor.clear();
        if (this.content) {
          this.editor.render(this.content);
        }
        return;
      }
      if (!error && this.contentDiff(content)) {
        const { time } = content;
        const title = this.getTitle({ content }) || '新建备忘录';
        document.title = title;
        this.time = moment(time).format('LLL');

        this.$store.dispatch('app/updatePost', { ...content, title, id: this.id });
      } else {
        console.log(error);
      }
    },
    onNewBlog() {
      if (!this.id) {
        bus.$emit('addPost');
      }
    },
    // 截取字符作为标题
    getTitle({ content, title }) {
      const subTitle = resolveTitle(content).replace(/&nbsp;/ig, '');
      const subTitleTemp = subTitle && subTitle.length > 15 ? `${subTitle.substr(0, 15)}...` : subTitle;
      return subTitleTemp || title;
    },
    onEditor({ params } = {}) {
      this.oldId = this.id || '404';
      const {
        id, time, isLock,
      } = params;

      if (!id || id === '404') {
        this.id = '';
        document.title = '';
        return;
      }

      this.time = time;
      this.isLock = isLock === 'true';
      this.id = id;

      const { content, title } = this.post.find(item => item.id === id);

      if (!content) {
        this.editor.clear();
        return;
      }
      document.title = this.getTitle({ content, title });
      this.time = moment(content.time).format('LLL');

      const tempContent = Object.assign({}, content);
      this.content = tempContent;

      if (this.editor) {
        if (!tempContent.blocks.length) {
          this.content = '';
          this.editor.clear();
        } else {
          this.editor.render(tempContent);
        }
        return;
      }
      if (!this.initEditor) {
        this.initEditor = true;
        this.init(tempContent);
      }
    },
    getQueryVariable() {
      const query = decodeURIComponent(window.location.search).substring(1);
      const vars = query.split('&');

      if (!vars.length) return null;
      let params = null;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');

        if (pair[0]) {
          params = params || {};
          // eslint-disable-next-line prefer-destructuring
          params[pair[0]] = pair[1];
        }
      }
      return params ? { params } : null;
    },
    async init(tempContent = {}) {
      const editor = new EditorJS({
        holderId: 'editor',
        data: tempContent,
        placeholder: 'Let`s write an awesome story!',
        onChange: () => {
          this.save();
        },
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link'],
            config: {
              placeholder: 'Header',
            },
            shortcut: 'CMD+SHIFT+H',
          },
          /**
         * Or pass class directly without any configuration
         */
          image: {
            class: SimpleImage,
            inlineToolbar: ['link'],
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
          },

          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
            shortcut: 'CMD+SHIFT+O',
          },
          warning: Warning,
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },

          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+C',
          },

          delimiter: Delimiter,

          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C',
          },

          linkTool: LinkTool,

          embed: Embed,

          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T',
          },

        },
      });
      try {
        await editor.isReady;
        this.editor = editor;
        console.log('Editor.js is ready to work!');
        /** Do anything you need after editor initialization */
      } catch (reason) {
        console.log(`Editor.js initialization failed because of ${reason}`);
      }
    },
  },

  watch: {
    $route: 'onEditor',
    post() {
      if (!currentWindow.isFocused()) {
        const paramsObj = this.getQueryVariable() || this.$route;

        this.onEditor(paramsObj);
      }
    },
  },
  mounted() {
    // 路由参数的传递主要有vue router和html原生的URL传参
    if (this.$route) {
      this.onEditor(this.$route);
    } else {
      const paramsObj = this.getQueryVariable();

      this.onEditor(paramsObj);
    }
    // 判断是否可以使用Touch Bar
    if (touchid.canAuthenticate()) {
      this.touchBar = true;
    }
  },
  computed: {
    post() {
      return this.$store.state.app.posts;
    },
    trashId() {
      return this.$store.getters['app/trashId'];
    },
    currentFolderId() {
      return this.$store.state.app.folderSelectId;
    },
  },
  destroyed() {
    if (this.timer) { clearTimeout(this.timer); }
  },
};
</script>

<style lang="stylus" scoped>
  ::-webkit-input-placeholder
        color rgba(143,143,144,1)
        text-align center
  #editLayout
    
    height 100%
    width 100%
    overflow hidden
    &:hover
      overflow overlay
  .label
    display flex
    height 30px
    width 100%
    justify-content center
    align-items center
    font-size 12px
    color gray
  .lockMask
    position absolute
    width 100%
    height 100%
    display flex 
    align-items center
    justify-content center
    flex-direction column
    background rgba(40,40,40,1)
    z-index 99
    input
        width 210px
        height 24.5px
        background-color rgba(105,106,109,1)
        outline-color rgba(67,112,153,1)
        outline-width 7px
        border 0px
        color #fff
        border-radius 5px
        box-shadow 0 0 5px 2px rgba(0,0,0,0.1)
        padding: 0 5px 0 5px
    .touchStyle
      font-size 50px
      border 1px solid rgba(39,39,40,1)
      border-radius 25px
      background rgba(39,39,40,1)
      color rgba(235,68,90,1)
  #editor
    width 100%
  
</style>
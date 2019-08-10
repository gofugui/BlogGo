<template>
  <div id="editLayout" @click="onNewBlog">
      <div v-show="time" class="label"><label>{{time}}</label></div>
      <div v-show="id" id="editor"/>
  </div>
</template>
<script>
// import Quill from 'quill';

import EditorJS from '@editorjs/editorjs';
import bus from '../../common/js/bus';
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

export default {
  name: 'EditorPage',
  data() {
    return {
      id: '',
      content: '',
      time: '',
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
      const oldText = replaceSpace(JSON.stringify(this.content.blocks));
      const newText = replaceSpace(JSON.stringify(newData.blocks));

      if (oldText === newText) { return false; }
      return true;
    },

    async save() {
      if (this.oldId && this.oldId !== this.id) {
        this.oldId = this.id;
        return;
      }
      const [error, data] = await this.editor.save().then(outputData =>
        [null, outputData]).catch(error => [error, null]);
      if (!error && this.contentDiff(data)) {
        if (this.currentFolderId === this.trashId) {
          this.$Message.info({ content: '不能编辑最近删除的备忘录，您需要先恢复备忘录', duration: 2.0 });
          this.editor.clear();
          if (this.content) {
            this.editor.render(this.content);
          }
          return;
        }
        this.$store.commit('app/updatePost', { ...data, id: this.id });
      } else {
        console.log(error);
      }
    },
    onNewBlog() {
      if (!this.id) { bus.$emit('addPost'); }
    },
    onEditor() {
      this.oldId = this.id;
      this.time = this.$route.params.time;
      if (this.$route.params.id === '404') {
        this.id = '';
        return;
      }

      if (this.$route.params.id) {
        this.id = this.$route.params.id;

        const { content } = this.post.find(item => item.id === this.$route.params.id);

        if (!content) {
          this.editor.clear();
          return;
        }
        this.content = content;

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
      }
    },
    async init(tempContent) {
      const editor = new EditorJS({
        holderId: 'editor',
        data: tempContent,
        placeholder: 'Let`s write an awesome story!',
        onChange: () => { this.save(); },
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
  },
  mounted() {
    if (this.$route.params.id !== '404') {
      this.onEditor();
    }
  },
  computed: {
    post() {
      return this.$store.getters['app/currentFolderPosts'];
    },
    trashId() {
      return this.$store.getters['app/trashId'];
    },
    currentFolderId() {
      return this.$store.state.app.folderSelectId;
    },
  },


};
</script>

<style lang="stylus" scoped>
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
  #editor
    width 100%
 
</style>
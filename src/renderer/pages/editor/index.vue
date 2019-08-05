<template>
  <div id="editLayout">
      <div class="label"><label>今天 17:00</label></div>
      <div id="editor"/>
  </div>
</template>
<script>
// import Quill from 'quill';
// import Bus from '../../common/js/bus';
import EditorJS from '@editorjs/editorjs';
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
  methods: {
    save() {
      this.editor.save().then((outputData) => {
        console.log('Article data: ', outputData);
      }).catch((error) => {
        console.log('Saving failed: ', error);
      });
    },
    // async save() {
    //   const [err, data] = this.editor.save()
    //     .then(outputData => [null, outputData])
    //     .catch(err => [err, null]);
    //   if (!err) {
    //     console.log(data);
    //   }
    // },
  },
  created() {
    const editor = new EditorJS({

      holderId: 'editor',

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
    // const editor = new Quill('#editor');
    this.editor = editor;
  },
  mounted() {

  },

};
</script>

<style lang="stylus" scoped>
  #editLayout
    height 100%
    overflow-y auto
   
     max-width: 500px;
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
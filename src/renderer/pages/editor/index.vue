<template>
  <div style="height: calc(100% - 10px)">
    <div class="label"><label>今天 17:00</label></div>
     <div id="editor" contenteditable="true" />
  </div>
</template>
<script>
import Quill from 'quill';
import Bus from '../../common/js/bus';
export default {
  name: 'EditorPage',
  methods: {
    blod() {

    },
  },
  created() {
    Bus.$on('headerTitleOne', (value) => {
      this.editor.focus();
      this.editor.format('header', value);
    });
  },
  mounted() {
    const editor = new Quill('#editor');
    this.editor = editor;
  },
};
</script>

<style lang="stylus" scoped>
  div.label
    display flex
    height 30px
    width 100%
    justify-content center
    align-items center
    font-size 12px
    color gray
  #editor
    width 100%
    height 100%
    outline 0
    color #fff
</style>
<template>
     <div id="editor">
        <mavon-editor @save="$save" style="height: 100%"></mavon-editor>
    </div>
</template>
<script>

import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
const { writeFile } = require('../../../tools/writeFile').default;
export default {
  name: 'EditorPage',
  components: { mavonEditor },
  methods: {
    $save(text) {
      writeFile(text);
    },
  },
};
</script>
<style lang="stylus" scoped>
  #editor
    margin: auto;
    width: 100%;
    height: 100vh;
</style>
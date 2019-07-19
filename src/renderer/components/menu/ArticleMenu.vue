<template>
<div>
   
    <div class="item" @click="addBlog"><span slot="label"><a-icon type="file-add"/>&nbsp;创建文章</span></div>
    <div class="item" @click="preView"><span slot="label"><a-icon type="eye" />&nbsp;预览</span></div>
    <div class="item"><span slot="label"><a-icon type="cloud-upload"/>&nbsp;发布</span></div>
</div>
</template>
<script>
const { preViewBlog } = require('../../../tools/commands/commands-executor').default;
export default {
  name: 'ArticleMenu',
  data() {
    return {
      current: ['mail'],
    };
  },
  methods: {

    addBlog() {
      this.$emit('add');
    },
    preView() {
      const callback = (error) => {
        if (!error) {
          const { shell } = require('electron');
          shell.openExternal('http://localhost:4000/');
        }
      };
      preViewBlog(callback);
    },
  },
};
</script>
<style lang="stylus" scoped>
    .item
        width 100px
        padding 8px
        cursor pointer
        :hover
            color #000
            font-weight blod
        
</style>
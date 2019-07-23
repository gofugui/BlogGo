<template>
   <div class="menu" :style="{paddingLeft:pl, paddingRight:pl}">
      <a-tag @click="onShowFolder" color="rgba(104,104,107,1)">文件</a-tag>
      <a-tag color="rgba(104,104,107,1)">附件</a-tag>
      <a-tag color="rgba(104,104,107,1)">删除</a-tag>
      <a-tag color="rgba(104,104,107,1)">新建</a-tag>
      <a-tag color="rgba(104,104,107,1)">锁定</a-tag>
      <a-tag color="rgba(104,104,107,1)">表格</a-tag>
      <a-tag color="rgba(104,104,107,1)">清单</a-tag>
      <a-tag color="rgba(104,104,107,1)">格式</a-tag>
      <a-tag color="rgba(104,104,107,1)">媒体</a-tag>
      <a-tag color="rgba(104,104,107,1)">联系人</a-tag>
      <a-tag color="rgba(104,104,107,1)">共享</a-tag>

      <a-input placeholder="搜索" size='small' >
        <a-icon slot="prefix" type="search" />
        
      </a-input>
    </div>
</template>
<script>

export default {
  name: 'TopMenu',
  data() {
    return {
      pl: this.Device.isWindows ? '10px' : '80px',

    };
  },
  methods: {
    onShowFolder() {
      this.showFolder = !this.showFolder;
      this.$emit('change', this.showFolder);
    },
  },
};
</script>
<style lang="stylus" scoped>
  .menu
    width 100%
    height 100%
    display flex
    align-items center
</style>
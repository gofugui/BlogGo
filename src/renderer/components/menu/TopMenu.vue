<template>
   <div class="menu" :style="{paddingLeft:pl,paddingRight:'10px'}">
      
      <div style="display:flex;flexDirection:row;alignItems:center">
        <a-tag @click="onShowFolder" color="rgba(104,104,107,1)">文件</a-tag>
        <a-tag color="rgba(104,104,107,1)">附件</a-tag>
        <a-tag color="rgba(104,104,107,1)">删除</a-tag>
        <a-tag color="rgba(104,104,107,1)">新建</a-tag>
        <a-tag color="rgba(104,104,107,1)">锁定</a-tag>
        <a-tag color="rgba(104,104,107,1)">表格</a-tag>
        <a-tag color="rgba(104,104,107,1)">清单</a-tag>
       
        <tool-tip>
          <a-tag slot="title" id="format" color="rgba(104,104,107,1)">格式</a-tag>
          <ul slot="content">
            <tool-tip-item>123</tool-tip-item>
            <tool-tip-item>345</tool-tip-item>
          </ul>
        </tool-tip>
        <a-tag color="rgba(104,104,107,1)">媒体</a-tag>
        <a-tag color="rgba(104,104,107,1)">联系人</a-tag>
        <a-tag color="rgba(104,104,107,1)">共享</a-tag>
      </div>
     
     <Input prefix="ios-search" ref="searchInput" placeholder="搜索" class="search" />
    </div>
</template>
<script>
import ToolTip from '../tools/tooltip';
import ToolTipItem from '../tools/tooltip/tooltip-item';
export default {
  name: 'TopMenu',
  components: { ToolTip, ToolTipItem },
  data() {
    return {
      pl: this.Device.isWindows ? '10px' : '80px',
      searchText: '',
      formatClick: false,
    };
  },
  methods: {
    onShowFolder() {
      this.showFolder = !this.showFolder;
      this.$emit('change', this.showFolder);
    },

  },
  mounted() {
    const input = document.querySelector('input');
    input.style.backgroundColor = 'rgba(105,106,109,1)';
    input.style.border = '0px';
    input.style.color = '#fff';
  },
};
</script>
<style lang="stylus" scoped>
  .search
   width 200px
  .menu
    width 100%
    height 100%
    display flex
    align-items center
    justify-content space-between
   
</style>
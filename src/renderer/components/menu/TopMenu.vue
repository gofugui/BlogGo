<template>
   <div class="menu" :style="{paddingLeft:pl,paddingRight:'10px'}">
      
    <div class="item">
      <a-tag @click="onShowFolder" color="rgba(104,104,107,1)">文件</a-tag>
      <a-tag color="rgba(104,104,107,1)">附件</a-tag>
      <a-tag color="rgba(104,104,107,1)">删除</a-tag>
      <a-tag color="rgba(104,104,107,1)">新建</a-tag>
      
      
    </div>
     <div class="item">
      <a-tag color="rgba(104,104,107,1)">锁定</a-tag>
      <a-tag color="rgba(104,104,107,1)">表格</a-tag>
      <a-tag color="rgba(104,104,107,1)">清单</a-tag>
       
        <tool-tip>
          <a-tag slot="title" id="format" color="rgba(104,104,107,1)">格式</a-tag>
          <ul style="padding:0px;margin:0px" slot="content">
            <tool-tip-item><span @click="headerTitleOne" style="font-size:18px;font-weight:900">标题</span></tool-tip-item>
            <tool-tip-item><span style="font-size:15px;font-weight:700">小标题</span></tool-tip-item>
            <tool-tip-item><span style="font-size:13px;font-weight:500">正文</span></tool-tip-item>
            <tool-tip-item><span style="font-weight:500;font-family: Consolas,Monaco,monospace;">等宽</span></tool-tip-item>
            <tool-tip-item><span style="font-size:12px;font-weight:500;">• 项目符号列表</span></tool-tip-item>
            <tool-tip-item><span style="font-size:12px;font-weight:500;">— 短画线列表</span></tool-tip-item>
            <tool-tip-item><span style="font-size:12px;font-weight:500;">1. 编号列表</span></tool-tip-item>
          </ul>
        </tool-tip>
       
     </div>
     <div class="item">
        <a-tag color="rgba(104,104,107,1)">媒体</a-tag>
        <a-tag color="rgba(104,104,107,1)">联系人</a-tag>
        <a-tag color="rgba(104,104,107,1)">共享</a-tag>
        <search-input/>
     </div>
    </div>
</template>
<script>
import ToolTip from '../tools/tooltip';
import ToolTipItem from '../tools/tooltip/tooltip-item';
import SearchInput from '../tools/search';
import Bus from '../../common/js/bus';
export default {
  name: 'TopMenu',
  components: { ToolTip, ToolTipItem, SearchInput },
  data() {
    return {
      pl: this.Device.isWindows ? '10px' : '80px',
      searchText: '',
      formatClick: false,
      showFolder: false,
    };
  },
  methods: {
    onShowFolder() {
      this.showFolder = !this.showFolder;
      this.$emit('change', this.showFolder);
    },
    headerTitleOne() {
      Bus.$emit('headerTitleOne', 'h1');
    },

  },
  mounted() {

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
    div.item
      display flex
      flex-direction row 
      align-items center
</style>
<template>
   <div class="menu" :style="{paddingLeft:pl,paddingRight:'10px'}">
      
    <div class="item">
      <button :disabled="!showLeftSider" @click="onShowFolder"> <span :class="['icon','iconfont','menuItem',{'disabled':!showLeftSider}]">&#xe6b5;</span></button>
      <button @click="onLeftSider"><span style="font-size: 18px" class="icon iconfont">&#xe796;</span></button>
      <button @click="showAppendix" class="demo-icon icon-th-large-outline"/>
      <button @click="deletePost" :disabled="!showLeftSider"><span :class="['icon','iconfont','menuItem',{'disabled':!showLeftSider}]">&#xe790;</span></button>
      <button @click="addPost" :disabled="!showLeftSider"><span :class="['icon','iconfont','menuItem',{'disabled':!showLeftSider}]">&#xe78f;</span></button>
  
    </div>
    <!-- <div class="item">
      <button>锁定</button>
      <button>表格</button>
      <button @click="doList">清单</button>
       
        <tool-tip>
          <button slot="title" id="format" >格式</button>
          <ul style="padding:0px;margin:0px" slot="content">
            <tool-tip-item><span @click="headerTitleOne" class="tool-tip-item" style="font-size:18px;font-weight:900">标题</span></tool-tip-item>
            <tool-tip-item><span @click="headerTitleTwo" class="tool-tip-item" style="font-size:15px;font-weight:700">小标题</span></tool-tip-item>
            <tool-tip-item><span @click="normalText" class="tool-tip-item" style="font-size:13px;font-weight:500">正文</span></tool-tip-item>
            <tool-tip-item><span @click="avgWidth"class="tool-tip-item" style="font-weight:500;font-style:italic">斜体</span></tool-tip-item>
            <tool-tip-item><span @click="listBullet" class="tool-tip-item" style="font-size:12px;font-weight:500;">• 项目符号列表</span></tool-tip-item>
         
            <tool-tip-item><span @click="listOrdered" class="tool-tip-item" style="font-size:12px;font-weight:500;">1. 编号列表</span></tool-tip-item>
          </ul>
        </tool-tip>
       
     </div>-->
     <div class="item">
       <!-- <button>媒体</button>
        <button>联系人</button>
        <button>共享</button>-->
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
      pl: '10px', // this.Device.isWindows ? '10px' : '80px',
      showFolder: false,
      menuArr: [['文件', '附件', '删除']],
      showLeftSider: true,
    };
  },
  methods: {
    onShowFolder() {
      this.showFolder = !this.showFolder;
      this.$emit('change', this.showFolder);
    },
    onLeftSider() {
      this.showLeftSider = !this.showLeftSider;
      Bus.$emit('onLeftSider', this.showLeftSider);
      if (this.showFolder) {
        this.onShowFolder();
      }
    },
    addPost() {
      Bus.$emit('addPost');
    },
    deletePost() {
      Bus.$emit('deletePost');
    },
    showAppendix() {
      this.$Message.info('查看附件功能暂未开通');
    },

  },
  mounted() {

  },

};
</script>
<style lang="stylus" scoped>
  .search
   width 200px
  .tool-tip-item
    width 100%
    height 100%
    display flex
    justify-content flex-start
    align-items center
    padding-left 35px
  .menu
    background-color rgba(62,63,65,1)
    width 100%
    height 40px
    position fixed
   
    z-index 1
    display flex
    align-items center
    justify-content space-between
    -webkit-app-region drag
    div.item
      display flex
      flex-direction row 
      align-items center
      button
        display flex
        justify-content center
        align-items center
        background rgba(104,104,107,1)
        width 40px
        height 24px
        margin 3px
        border-radius 3px
        color #fff
        outline 0
        border 0px
        box-shadow 0 0 5px 2px rgba(0,0,0,0.1)
  .menuItem
    font-size 22px
    color rgba(234,235,235,1)
  .disabled
    color rgba(144,145,147,1)
</style>
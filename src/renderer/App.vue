<template>
   <div id="app"  ref="Wrapper">
    <a-layout :style="{width:'100%'}">
      
      <a-layout-header class="header">
        <top-menu  @change="onMenuEvent"/>
      </a-layout-header>
      
      <a-layout-content class="content">
        <a-layout :class="['innerWrapper',openDrawer?'show':'hide']">
          <a-layout-sider>
          123
          </a-layout-sider>
         
        </a-layout>
        <a-layout :class="['wrapper',openDrawer?'open':'close']">
          <a-layout-sider :width=siderWidth>
            <span class="presentation" @mousedown.prevent='dragStart'></span>
            <left-sider/>
            
          </a-layout-sider>
        
          <a-layout-content :style="{marginLeft:`${marginLeft}px`}">
            21212121111
          </a-layout-content>
         
        </a-layout>
       
      </a-layout-content>
    
    </a-layout>
 </div>
</template>

<script>
  import TopMenu from './components/menu/TopMenu';
  import LeftSider from './components/sider';
  import Drawer from './components/tools/Drawer';
  
  export default {
    name: 'bloggo',
    data() {
      return {
        siderWidth: 375,
        marginLeft: 375,
        eWidth: 0,
        openDrawer: false,
  
      };
    },
    components: { TopMenu, LeftSider, Drawer },
    methods: {
      /** 拖拽 */
      dragStart(e) {
        const drawerWidth = 200;
        const eWidth = this.openDrawer ? this.$refs.Wrapper.clientWidth - drawerWidth :
          this.$refs.Wrapper.clientWidth;
        const viewPagePercent = this.Device.isWindows ? 0.45 : 0.35;
        /* 当鼠标在拖动div按下时绑定鼠标移动事件 */
        document.onmousemove = (event) => {
          const clientX = this.openDrawer ? event.clientX - drawerWidth : event.clientX;
          const delterX = this.siderWidth - clientX;
          if (clientX < 241) {
            e.target.style.cursor = 'e-resize';
            return;
          } else if (clientX / eWidth > viewPagePercent && delterX < 0) {
            e.target.style.cursor = 'w-resize';
            return;
          }
          e.target.style.cursor = 'col-resize';
          this.eWidth = eWidth;
          this.siderWidth = clientX;
          this.marginLeft -= delterX;
        };
        document.onmouseup = () => {
          // 还原事件
          document.onmousemove = null;
          document.onmouseup = null;
        };
      },
      /** 抽屉效果 */
      onMenuEvent(show) {
        this.openDrawer = show;
      },
    },
  };
</script>

<style lang="stylus">
  
  body,
  html
    padding 0
    margin 0
    height 100%
    background rgba(30,31,33,1)
    font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  #app
    user-select none
    overflow hidden
  .header
      padding: 0
      -webkit-app-region drag
      background rgba(62,63,65,1)
      position fixed
      height 38px
      width 100%
      border-bottom .3px solid rgba(0,0,0,1)
  .content
    position fixed
    width 100%
    height 100%
    color #fff
    top 38px
    background rgba(30,31,33,1)
    .innerWrapper
      transition: all 0.5s;
      &.show
        opacity 1.0
      &.hide
        opacity 0.0
    .wrapper
      position absolute
      transition: all 0.5s;
      &.open
        left 200px
      &.close
        left 0px
    .ant-layout-sider
      background rgba(30,31,33,1)
      position fixed
      height 100%
      border-right:.3px solid rgba(0,0,0,1);
      box-shadow: -2px 0 8px rgba(0,0,0,.15);
    .presentation
      width 10px
      height 100%
      position absolute
      right 0px
      &:hover
        cursor col-resize
    .ant-layout-content
      width 100%
      position fixed
      height 100%
      background rgba(39,38,39,1)
     
</style>

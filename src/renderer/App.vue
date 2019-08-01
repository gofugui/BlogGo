<template>
   <div id="app"  ref="Wrapper">
    <a-layout :style="{width:'100%'}">
      
      <a-layout-header class="header">
        <top-menu  @change="onMenuEvent"/>
       
      </a-layout-header>
      
      <a-layout-content class="content">
        <a-layout :class="['innerWrapper',openDrawer?'show':'hide']">
          <a-layout-sider :width="innerSiderWidth">
            
            <span class="presentation" @mousedown.prevent='siderDragStart'></span>
            <drawer-sider />
          </a-layout-sider>
         
        </a-layout>
        <a-layout :class="['wrapper',openDrawer?'open':'close']" :style="{marginLeft:`${openDrawer?innerSiderWidth-200:0}px`}">
         
         
          <a-layout-content :style="{paddingLeft:`${marginLeft + 25}px`,width:`calc(100% - ${openDrawer? innerSiderWidth+'px':0+'px'})`}">
           
             <editor />
        
          </a-layout-content>
         <a-layout-sider :width="siderWidth">
            <span class="presentation" @mousedown.prevent='dragStart'></span>
            <left-sider/>
            
          </a-layout-sider>
        </a-layout>
       
      </a-layout-content>
    
    </a-layout>
 </div>
</template>

<script>

 import TopMenu from './components/menu/TopMenu';
 import LeftSider from './components/sider';
 import DrawerSider from './components/sider/DrawerSider';
 import Drawer from './components/tools/Drawer';
 import Editor from './pages/editor';
 const minSiderWidth = 241;
 export default {
   name: 'bloggo',
   data() {
     return {
       siderWidth: 375,
       marginLeft: 375,
       eWidth: 0,
       openDrawer: false,
       innerSiderWidth: 200,
 
     };
   },
   components: {
     TopMenu, LeftSider, Drawer, DrawerSider, Editor,
   },
   methods: {
     /** 侧边抽屉 */
     siderDragStart(e) {
       /* 当鼠标在拖动div按下时绑定鼠标移动事件 */
       document.onmousemove = (event) => {
         const delterX = this.innerSiderWidth - event.clientX;
         if (event.clientX > 300 && delterX < 0) {
           e.target.style.cursor = 'w-resize';
         } else if (event.clientX < 200) {
           e.target.style.cursor = 'e-resize';
         } else {
           e.target.style.cursor = 'col-resize';
           this.innerSiderWidth = event.clientX;
         }
       };
       document.onmouseup = () => {
         // 还原事件
         document.onmousemove = null;
         document.onmouseup = null;
       };
     },
     /** 拖拽 */
     dragStart(e) {
       const drawerWidth = this.innerSiderWidth;
       const eWidth = this.openDrawer ? this.$refs.Wrapper.clientWidth - drawerWidth :
         this.$refs.Wrapper.clientWidth;
       const viewPagePercent = 0.45;
 
       /* 当鼠标在拖动div按下时绑定鼠标移动事件 */
       document.onmousemove = (event) => {
         const clientX = this.openDrawer ? event.clientX - drawerWidth : event.clientX;
         const delterX = this.siderWidth - clientX;
         if (clientX < minSiderWidth) {
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

<style lang="stylus" scoped>
  ::-webkit-scrollbar
        width 15px
     
  ::-webkit-scrollbar-thumb
      border-radius 10px
      -webkit-box-shadow inset 0 0 8px rgba(0,0,0,0.2)
      background #535353 
    
  ::-webkit-scrollbar-track
      -webkit-box-shadow inset 0 0 8px rgba(0,0,0,0.3)
      border-radius 10px
      background-color rgba(85,85,93,.5)
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
      z-index 9999
  .content
    position fixed
    width 100%
    height 100%
    color #fff
    top 38px
    background rgba(30,31,33,1)
    .innerWrapper
      transition: all 0.5s;
      position absolute
      .ant-layout-sider
        background: linear-gradient(to bottom right, rgba(45,45,49,.6) , rgba(46,49,58,.6));
      &.show
        z-index 1
        opacity 1.0
      &.hide
       
        opacity 0.0
    .wrapper
     
      position absolute
      width 100%
      transition: all 0.5s;
      &.open
        left 200px
      &.close
        left 0px
    .ant-layout-sider
      background rgba(30,31,33,1)
      position fixed
      height 100%
      padding-bottom 40px
      border-right .3px solid rgba(0,0,0,1)
      box-shadow: -2px 0 8px rgba(0,0,0,.15)
  
    .presentation
      width 3px
      height 100%
      position absolute
      right 0px
      &:hover
        cursor col-resize
    .ant-layout-content
      position fixed
      height calc(100% - 40px)
      background rgba(39,38,39,1)
      padding-left 25px
      padding-right 25px
      padding-bottom 25px
      transition all 0.5s
      overflow-y hidden
      &:hover
        overflow-y overlay
      div.editor-container
        width 100%
        height 100%
        outline 0
        color #fff
  
</style>

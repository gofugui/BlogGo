<template>
   <div id="app" ref="Wrapper">
    <a-layout>
      
      <a-layout-header class="header">
            <top-menu/>
      </a-layout-header>
      <a-layout-content  class="content">
       
        <a-layout>
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
  export default {
    name: 'bloggo',
    data() {
      return {
        siderWidth: 375,
        marginLeft: 375,
        eWidth: 0,
      };
    },
    components: { TopMenu, LeftSider },
    methods: {
      /** 拖拽 */
      dragStart(e) {
        const that = this;// 保存this到that
        const eWidth = that.$refs.Wrapper.clientWidth;
  
        /* 当鼠标在拖动div按下时绑定鼠标移动事件 */
        document.onmousemove = function (event) {
          const delterX = that.siderWidth - event.clientX;
          if (event.clientX < 241) {
            e.target.style.cursor = 'e-resize';
            return;
          } else if (event.clientX / eWidth > 0.35 && delterX < 0) {
            e.target.style.cursor = 'w-resize';
            return;
          }
          e.target.style.cursor = 'col-resize';
          that.eWidth = eWidth;
          that.siderWidth = event.clientX;
          that.marginLeft -= delterX;
        };
        document.onmouseup = function () {
          // 还原事件
          document.onmousemove = null;
          document.onmouseup = null;
        };
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
    font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  #app
    user-select none
    overflow hidden
  .header
      padding: 0
      -webkit-app-region drag
      background rgba(62,63,65,1)
      position fixed
      z-index 1
      height 38px
      width 100%
      border-bottom .3px solid rgba(0,0,0,1)
  .content
    width 100%
    height 100vh
    color #fff
    margin-top 35px
    background rgba(30,31,33,1)
    .ant-layout-sider
      background rgba(30,31,33,1)
      position fixed
      height 100%
      border-right:.3px solid rgba(0,0,0,1);
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

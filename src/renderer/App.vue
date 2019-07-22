<template>
   <div id="app">
    <a-layout>
      
      <a-layout-header class="header">
            <top-menu/>
      </a-layout-header>
      <a-layout-content class="content">
       
        <a-layout>
          <a-layout-sider width='375'>
            <left-sider/>
          </a-layout-sider>
        
          <a-layout-content>
     
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
    components: { TopMenu, LeftSider },
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
    color #fff
    margin-top 35px
    .ant-layout-sider
      background rgba(30,31,33,1)
      position fixed
      height 100%
      border-right:.3px solid rgba(0,0,0,1);
    .ant-layout-content
      width 100%
      margin-left 375px
      position fixed
      height 100%
      background rgba(39,38,39,1)
  .el-button-group
    width 100%
    .el-button
      width 50%
</style>

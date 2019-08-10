<template>
    <div id="app">
        <context-menu/>
       
        <router-layout/>
    </div>
</template>
<script>

import ContextMenu from './components/menu/ContextMenu';

import RouterLayout from './layouts/RouterLayout';
export default {

  components: {
    ContextMenu, RouterLayout,
  },

};
</script>
<style lang="stylus">
    ::-webkit-scrollbar
        width 10px
     
    ::-webkit-scrollbar-thumb
        border-radius 10px
        -webkit-box-shadow inset 0 0 8px rgba(0,0,0,0.2)
        background #535353 
    
    ::-webkit-scrollbar-track
        -webkit-box-shadow inset 0 0 8px rgba(0,0,0,0.3)
        border-radius 10px
        background-color rgba(85,85,93,.5)
    #app
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-size: 14px;
        line-height: 1.5em;
        background-color rgba(62,63,65,1)
        color #fff
        width 100vw
        height 100vh
        padding 0
        margin 0
        overflow hidden
</style>
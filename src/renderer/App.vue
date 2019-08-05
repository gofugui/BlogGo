<template>
    <div id="app">
       <context-menu/>
       <top-menu @change="onMenuEvent"/>
        <split-pane style="top:40px" paneLColor='rgba(46,49,58,.6)' :min-percent='15' :showResize='false' :default-percent='innerDrawerPercent' :max-percent='innerDrawerPercent' split="vertical">
            <template slot="paneL">
                <drawer-sider/>
            </template>
            <template slot="paneR">
                <split-pane :min-percent='20' :default-percent='28' :max-percent='28' split="vertical">
                    <template slot="paneL">
                        <left-sider/>
                    </template>
                    <template slot="paneR">
                        <editor />
                    </template>
                </split-pane>
            </template>
        </split-pane>
        
    </div>
</template>
<script>
import SplitPane from './components/split-pane';
import TopMenu from './components/menu/TopMenu';
import ContextMenu from './components/menu/ContextMenu';
import LeftSider from './components/sider';
import DrawerSider from './components/sider/DrawerSider';
import Editor from './pages/editor';
export default {
  data() {
    return {
      innerDrawerPercent: 0,
    };
  },
  components: {
    SplitPane, TopMenu, LeftSider, DrawerSider, Editor, ContextMenu,
  },
  methods: {
    onMenuEvent(show) {
      this.innerDrawerPercent = show ? 17 : 0;
    },
  },
};
</script>
<style lang="stylus">
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
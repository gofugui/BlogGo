<template>

<div id="app">
        <top-menu @change="onMenuEvent"/>
        <split-pane style="top:40px;height:calc(100% - 40px)" paneLColor='rgba(46,49,58,.6)' :min-percent='15' 
        :showResize='false' :default-percent='innerDrawerPercent' 
        :max-percent='innerDrawerPercent' split="vertical">
            <template slot="paneL">
                <drawer-sider/>
            </template>
            <template slot="paneR">
               <slot></slot>
            </template>
        </split-pane>
</div>
   
</template>
<script>

import GlobalFooter from './GlobalFooter';
import TopMenu from '../components/menu/TopMenu';
import DrawerSider from '../components/sider/DrawerSider';
import SplitPane from '../components/split-pane';
export default {
  name: 'GobalLayout',
  components: {
    GlobalFooter, TopMenu, DrawerSider, SplitPane,
  },
  data() {
    return {
      innerDrawerPercent: 0,
    };
  },
  created() {
    this.$store.dispatch('app/unlockPosts', false);
  },
  methods: {
    onMenuEvent(show) {
      this.innerDrawerPercent = show ? 17 : 0;
    },
  },
};
</script>
<style lang="stylus" scoped>
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
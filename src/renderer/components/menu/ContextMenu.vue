
<template>
    <div id="contextMenu" @click="hideMenu" tabindex='2' @blur='hideMenu' :class="['contextMenu',showMenu ? 'open' : 'close']" :style="{left:`${positionX}px`,top:`${positionY}px`}">
       
       <ul v-for="items in menu" v-if="items[0].label">
          <li v-for="item in items" v-if="item.submenu">
            <div class="submenu">
              <span>{{item.label}}
              <ul class="sublist">
                <li v-if="subitem.label" @click="subitem.onPress" v-for="subitem in item.submenu">{{subitem.label}}</li>
                <div v-else class="divider"></div>
              </ul>
              </span><span>></span>
            </div>   
          </li>
          <li v-else :class="{disable:isDisable(item.disable) }" @click="item.onPress">{{item.label}}</li>
       </ul>
       <div v-else class="divider"></div>
       
    </div>
 
</template>
<script>
import bus from '../../common/js/bus';
const { remote } = require('electron');
const win = remote.getCurrentWindow();
export default {
  name: 'ContextMenu',
  data() {
    return {
      showMenu: false,
      positionX: 0,
      positionY: 0,
      menu: [],
      unEditorAble: [],
      currentSelect: '',
    };
  },
  // props: {
  //   unEditorAble: {
  //     type: Array,
  //     require: false,
  //     default: null,
  //   },
  //   currentSelect: {
  //     type: String,
  //     require: false,
  //     default: '',
  //   },
  // },
  computed: {
    show() {
      return this.menu.length;
    },
  },
  methods: {
    isDisable(disable) {
      if (!disable) { return false; }
      if (this.currentSelect === -1) return true;
      if (this.unEditorAble) {
        const index = this.unEditorAble.findIndex(item => this.currentSelect === item);
        if (index > -1) {
          return true;
        }
      }
      return false;
    },
    hideMenu() {
      this.showMenu = false;
    },
  },
  watch: {
    show(value) {
      if (!value) { this.showMenu = false; }
    },
  },
  updated() {
    document.getElementById('contextMenu').focus();
  },
  mounted() {
    bus.$on('show', (e) => {
      const { menu, unEditorAble, currentSelect } = e;
      this.menu = menu;
      this.unEditorAble = unEditorAble;
      this.currentSelect = currentSelect;
    });
    document.addEventListener('contextmenu', (e) => {
      win.focus();
      if (this.show) {
        this.showMenu = true;
        const { x, y } = e;
        // fix:修复菜单在底部被隐藏的错误
        const dHeight = document.body.clientHeight;
        const menuHeight = this.menu.reduce((total, value) => {
          total += value.length; return total;
        }, 0) * 25;
        this.positionX = x + 20;
        this.positionY = ((dHeight - y) < menuHeight ?
          dHeight - menuHeight : y);
      }
      // const time = this.showMenu ? 10 : 0;
      // const timer = setTimeout(() => {
      //   clearTimeout(timer);
      // }, time);
      e.target.click();
    });
  },
};
</script>
<style lang="stylus" scoped>
    .contextMenu
        outline 0
        position fixed
        padding 5px 0px
        width 160px
        border 1px solid rgba(83,82,84,1)
        border-radius 5px
        background rgba(52,50,55,1)
        box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
        transition 0.1s all
        z-index 999
        ul
            padding 0px
            margin 0px
            list-style none
            transition 0.5s all
            li
              height 25px 
              display flex
              padding-left 20px
              justify-content flex-start 
              align-items center
              &:hover
                cursor pointer
                background rgba(41,103,203,1)
           
                
            li.disable 
                pointer-events none
                cursor default
                background rgba(52,50,55,.5)
                color rgba(121,118,123,1)
        &.open  
            display inline-block
           
        &.close
            display none
    .mask
      position fixed
    
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.0)
      transition all 0.5s
      &.open
        display inline-block
      &.close
        display none
    .submenu
      width 100%
      height 100%
      display flex
      justify-content space-between
      align-items center
      transition 0.5s all
      .sublist
        display none
      &:hover
        ul.sublist
          display inline-block
          overflow-y scroll
          position absolute
          margin-top -29px
          left 158px
          max-height 200px
          padding 5px 0px
          width 160px
          border 1px solid rgba(83,82,84,1)
          border-radius 5px
          background rgba(52,50,55,1)
          box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
        
    .divider
    
        height 2px
        margin 5px 0px
        background rgba(88,86,91,1)
</style>
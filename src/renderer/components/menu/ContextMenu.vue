<template>
<div>
    <!--<div :class="['mask', showMenu ? 'open' : 'close']" @click="hideMenu"></div>-->
    <div :class="['contextMenu',showMenu?'open':'close']" :style="{left:`${positionX}px`,top:`${positionY}px`}">
       
       <ul v-for="items in menu" v-if="items[0].label">
          <li v-for="item in items" v-if="item.submenu">
            <div class="submenu">
              <span>{{item.label}}</span><span>></span>
              <ul class="sublist" v-for="subitems in item.submenu"  v-if="subitems[0].label">
                <li @click="item.onPress" v-for="subitem in subitems">{{subitem.label}}</li>
              </ul>
              <div v-else class="divider"></div>
            </div>
            
          </li>
          <li :class="{disable:isDisable(item.disable) }" @click="item.onPress" v-else>{{item.label}}</li>
       </ul>
       <div v-else class="divider"></div>
       
    </div>
  </div>
</template>
<script>
// const { remote } = require('electron');
// const win = remote.getCurrentWindow();
export default {
  name: 'ContextMenu',
  data() {
    return {
      showMenu: false,
      positionX: 0,
      positionY: 0,
    };
  },
  props: {
    menu: {
      type: Array,
      required: true,
      default: [],
    },
    show: {
      type: Boolean,
      require: false,
      default: false,
    },
    unEditorAble: {
      type: Array,
      require: false,
      default: null,
    },
    currentSelect: {
      type: String,
      require: false,
      default: '',
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
  mounted() {
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
    document.addEventListener('contextmenu', (e) => {
      e.target.click();

      const time = this.showMenu ? 100 : 0;
      const timer = setTimeout(() => {
        if (this.show) {
          this.showMenu = true;
          const { x, y } = e;
          this.positionX = x;
          this.positionY = y;
        }
        clearTimeout(timer);
      }, time);
    });
  },
};
</script>
<style lang="stylus" scoped>
    .contextMenu
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
          position absolute
          left 158px
          
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
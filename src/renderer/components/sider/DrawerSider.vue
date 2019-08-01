<template>
    <div class="drawer" @contextmenu.prevent="onContextmenu">
        <context-menu :menu="menu" :showMenu="showMenu" :positionX="positionX" :positionY="positionY"/>
        <ul class="list">
            <li @click.prevent="handleClick(index)" v-bind:class="{defaultStyle:sel === -1 && index === 0,select:sel===index,unfocus:sel === index&&(!isFocus|| !isActive)}" v-for="(item,index) in arr" :key="index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
// TODO: 获取当前打开的文件夹，如果没有选择备忘录作为默认，并且设置背景色
import ContextMenu from '../tools/contextMenu';
const electron = require('electron');
const { remote } = electron;
const win = remote.getCurrentWindow();
export default {
  name: 'DrawerSider',
  data() {
    return {
      arr: ['备忘录', 'test', '最近删除'],
      menu: [[{ label: '给文件夹重新命名...' }, { label: '删除文件夹...' }], [{
        type: 'separator',
      }], [{ label: '新建文件夹...' }]],
      sel: -1,
      isFocus: false,
      showMenu: false,
      positionX: 0,
      positionY: 0,
    };
  },
  components: { ContextMenu },
  methods: {
    handleClick(index) {
      this.isFocus = true;
      this.sel = index;
    },
    onContextmenu(e) {
      win.focus();
      e.target.click();
      this.showMenu = !this.showMenu;
      const { x, y } = e;
      this.positionX = x;
      this.positionY = y;
    },


  },
  mounted() {
    document.addEventListener('click', (e) => {
      const { className } = e.target;

      if (className === 'editorContent' || className === 'leftSider' || className === 'itemContent') {
        this.isFocus = false;
      } else if (className === 'drawer') {
        this.isFocus = true;
      }
    });
    win.on('blur', () => {
      this.showMenu = false;
    });
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
    // win.on('blur', () => {
    //   this.showMenu = false;
    // });

    // const context = require('../../../tools/menu');
    // context.use((ctx, next) => {
    //   if (/drawer/.test(ctx.elm.className) || /LI/.test(ctx.elm.tagName)) {
    //     ctx.elm.click();
    //     ctx.menu.push(...this.menu);
    //     next();
    //   }
    // });
    // context.activate();
  },
  computed: {
    isActive: vm => vm.$store.state.app.isActive,

  },
};
</script>
<style lang="stylus" scoped>
    .drawer
        padding 20px 0px 20px 0px
        height 100%
    .list
        list-style none
        li
            cursor pointer
            padding 5px 20px 
    .defaultStyle
        background rgba(77,77,83,1)
    .select
        background rgba(41,103,203,1)
    .unfocus
        background rgba(77,77,83,1)
</style>
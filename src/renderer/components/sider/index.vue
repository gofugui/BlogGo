<template>

  <div class="leftSider" @contextmenu.prevent="onContextmenu">
      <context-menu :menu="menu" :showMenu="showMenu" :positionX="positionX" :positionY="positionY"/>
      <div class="item" @click.prevent='onItemClick(index)' v-bind:class="{defaultStyle:isSel===-1&&index === 0,select:isSel === index,unfocus:isSel === index&&(!isFocus || !isActive)}" v-for="(item,index) in arr" :key="index">
       
        <div class="itemContent">
          {{item}}
        </div>
    </div>
  </div>
     
     
  
</template>
<script>
import ContextMenu from '../tools/contextMenu';
const electron = require('electron');
const { remote } = electron;
const win = remote.getCurrentWindow();
export default {
  components: { ContextMenu },
  data() {
    return {
      arr: ['123', '234', '345', '2323', '2323', 'erere',
      ],
      isSel: -1,
      isFocus: false,
      menu: [],
      showMenu: false,
      positionX: 0,
      positionY: 0,
    };
  },
  methods: {
    onItemClick(index) {
      this.isFocus = true;
      this.isSel = index;
    },
    onContextmenu(e) {
      win.focus();
      e.target.click();
      const { className } = e.target;

      if (className !== 'leftSider') {
        this.menu = [[{ label: '删除' }], [{ type: 'separator' }], [{ label: '置顶备忘录...' }, { label: '锁定备忘录...' }], [{ type: 'separator' }], [{ label: '移到', submenu: [[{ label: 'test' }]] }], [{ type: 'separator' }], [{ label: '新建备忘录' }]];
      } else {
        this.menu = [[{ label: '删除' }], [{ type: 'separator' }], [{ label: '移到', submenu: [[{ label: 'test' }]] }], [{ type: 'separator' }], [{ label: '新建备忘录' }]];
      }
      this.showMenu = !this.showMenu;
      const { x, y } = e;
      this.positionX = x;
      this.positionY = y;
    },
  },
  mounted() {
    document.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className === 'editorContent' || className === 'drawer') {
        this.isFocus = false;
      }
    });
    win.on('blur', () => {
      this.showMenu = false;
    });
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
  },
  computed: {
    isActive: vm => vm.$store.state.app.isActive,
  },
};
</script>
<style lang="stylus" scoped>
    
    .leftSider
      overflow-y hidden
      transition 0.5s all
      height 100%
      
      &:hover
        overflow-y overlay
    .defaultStyle
      background rgba(52,53,55,1)
    .select
      background rgba(194,150,60,1)
      div.itemContent
        border-bottom: 0px
    .unfocus
      background rgba(52,53,55,1)
    .item
      
      width 100%
      height 58px
      padding-left 20px
      padding-top 10px
      .itemContent
        width 100%
        height 100%
        border-bottom:.05px solid rgba(52,53,55,1);
        padding-bottom 10px
</style>
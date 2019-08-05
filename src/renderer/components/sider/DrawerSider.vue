<template>
    <div @blur="divOnBlur"  @focus="divOnFocus" tabindex="0" class="drawer">
        <context-menu :menu="menu" :show="show" :unEditorAble="unEditorAble" :currentSelect="currentSelect()"/>
        <ul class="drawerlist">
            <li @click.prevent="handleClick(index)" v-bind:class="{defaultStyle:sel === -1 && index === 0,select:sel===index,unfocus:sel === index&&(!isFocus)}" v-for="(item,index) in tagList" :key="index">
              <input id="floderName" @keyup.enter="onblur" @focus="onfocus(index)" @blur="onblur" v-if="item.name === currentEditorName" :value="item.name"/>
              <span v-else>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
// TODO: 获取当前打开的文件夹，如果没有选择备忘录作为默认，并且设置背景色
import ContextMenu from '../menu/ContextMenu';
export default {
  name: 'DrawerSider',
  data() {
    return {

      menu: [
        [{ label: '给文件夹重新命名...', disable: true, onPress: this.reNameFolder },
          { label: '删除文件夹...', disable: true, onPress: this.deleteFolder }],
        [{
          type: 'separator',
        }], [{ label: '新建文件夹...', onPress: this.addFolder }]],
      sel: -1,
      currentEditorName: '',
      unEditorAble: ['备忘录', '最近删除'],

      isFocus: false,
      show: false,
    };
  },
  components: { ContextMenu },
  computed: {
    tagList() {
      return this.$store.state.app.tags;
    },
  },
  methods: {
    divOnFocus() {
      this.isFocus = true;
      this.show = true;
    },
    divOnBlur() {
      this.isFocus = false;
      this.show = false;
    },
    onblur(e) {
      const newName = e.target.value.trim();
      const index = this.tagList.findIndex(item => item.name === newName);

      if (index > -1 && index !== this.sel) {
        this.$Message.info('名称已采用，请选择一个不同的名称');
        return;
      }
      const value = this.tagList.find((item, index) => this.sel === index);
      this.$store.commit('app/renameTags', { ...value, name: newName });
      const curIndex = this.tagList.findIndex(item => item.name === newName);
      this.currentEditorName = '';
      this.sel = curIndex;
    },
    onfocus(index) {
      this.sel = index;
    },

    handleClick(index) {
      this.sel = index;
    },
    addFolder() {
      // 获取当前文件序号
      const arr = [];
      this.tagList.forEach((item) => {
        const { name } = item;
        if (name.match(/新建文件夹\s\d+/)) {
          const num = name.match(/\d+/)[0];
          if (num) {
          // eslint-disable-next-line radix
            const index = parseInt(num) - 1;
            arr[index] = 1;
          }
        }
      });
      // 查找中间空缺序号
      const index = arr.findIndex(item => !item);
      const lastIndex = index === -1 ? arr.length + 1 : index + 1;
      const name = `新建文件夹 ${lastIndex}`;
      this.currentEditorName = name;
      this.$store.commit('app/addTags', { name });
    },
    deleteFolder() {
      const value = this.tagList.find((item, index) => this.sel === index);
      const index = this.tagList.findIndex((item, index) => this.sel === index);
      const { id } = value;

      this.$store.commit('app/deleteTags', id);
      this.sel = index - 1;
    },
    reNameFolder() {
      const value = this.tagList.find((item, index) => this.sel === index);
      // const index = this.$store.state.app.tags.findIndex((item, index) => this.sel === index);
      const { name } = value;
      this.currentEditorName = name;
    },
    currentSelect() {
      const value = this.tagList.find((item, index) => this.sel === index);
      if (value) {
        return value.name;
      }
      return null;
    },
  },
  updated() {
    const floderName = document.getElementById('floderName');
    if (floderName) {
      floderName.select();
    }
  },

};
</script>
<style lang="stylus" scoped>
    .drawer
        font bold 14px/20px arial,sans-serif;
        padding 20px 0px 20px 0px
        height 100%
        position relative
        width 100%
        min-width 200px
        outline 0
    .drawerlist
        list-style none
        li
            cursor pointer
            padding 5px 20px 
            input
              width 100%
              color #fff
              background-color rgba(30,30,30,1)
              transition 0.5s all
              outline-color rgba(67,112,153,1)
              border 0
              border-radius 5px
    .defaultStyle
        background rgba(77,77,83,1)
    .select
        background rgba(41,103,203,1)
    .unfocus
        background rgba(77,77,83,1)
</style>
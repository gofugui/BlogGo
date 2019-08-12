<template>
    <div @blur="divOnBlur"  @focus="divOnFocus" tabindex="0" class="drawer">
        <Modal
        v-model="modal1"
        :title="`您确定要删除“${delFolderName}”吗？`"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>所有备忘录和子文件夹都将被删除</p>
    </Modal>
        <ul class="drawerlist">
            <li @click.prevent="handleClick(index)" 
              v-bind:class="{defaultStyle:sel === -1 && index === 0,select:sel===index,unfocus:sel === index&&(!isFocus)}"
              v-for="(item,index) in tagList" :key="index">
              <input id="floderName" @keyup.enter="onblur" @focus="onfocus(index)" @blur="onblur" v-if="item.name === currentEditorName" :value="item.name"/>
              <div class="folderName" v-else>{{item.name}}</div>
              <Badge :count="item.count" :type="badgeType(item.count,item.name)"></Badge>
            </li>
        </ul>
    </div>
</template>
<script>
// TODO: 获取当前打开的文件夹，如果没有选择备忘录作为默认，并且设置背景色
import bus from '../../common/js/bus';
export default {
  name: 'DrawerSider',
  data() {
    return {
      sel: -1,
      currentEditorName: '',
      isFocus: false,
      modal1: false,
      delFolderName: '',
    };
  },
  computed: {
    currentFolderPosts() {
      return this.$store.getters['app/currentFolderPosts'];
    },
    tagList() {
      return this.$store.getters['app/folderList'];
    },
    defaultSelectIndex() {
      return this.$store.getters['app/currentSelectFolder'];
    },
    currentSelect() {
      const value = this.tagList.find((item, index) => this.sel === index);
      if (value) {
        return value.name;
      }
      return null;
    },
  },
  methods: {
    emitMenu() {
      bus.$emit('show', {
        menu: [
          [{ label: '给文件夹重新命名...', disable: true, onPress: this.reNameFolder },
            { label: '删除文件夹...', disable: true, onPress: this.deleteFolder }],
          [{
            type: 'separator',
          }], [{ label: '新建文件夹...', onPress: this.addFolder }]],
        unEditorAble: ['备忘录', '最近删除'],
        currentSelect: this.currentSelect,
      });
    },
    divOnFocus() {
      this.isFocus = true;

      this.emitMenu();
    },
    divOnBlur() {
      this.isFocus = false;
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
    // 选取当前的选择项
    handleClick(value) {
      this.sel = value;
      const item = this.tagList.find((item, index) => this.sel === index);
      const { id } = item;
      this.$store.commit('app/currentSelectFolder', id);
      bus.$emit('clearSearchText');
      this.emitMenu();
    },
    // 添加备忘录
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
    ok() {
      const value = this.tagList.find((item, index) => this.sel === index);
      const index = this.tagList.findIndex((item, index) => this.sel === index);
      const { id } = value;
      this.sel = index - 1;
      this.$store.commit('app/deleteTags', id);
    },
    cancel() {

    },
    deleteFolder() {
      // 如果当前的文件夹下面没有文章，立即删除
      if (!this.currentFolderPosts.length) {
        this.ok();
        return;
      }
      const value = this.tagList.find((item, index) => this.sel === index);
      const { name } = value;
      this.delFolderName = name;
      this.modal1 = true;
    },
    reNameFolder() {
      const value = this.tagList.find((item, index) => this.sel === index);
      // const index = this.$store.state.app.tags.findIndex((item, index) => this.sel === index);
      const { name } = value;
      this.currentEditorName = name;
    },
    badgeType(count, name) {
      if (name === '最近删除') {
        return 'error';
      }
      switch (count) {
        case count < 10:
          return 'info';
        case count < 50:
          return 'normal';
        case count < 100:
          return 'success';
        default:
          return 'primary';
      }
    },
  },
  updated() {
    const floderName = document.getElementById('floderName');
    if (floderName) {
      floderName.select();
    }
  },
  mounted() {
    this.sel = this.defaultSelectIndex;
  },

};
</script>
<style lang="stylus" scoped>
    .drawer
        font bold 14px/20px arial,sans-serif;
        padding 20px 0px 20px 0px
        height 100%
        width 100%
        position absolute
        outline 0
        overflow hidden
        
        &:hover
         overflow overlay
    .drawerlist
        list-style none
        li
            cursor pointer
            padding 5px 20px 
            display flex
            justify-content space-between
            input
              width 100%
              color #fff
              background-color rgba(30,30,30,1)
              transition 0.5s all
              outline-color rgba(67,112,153,1)
              border 0
              border-radius 5px
            .folderName
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
    .defaultStyle
        background rgba(77,77,83,1)
    .select
        background rgba(41,103,203,1)
    .unfocus
        background rgba(77,77,83,1)
</style>
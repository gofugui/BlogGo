<template>

  <div @blur="divOnBlur" @focus="divOnFocus" tabindex="1" class="leftSider">
     
    
      <div class="item" @click.prevent='onItemClick(index)' v-bind:class="{defaultStyle:isSel===-1&&index === 0,
      select:isSel === index,unfocus:isSel === index&&(!isFocus)}" v-for="(item,index) in arr" :key="index">
       
        <div class="itemContent">
          {{item}}
        </div>
    </div>
  </div>
     
     
  
</template>
<script>
import bus from '../../common/js/bus';
export default {

  data() {
    return {
      arr: ['123', '234', '345', '2323', '2323', 'erere', '123', '234', '345', '2323', '2323', 'erere', '123', '234', '345', '2323', '2323', 'erere',
      ],
      isSel: -1,
      isFocus: false,
      show: false,

    };
  },
  methods: {
    emitMenu() {
      bus.$emit('show', {
        menu: [
          [{ label: '删除', onPress: () => null }],
          [{ type: 'separator' }],
          [{ label: '置顶备忘录', onPress: () => null },
            { label: '锁定备忘录', onPress: () => null }],
          [{
            type: 'separator',
          }],
          [{ label: '移到', onPress: () => null }],
          [{
            type: 'separator',
          }],
          [{ label: '新建备忘录', onPress: () => null }],
        ],
      });
    },
    onItemClick(index) {
      this.isSel = index;
      this.emitMenu();
    },
    divOnFocus() {
      this.isFocus = true;
      this.show = true;
      this.emitMenu();
    },
    divOnBlur() {
      this.isFocus = false;
      this.show = false;
    },
  },
  mounted() {

  },
  computed: {
    isActive: vm => vm.$store.state.app.isActive,
  },
};
</script>
<style lang="stylus" scoped>
    .leftSider
      font  bold 14px/20px arial,sans-serif;
      outline 0
      height 100%
      width 100%
      &:hover
        overflow overlay
      
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
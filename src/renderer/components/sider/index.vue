<template>

  <div class="leftSider">
      <div class="item" @click.prevent='onItemClick(index)' v-bind:class="{select:isSel === index}" v-for="(item,index) in arr" :key="index">
       
        <div class="itemContent">
          {{item}}
        </div>
    </div>
  </div>
     
     
  
</template>
<script>
export default {
  data() {
    return {
      arr: ['123', '234', '345', '2323', '2323', 'erere',
        '123', '234', '345', '2323', '2323', 'erere',
        '123', '234', '345', '2323', '2323', 'erere',
        '123', '234', '345', '2323', '2323', 'erere',
      ],
      isSel: -1,
    };
  },
  methods: {
    onItemClick(index) {
      this.isSel = index;
    },
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

    .select
      background rgba(194,150,60,1)
      div.itemContent
        border-bottom: 0px
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
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
      arr: ['123', '234', '345', '2323', '2323', 'erere'],
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
    ::-webkit-scrollbar
        width 10px
    ::-webkit-scrollbar-thumb
        border-radius 10px
        -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
        background #535353 
    .leftSider
      overflow-y auto
      height 100%
      margin-right 2px

    .select
      background rgba(194,150,60,1)
      div.itemContent
        border-bottom: 0px
    .item
      width 100%
      height 58px
      padding-left 20px
      padding-top 10px
      padding-right 0.5px
      .itemContent
        width 100%
        height 100%
        border-bottom:.05px solid rgba(52,53,55,1);
        padding-bottom 10px
       

     
     
  
     
</style>
<template>
  <div>
      <div class="item">
       
        <div class="itemContent">
          123
        </div>
      </div>
       <div class="item">
       
        <div class="itemContent">
          456
        </div>
      </div>
     
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ['123', '234', '345'],
    };
  },
};
</script>
<style lang="stylus" scoped>
 //background rgba(195,151,61,1)
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
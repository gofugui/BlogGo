<template>
    <div>
        <input class="input" type="text" placeholder="搜索"  />
    </div>
</template>
<script>
export default {
  name: 'SearchInput',
};
</script>
<style lang="stylus" scoped>
    ::-webkit-input-placeholder
        color rgba(143,143,144,1)
    div
      width 214px
    .input
        width 210px
        height 24.5px
        background-color rgba(105,106,109,1)
        outline-color rgba(67,112,153,1)
        border 0px
        color #fff
        border-radius 5px
        box-shadow 0 0 5px 2px rgba(0,0,0,0.1)
        padding: 0 10px 0 25px
</style>
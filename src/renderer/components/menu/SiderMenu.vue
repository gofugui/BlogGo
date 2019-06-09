<template>
    <a-layout-sider width="80px" class="sider">
        <a-icon type="up-square" class="icon"/>
    </a-layout-sider>
</template>

<script>
export default {
  name: 'SiderMenu',
};
</script>
<style lang="stylus" scoped>
    .sider
     text-align: center
     
    .icon
      margin-top: 1.25rem
      color #949494
      font-size 40px
      &:hover
        color #ffffff
</style>
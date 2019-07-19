<template>
    <a-layout-sider width="80px" class="sider">
        <router-link :to="{name:'editor'}"><a-icon type="form" class="icon"/></router-link>
        <router-link :to="{name:'upload'}"><a-icon type="cloud-upload" class="icon"/></router-link>
    </a-layout-sider>
</template>

<script>
export default {
  name: 'SiderMenu',
  methods: {
    edit() {
      this.$router.push({
        path: '/dashboard/editor',
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
    .sider
     overflow: auto
     text-align: center
     background-color: rgba(57,58,61,255)
     position: fixed
     height: 100vh
     
    .icon
      margin-top: 1.25rem
      color: #949494
      font-size: 40px
      &:hover
        color: #ffffff
</style>
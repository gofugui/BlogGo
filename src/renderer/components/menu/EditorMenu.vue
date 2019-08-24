<template>
    <div>
        <div class="item"><span slot="label"><a-icon type="edit"/> &nbsp;编辑</span></div>
        <div class="item"><span slot="label"><a-icon type="cloud-upload"/> &nbsp;发布</span></div>
        <div class="item"><span slot="label"><a-icon type="delete"/> &nbsp;删除</span></div>
    </div>
</template>
<script>

export default {
  name: 'EditorMenu',
};
</script>
<style lang="stylus" scoped>
    .item
        width 100px
        padding 5px
        cursor pointer
        :hover
            color #000
            font-weight blod
        
</style>
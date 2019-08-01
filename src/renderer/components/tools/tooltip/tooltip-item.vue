<template>
    <li class="item"><slot></slot></li>
</template>
<style lang="stylus" scoped>
    .item
        color #fff
        list-style none
        display flex
        padding-left 35px
        justify-content flex-start 
        align-items center
        height 30px 
        &:hover
            cursor pointer
            background rgba(41,103,203,1)
</style>
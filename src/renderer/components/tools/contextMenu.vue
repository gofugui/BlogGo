<template>
    <div :class="['contextMenu',showMenu?'open':'close']" :style="{left:`${positionX}px`,top:`${positionY}px`}">
       
       <ul v-for="items in menu" v-if="items[0].label">
          <li v-for="item in items" v-if="item.submenu">
            <div class="submenu">
              <span>{{item.label}}</span><span>></span>
              <ul class="sublist" v-for="subitems in item.submenu"  v-if="subitems[0].label">
                <li v-for="subitem in subitems">{{subitem.label}}</li>
              </ul>
              <div v-else class="divider"></div>
            </div>
            
          </li>
          <li v-else>{{item.label}}</li>
       </ul>
       <div v-else class="divider"></div>
       
    </div>
</template>
<script>

export default {
  name: 'ContextMenu',
  data() {
    return {


    };
  },
  props: {
    menu: {
      type: Array,
      required: true,
      default: [],
    },
    showMenu: {
      type: Boolean,
      require: false,
      default: false,
    },
    positionX: {
      type: Number,
      require: false,
      default: 0,
    },
    positionY: {
      type: Number,
      require: false,
      default: 0,
    },

  },
};
</script>
<style lang="stylus" scoped>
    .contextMenu
        position fixed
        padding 5px 0px
        width 160px
        border 1px solid rgba(83,82,84,1)
        border-radius 5px
        background rgba(52,50,55,1)
        box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
        transition 0.5s all
        ul
            padding 0px
            margin 0px
            list-style none
            transition 0.5s all
            li
                height 25px 
                display flex
                padding-left 20px
                justify-content flex-start 
                align-items center
                &:hover
                    cursor pointer
                    background rgba(41,103,203,1)
        &.open  
            display inline-block
           
        &.close
            display none
    .submenu
      width 100%
      height 100%
      display flex
      justify-content space-between
      align-items center
      transition 0.5s all
      .sublist
        
        display none
      &:hover
        ul.sublist
          display inline-block
          position absolute
          left 158px
          
          padding 5px 0px
          width 160px
          border 1px solid rgba(83,82,84,1)
          border-radius 5px
          background rgba(52,50,55,1)
          box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
        
    .divider
    
        height 2px
        margin 5px 0px
        background rgba(88,86,91,1)
</style>
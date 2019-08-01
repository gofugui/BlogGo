<template>
     <div class="tooltip">
            <slot @onclick="handleClick" name="title"></slot>
            
              <div :class="['tooltip-content',formatClick?'open':'close']">
                  <slot name="content"></slot>
              </div>  
            
        </div>
</template>
<script>
const electron = require('electron');
const { remote } = electron;
const win = remote.getCurrentWindow();
export default {
  name: 'ToolTip',
  data() {
    return {
      formatClick: false,
    };
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'format') {
        this.formatClick = !this.formatClick;
      } else {
        this.formatClick = false;
      }
    });
    win.on('blur', () => {
      this.formatClick = false;
    });
  },
  methods: {
    handleClick() {
      this.formatClick = !this.formatClick;
    },
  },
};
</script>
<style lang="stylus" scoped>
  $w = 140px
  .tooltip
    position relative
    top -1px
    transition 0.5s all
  .tooltip-content
    transition 0.5s all
  
    &.open 
      display inline-block
    &.close
      display none
    position absolute
    left -($w/2) + 20px
    top 60px
    background-color rgba(52,49,51,1)
    min-width  $w
    border .5px rgba(93,90,92,1) solid
    box-shadow 0px 8px 16px 0px rgba(0,0,0,0.2)
    padding 5px 0px
    border-radius 5px 
  .tooltip-content:before
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position absolute
    top -24px
    left $w - 80px
    padding 0 
    border-bottom 12px solid rgba(93,90,92,1)
    border-top 12px solid transparent
    border-left 11px solid transparent
    border-right 11px solid transparent
    display block
    content ''
    z-index 12px
  .tooltip-content:after
    box-sizing content-box
    width 0px
    height 0px
    position absolute
    top -24px
    left $w - 81px
    padding 0
    border-bottom 13px solid rgba(52,49,51,1)
    border-top 13px solid transparent
    border-left 12px solid transparent
    border-right 12px solid transparent
    display block
    content ''
    z-index 10px
</style>
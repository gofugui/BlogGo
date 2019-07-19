<template>
  <transition name='fade'>
    <div :class="['mask', openModal ? 'open' : 'close']">
        <div :class="['modal']">
            <i @click.stop.prevent="close" class="fa fa-mavon-times" aria-hidden="true"></i>
            <div class="wrapper">
              <slot></slot>
            </div>
            
        </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'BlogModal',
  data() {
    return {

    };
  },
  props: {
    openModal: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  methods: {

    close() {
      this.$emit('change', false);
    },
  },
};
</script>
<style lang="stylus" scoped>
  .mask{
    position fixed
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.7)
    z-index 9000
    transition all 0.1s linear 0s
    &.fade-enter-active, &.fade-leave-active{
      opacity 1
    }
    &.fade-enter, &.fade-leave-active{
      opacity 0
    }
    &.open{
      display flex
      justify-content center
      align-items center
    }
    &.close{
      display: none;
    }
  }
  .modal{
    position fixed
    width:545.5px
    height: 450px;
    background-color rgba(255, 255, 255, 1);
    border-radius 2px
    box-shadow: 0 0px 5px rgba(255,255,255, .156863), 0 0px 5px rgba(255,255,255, .227451)
    transition: all 0.1s linear 0s;
  }
  i
    font-size 24px
    position absolute
    right 8px
    top 6px
    color rgba(0, 0, 0, 0.7)
    cursor pointer
  .wrapper
    padding 40px
</style>
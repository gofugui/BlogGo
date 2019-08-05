<template>
  <div :style="{ cursor, userSelect}" class="vue-splitter-container clearfix" @mouseup="onMouseUp" @mousemove="onMouseMove">

    <pane class="splitter-pane splitter-paneL" :split="split" :style="{ [type]: percent+'%',background: paneLColor,opacity:defaultPercent?1.0:0.0}">
      <slot name="paneL"></slot>
    </pane>

    <resizer :className="className" v-show='showResize' :style="{ [resizeType]: percent+'%'}" :split="split" @mousedown.native="onMouseDown" @click.native="onClick"></resizer>

    <pane class="splitter-pane splitter-paneR" :split="split" :style="{ [type]: 100-percent+'%',background:paneRColor}">
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>

<script>
  import Resizer from './resizer.vue';
  import Pane from './pane.vue';
  export default {
    name: 'splitPane',
    components: { Resizer, Pane },
    props: {
      minPercent: {
        type: Number,
        default: 10,
      },
      maxPercent: {
        type: Number,
        default: 50,
      },
      paneLColor: {
        type: String,
        default: 'rgba(30,31,33,1)',
      },
      paneRColor: {
        type: String,
        default: 'rgba(39,38,39,1)',
      },
      defaultPercent: {
        type: Number,
        default: 50,
      },
      showResize: {
        type: Boolean,
        default: true,
      },
      split: {
        validator(value) {
          return ['vertical', 'horizontal'].indexOf(value) >= 0;
        },
        required: true,
      },
      className: String,
    },
    computed: {
      userSelect() {
        return this.active ? 'none' : '';
      },
      cursor() {
        return this.active ? 'col-resize' : '';
      },
    },
    watch: {
      defaultPercent(newValue) {
        this.percent = newValue;
      },
    },
    data() {
      return {
        active: false,
        hasMoved: false,
        height: null,
        percent: this.defaultPercent,
        type: this.split === 'vertical' ? 'width' : 'height',
        resizeType: this.split === 'vertical' ? 'left' : 'top',
      };
    },
    methods: {
      onClick() {
        if (!this.hasMoved) {
          this.percent = 50;
          // this.$emit('resize');
        }
      },
      onMouseDown() {
        this.active = true;
        this.hasMoved = false;
      },
      onMouseUp() {
        this.active = false;
      },
      onMouseMove(e) {
        if (e.buttons === 0 || e.which === 0) {
          this.active = false;
        }
        if (this.active) {
          let offset = 0;
          let target = e.currentTarget;
          if (this.split === 'vertical') {
            while (target) {
              offset += target.offsetLeft;
              target = target.offsetParent;
            }
          } else {
            while (target) {
              offset += target.offsetTop;
              target = target.offsetParent;
            }
          }
          const currentPage = this.split === 'vertical' ? e.pageX : e.pageY;
          const targetOffset = this.split === 'vertical' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight;
          const percent = Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100;
          if (percent > this.maxPercent) {
            return;
          }
          if (percent > this.minPercent && percent < 100 - this.minPercent) {
            this.percent = percent;
          }
          // this.$emit('resize');
          this.hasMoved = true;
        }
      },
    },
  };
</script>

<style scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.vue-splitter-container {
  
  width: 100%;
  height: calc(100% - 20px);
  position: relative;
  
}
.vue-splitter-container-mask {
  z-index: 9999;

  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.splitter-pane {
  transition: all 0.5s;
}
</style>
<template>
	<div :class="classes" id="splitter-pane">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'Pane',
    props: {
      className: String,
    },
    data() {
      const classes = [this.$parent.split, this.className];
      return {
        classes: classes.join(' '),
        percent: 50,
      };
    },
  };
</script>

<style scoped>
 
.splitter-pane.vertical.splitter-paneL {
  overflow: hidden;
  position: absolute;
  left: 0px;
  height: 100%;
  padding-right: 1px;
  box-shadow: 2px 0 8px rgba(0,0,0,.15)
}

.splitter-pane.vertical.splitter-paneR {
  overflow: hidden;
  position: absolute;
  right: 0px;
  height: 100%;
  padding-left: 1px;
  box-shadow: 2px 0 8px rgba(0,0,0,.15)
}

.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
}
.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-top: 3px;
}
</style>
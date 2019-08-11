<template>
    <split-pane :min-percent='20' :default-percent="leftSiderPercent" :max-percent='28'  split="vertical">
        <template slot="paneL">
            <left-sider/>
        </template>
        <template slot="paneR">
           <transition name="page-editor">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
        </template>
    </split-pane>
</template>
<script>
import SplitPane from '../../components/split-pane';
import LeftSider from '../../components/sider/LeftSider';
import Bus from '../../common/js/bus';
export default {
  data() {
    return {
      leftSiderPercent: 28,
    };
  },
  components: { SplitPane, LeftSider },
  mounted() {
    Bus.$on('onLeftSider', (show) => {
      this.leftSiderPercent = show ? 28 : 0;
    });
  },
};
</script>

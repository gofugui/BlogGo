<template>
    <a-layout>
        <sider-menu />
        <a-layout>
            <a-layout-content :style="{minHeight:`${minHeight}px`,  margin: '24px 24px 0'}">
                <slot></slot>
            </a-layout-content>
            <a-layout-footer style="padding: 0px">
                <global-footer />
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
import SiderMenu from '../components/menu/SiderMenu';
import GlobalFooter from './GlobalFooter';

const minHeight = window.innerHeight - 45;
export default {
  name: 'GobalLayout',
  components: { GlobalFooter, SiderMenu },
  data() {
    return {
      minHeight,
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => (() => {
      that.minHeight = window.innerHeight - 45;
    })();
  },
};
</script>
<style lang="stylus" scoped>
    
</style>
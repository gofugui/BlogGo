<template>
    <a-layout :style="{height: '100vh'}">
        
          
         <a-layout>
         
          
          <a-layout-content>
              <slot></slot>
          </a-layout-content>  
        
        </a-layout>
      
       
       
    </a-layout>
</template>
<script>
import SiderMenu from '../components/menu';
import LeftSider from '../components/sider';
import Setting from '../components/setting';
import GlobalFooter from './GlobalFooter';
import Drawer from '../components/tools/Drawer';
import BlogModal from '../components/modal/BlogModal';
import AddBlog from '../components/modal/AddBlog';
export default {
  name: 'GobalLayout',
  components: {
    GlobalFooter, SiderMenu, LeftSider, Setting, Drawer, BlogModal, AddBlog,
  },
  data() {
    return {
      visible: true,
      showSetting: false,
      showBlogModal: false,
    };
  },
  mounted() {

  },
  methods: {
    switchClick() {
      this.visible = !this.visible;
    },
    showModal() {
      this.showBlogModal = !this.showBlogModal;
    },
    onSettingDrawerChange(val) {
      this.showSetting = val;
    },
    onBlogModalChange(val) {
      this.showBlogModal = val;
    },

  },
};
</script>
<style lang="stylus" scoped>
    .btn
      position: absolute
      bottom: 20px
      left: 20px
      z-index:1500
    .leftSider
        overflow: auto
        height: 100vh
    .rightSider
        overflow: auto
        height: 100vh
        position: absolute
    
   
</style>
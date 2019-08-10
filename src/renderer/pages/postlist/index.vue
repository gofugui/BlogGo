<template>
    <split-pane :min-percent='20' :default-percent='28' :max-percent='28'  split="vertical">
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
export default {
  components: { SplitPane, LeftSider },
};
</script>

<template>
    <global-layout>
        <div>
            MenuView1
        </div>
        <transition name="page-toggle">
            <router-view />
        </transition>
    </global-layout>
</template>
<script>
import GlobalLayout from './GlobalLayout';
export default {
  name: 'MenuView',
  components: { GlobalLayout },
};
</script>

<style lang="stylus" scoped>
    
</style>
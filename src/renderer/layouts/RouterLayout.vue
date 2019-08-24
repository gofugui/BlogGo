<template>
    <global-layout>
        
        <transition name="page-toggle">
            <keep-alive>
                <router-view />
            </keep-alive>
        </transition>
    </global-layout>
</template>
<script>
import GlobalLayout from './GlobalLayout';

export default {

  name: 'RouterLayout',
  components: { GlobalLayout },

};
</script>

<style lang="stylus" scoped>
    
</style>
<template>
    <div>
        <Icon @click="search" class='searchIcon' type="ios-search" size="20"/>
        <input id="input" class="input" v-model="text" type="text" placeholder="搜索"  />
        <Icon color="rgba(211,211,211,1)" @click="clear" v-show="text" class='searchIconClose' type="ios-close-circle" size="20"/>
    </div>
</template>
<script>
import bus from '../../common/js/bus';
export default {
  name: 'SearchInput',
  data() {
    return {
      text: '',
    };
  },

  methods: {
    clear() {
      this.text = '';
    },
    search() {
      const searchInput = document.getElementById('input');

      if (!this.text) {
        searchInput.focus();
      } else {
        searchInput.select();
      }
    },
  },
  updated() {
    this.$router.push(`/${this.text}`);
  },
  mounted() {
    bus.$on('clearSearchText', () => {
      this.clear();
    });
  },

};
</script>
<style lang="stylus" scoped>
    ::-webkit-input-placeholder
        color rgba(143,143,144,1)
    div
      width 214px
    .input
        width 210px
        height 24.5px
        background-color rgba(105,106,109,1)
        outline-color rgba(67,112,153,1)
        outline-width 7px
        border 0px
        color #fff
        border-radius 5px
        box-shadow 0 0 5px 2px rgba(0,0,0,0.1)
        padding: 0 25px 0 25px
    .searchIcon
        position absolute
        margin 2px 0px 0px 3px
    .searchIconClose
        position absolute
        margin 2px 0px 0px 0px
        right 18px
        
</style>
<template>
 
  
   <a-collapse v-model="activeKey">
      <a-collapse-panel header="博客 1" key="1">
        <div class="collapse">
          <a-popover placement="leftTop">
            <template  slot="content">
              <article-menu @add="add"/>
            </template>
            <a-button shape="circle" icon="ellipsis"/>
          </a-popover>
          
        </div>
         <a-list>
          <a-list-item class="item" @click="selectItem" v-for="(item,index) in dataArr" :key="index">
          
              
              <a-popover class="more" slot="actions" placement="leftTop">
                <template  slot="content">
                  <editor-menu/>
                </template>
                <a-button shape="circle" icon="ellipsis"/>
              </a-popover>
            
              <a-list-item-meta>
               
                <a slot="title">{{item.title}}</a>
                <div class="description" slot="description">{{item.description}}</div>
                
              </a-list-item-meta>
           
          </a-list-item>
          
          
        </a-list>
      </a-collapse-panel>
      <a-collapse-panel header="博客 2" key="2" :disabled='false'>
       
      </a-collapse-panel>
      <a-collapse-panel header="博客 3" key="3" disabled>
      
      </a-collapse-panel>
    </a-collapse>
  

</template>
<script>
import ArticleMenu from '../menu/ArticleMenu';
import EditorMenu from '../menu/EditorMenu';
export default {
  name: 'LeftSider',
  components: { ArticleMenu, EditorMenu },
  data() {
    return {
      text: '暂时没有博文',
      activeKey: '1',
      dataArr: [
        {
          title: '我是大帅比',
          description: 'virtualized 是在大数据列表中应用的一种技术。',
        },
        {
          title: '我是大帅比',
          description: 'virtualized 是在大数据列表中应用的一种技术。',
        },
        {
          title: '我是大帅比',
          description: 'virtualized 是在大数据列表中应用的一种技术。',
        },
        {
          title: '我是大帅比',
          description: 'virtualized 是在大数据列表中应用的一种技术。',
        },
        {
          title: '我是大帅比',
          description: 'virtualized 是在大数据列表中应用的一种技术。',
        },
      ],
    };
  },
  props: {
    openDrawer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    selectItem() {
      this.$router.push({ name: 'editor' });
    },
    setting() {
      this.$emit('change', !this.openDrawer);
    },
    upload() {

    },
    add() {
      this.dataArr.unshift({
        title: '新建博文',
        description: '暂无附加文本',
      });
    },

  },
};
</script>
<style lang="stylus" scoped>    
  .collapse
      position: absolute
      top: 0
      right: 0
      margin-top: 10px
      margin-right: 25px
  .item
      cursor pointer
      &:hover
        .more
          display inline-block 
  .more
    display none
</style>
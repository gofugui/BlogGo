<template>
   <a-collapse >
      <a-collapse-panel header="博客 89891" key="1">
        <div class="collapse">
      
        <a-button shape="circle" icon="ellipsis"/>
        <!--
        <a-button shape="circle" @click="add" icon="file-add"/>
        <a-button shape="circle" @click="upload" icon="cloud-upload"/>
        <a-button shape="circle" @click="setting" icon="setting" />
        -->
        </div>
         <a-list>
          <a-list-item @click="selectItem" v-for="(item,index) in dataArr" :key="index">
          
              <a-button slot="actions" shape="circle" @click="upload" icon="ellipsis"/>
              <a-list-item-meta>
               
                <a slot="title">{{item.title}}</a>
                <div slot="description">{{item.description}}</div>
                
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
export default {
  name: 'LeftSider',
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
  methods: {
    selectItem() {
      this.$router.push({ name: 'editor' });
    },
    setting() {
      this.$router.push({ name: 'setting' });
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
     &:hover
        color: #eee
 
</style>
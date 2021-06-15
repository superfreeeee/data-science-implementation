<style scoped>
#propertiesDisplay{
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
<template>
  <a-drawer
    :visible="historyVisible"
    placement="left"
    :closable="true"
    @close="onClose"
    width="520"
  >
    <div
      v-infinite-scroll="handleInfiniteOnload"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
      >
      <a-list item-layout="horizontal" :data-source="historyList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-descriptions v-bind:title="item.date">
            <a-descriptions-item label="操作" >
              {{dic[item.operationType]}}
            </a-descriptions-item>
            <a-descriptions-item label="对象id">
              {{item.objectId}}
            </a-descriptions-item>
            <a-descriptions-item label="修改属性" v-if="item.operationType==='UpdateNode' || item.operationType==='UpdateRelation'">
              <span id="propertiesDisplay">{{item.properties}}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-list-item>
      </a-list>
    </div>
  </a-drawer>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import infiniteScroll from 'vue-infinite-scroll';
  export default {
    name: "History",
    // props:{
    //   histories:{
    //     type:Array
    //   }
    // },
    directives:{
      infiniteScroll
    },
    data(){
      return{
        busy:false,
        dic:{
          'AddNode':'添加节点',
          'DeleteNode':'删除节点',
          'UpdateNode':'更新节点',
          'AddRelation':'添加关系',
          'DeleteRelation':'删除关系',
          'UpdateRelation':'更新关系'
        }
      }
    },
    async mounted(){
      await this.getHistoryList()
    },
    computed:{
      ...mapGetters([
        'historyVisible',
        'historyList'
      ])
    },
    methods:{
      ...mapMutations([
        'set_historyVisible'
      ]),
      ...mapActions([
        'getHistoryList'
      ]),
      onClose(){
        this.set_historyVisible(false)
        console.log(this.historyList)
      },
      handleInfiniteOnload(){
      }
    }
  }
</script>

<style scoped>

</style>

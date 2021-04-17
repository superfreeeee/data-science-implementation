<style scoped>
.labels {
  display: inline-block;
  height: 23px;
  line-height: 23px;
  padding: 0 0.16rem;
  font-size: 10px;
  color: #97979f;
  border-radius: 20px;
  border: 1px solid #97979f;
  margin-right: 10px;
  margin-top: 10px;
  font-style: normal;
  background-color: antiquewhite;
}
.active {
  border: 1px solid orange;
  color: white;
  background-color: rgb(248, 182, 138);
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
}
.tips{
  font-family: FZYaoti;
  font-size: 15px;
}
.typeFilter{
  padding: 20px;
  margin-left: 80%;
  
}
#button1{
  color: rgb(63, 59, 53);
  background-color:rgb(250, 212, 169);
  box-shadow: 0px 1px 2px rgb(250, 212, 169),0px 1px 2px rgba(0, 0, 0, 0.7);
  /* background-color:rgb(42, 50, 54); */
  border: white;
  font-family: LiSu;
  height: 25px;
}
#button1:hover{
  background-color:rgb(250, 198, 140);
  color: rgb(252, 252, 252);
}
.loadTip{
  margin-left: 45%;
}
</style>

<template>
  <a-drawer
    title="Node Labels"
    placement="top"
    :closable="true"
    :visible="filterByNodeLabelsVisible"
    @close="onClose"
    width="100"
  >
    <div class="tips">请点击选择节点的标签来过滤（可多选）</div>
    <div
      class="labels"
      v-for="item in graphDetailsList.nodeLabels"
      :key="item"
      @click="selectItem(item)"
      v-bind:class="{ active: arrIndex.indexOf(item) > -1 }"
    >
      {{ item }}
    </div>
    <br>
    <a-spin :spinning="spinning" tip="加载中···" style="margin-left:45%"></a-spin>
    <div class="typeFilter">
      <a-button id="button1" type="primary" @click="filterByNodeLabels()">类型过滤</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  filterByNodeLabelsAPI
}from "../api/api";
import CJS from "../components/cjs"
export default {
  name: "FilterByNodeLabels",
  components:{CJS},
  data() {
    return {
      arrIndex: [],
      spinning:false
    };
  },
  computed: {
    ...mapGetters(["filterByNodeLabelsVisible", "graphDetailsList"]),
  },
  methods: {
    ...mapMutations(["set_filterByNodeLabelsVisible"]),
    ...mapActions(["getGraphDetailsList","filterByNodeLabels"]),
    onClose() {
      this.set_filterByNodeLabelsVisible(false);
      console.log(this.graphDetailsList);
    },
    handleInfiniteOnload() {},
    selectItem(item) {
      console.log("selected")
      console.log(item)
      let arrIndex = this.arrIndex.indexOf(item);
      console.log(arrIndex)

      if (arrIndex > -1) {
        // 已选中,点击取消
        this.arrIndex.splice(arrIndex, 1);
      } else {
        // 未选中,点击选中
        this.arrIndex.push(item);
      }
      console.log(this.arrIndex)
    },
    sendData (graph) {
      console.log("send",graph)
      this.$emit('listenToChild',graph);
    },
    filterByNodeLabels: async function(){
      console.log(this.arrIndex);
      const nodeLabels={
        labels:[]
      }
      for(var key in this.arrIndex){
        nodeLabels.labels.push(this.arrIndex[key])
      }
      console.log("labels",nodeLabels)
      var graph
      // this.set_filterByNodeLabelsVisible(false);
      this.spinning=true;
      console.log(this.spinning)
      await filterByNodeLabelsAPI(nodeLabels)
      .then((res)=>{
        // console.log(res)
        graph = res.content
        this.sendData(graph)
      })
      .catch((err)=>{
        console.log(err)
      });

      this.arrIndex=[];
      this.set_filterByNodeLabelsVisible(false);
      this.spinning=false
    }
  },
};
</script>
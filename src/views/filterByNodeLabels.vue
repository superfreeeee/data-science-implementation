<style scoped>
.labels {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 0.16rem;
  font-size: 10px;
  color: #97979f;
  border-radius: 20px;
  border: 1px solid #97979f;
  margin-right: 10px;
  margin-top: 10px;
  font-style: normal;
}
.active {
  border: 1px solid orange;
  color: orange;
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
    <div
      class="labels"
      v-for="item in graphDetailsList.nodeLabels"
      :key="item"
      @click="selectItem(item)"
      v-bind:class="{ active: arrIndex.indexOf(item) > -1 }"
    >
      {{ item }}
    </div>
    <button @click="filterByNodeLabels()">类型过滤</button>
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
      this.set_filterByNodeLabelsVisible(false);
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
    }
  },
};
</script>
<style scoped>
.relationtypes {
  background-color: rgb(253, 207, 176);
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(255, 168, 118), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  /* padding: 8px; */
  /* line-height:35px; */
  margin: 5px;
  height: 17px;
  font-size: 10px;
  display: inline-block;
  padding: 0 0.16rem;
  color: rgb(82, 77, 71);
}
.relationtypes:hover{
  background-color: rgb(248, 182, 138);
}
.propertykeys {
  background-color: rgb(253, 207, 176);
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin: 5px;
  /* line-height:35px; */
  height: 17px;
  font-size: 10px;
  display: inline-block;
  padding: 0 0.16rem;
  color: rgb(82, 77, 71);
}
.propertykeys:hover{
  background-color: rgb(248, 182, 138);
}
.nodelabels {
  background-color: rgb(253, 207, 176);
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin: 5px;
  /* line-height:35px; */
  height: 17px;
  font-size: 10px;
  display: inline-block;
  padding: 0 0.16rem;
  color: rgb(82, 77, 71);
}
.nodelabels:hover{
   background-color: rgb(248, 182, 138);
}
h3{
    font-style: italic;
}
</style>>

<template>
  <a-drawer
    title="Graph Details"
    placement="left"
    :closable="true"
    :visible="graphDetailsVisible"
    @close="onClose"
    width="400"
    id="drawer"
  >
    <p>
      There are
      <span id="totalNodeNum">{{ graphDetailsList.totalNodeNum }}</span> nodes
      and
      <span id="totalRelationNum">{{ graphDetailsList.totalRelationNum }}</span>
      relationships in the database. We just display
      <span id="currentNodeNum">{{ graphDetailsList.currentNodeNum }}</span>
      nodes and
      <span id="currentRelationNum">{{
        graphDetailsList.currentRelationNum
      }}</span>
      relationships currently.
    </p>
    <br>
    <div id="nodeLabels">
      <h3>Node Labels</h3>
      <br>
      <span
        class="nodelabels"
        v-for="item in graphDetailsList.nodeLabels"
        :key="item"
        > {{ item }} </span
      >
    </div>
    <br>
    <div id="propertyKeys">
      <h3>Property Keys</h3><br>
      <span
        class="propertykeys"
        v-for="item in graphDetailsList.propertyKeys"
        :key="item"
        > {{ item }} </span
      >
    </div>
    <br>
    <div id="relationTypes">
      <h3>Relation Types</h3><br>
      <span
        class="relationtypes"
        v-for="item in graphDetailsList.relationTypes"
        :key="item"
        > {{ item }} </span
      >
    </div>
  </a-drawer>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import infiniteScroll from "vue-infinite-scroll";
export default {
  name: "GraphDetails",
  directives: {
    infiniteScroll,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.getGraphDetailsList();
  },
  computed: {
    ...mapGetters(["graphDetailsVisible", "graphDetailsList"]),
  },
  methods: {
    ...mapMutations(["set_graphDetailsVisible"]),
    ...mapActions(["getGraphDetailsList"]),
    onClose() {
      this.set_graphDetailsVisible(false);
      console.log(this.graphDetailsList);
    },
    handleInfiniteOnload() {},
  },
};
</script>


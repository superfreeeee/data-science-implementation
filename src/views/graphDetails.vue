<style scoped>
.relationtypes {
  background-color: rgb(248, 182, 138);
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  /* padding: 8px; */
  /* line-height:35px; */
  margin: 5px;
  height: 15px;
  font-size: 10px;
  display: inline-block;
}
.propertykeys {
  background-color: rgb(248, 182, 138);
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin: 5px;
  /* line-height:35px; */
  height: 15px;
  font-size: 10px;
  display: inline-block;
}
.nodelabels {
  background-color: rgb(248, 182, 138);
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin: 5px;
  /* line-height:35px; */
  height: 17px;
  font-size: 10px;
  display: inline-block;
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
    ...mapGetters(["graphDetailsVisible", "graphDetailsList", "nodeLabels"]),
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


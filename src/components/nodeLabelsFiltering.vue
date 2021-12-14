<style src="../assets/style/nodeFiltering.css"></style>

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
      v-for="item in graphLabelsList"
      :key="item"
      @click="selectItem(item)"
      v-bind:class="{ active: arrIndex.indexOf(item) > -1 }"
    >
      {{ item }}
    </div>
    <br />
    <a-spin
      :spinning="spinning"
      tip="加载中···"
      style="margin-left: 45%"
    ></a-spin>
    <div class="typeFilter">
      <a-button id="button1" type="primary" @click="filterByNodeLabels()"
        >类型过滤</a-button
      >
      <a-button id="button2" type="primary" @click="resetGraph()"
        >重置</a-button
      >
    </div>
  </a-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { filterByNodeLabelsAPI } from '../api/api';
export default {
  name: 'FilterByNodeLabels',
  data() {
    return {
      arrIndex: [],
      spinning: false,
    };
  },
  computed: {
    ...mapGetters([
      'filterByNodeLabelsVisible',
      'graphLabelsList',
      'currentIndex',
    ]),
  },
  methods: {
    ...mapMutations(['set_filterByNodeLabelsVisible']),
    ...mapActions(['filterByNodeLabels']),
    onClose() {
      this.set_filterByNodeLabelsVisible(false);
    },
    handleInfiniteOnload() {},
    selectItem(item) {
      console.log('selected');
      console.log(item);
      let arrIndex = this.arrIndex.indexOf(item);
      console.log(arrIndex);

      if (arrIndex > -1) {
        // 已选中,点击取消
        this.arrIndex.splice(arrIndex, 1);
      } else {
        // 未选中,点击选中
        this.arrIndex.push(item);
      }
      console.log(this.arrIndex);
    },
    sendData(graph, isReset) {
      // console.log("send",graph)
      this.$emit('listenToChild', graph, isReset);
    },
    filterByNodeLabels: async function () {
      // console.log(this.arrIndex);
      const nodeLabels = {
        labels: [],
      };
      for (var key in this.arrIndex) {
        nodeLabels.labels.push(this.arrIndex[key]);
      }
      // console.log("labels",nodeLabels)
      var graph;
      // this.set_filterByNodeLabelsVisible(false);
      this.spinning = true;
      console.log(this.spinning);

      const graphId = this.$store.getters.currentIndex;
      await filterByNodeLabelsAPI({
        id: graphId,
        labels: nodeLabels,
      })
        .then((res) => {
          // console.log(res)
          graph = res.content;
          this.sendData(graph, false);
        })
        .catch((err) => {
          console.log(err);
        });

      this.arrIndex = [];
      this.set_filterByNodeLabelsVisible(false);
      this.spinning = false;
    },
    resetGraph() {
      this.spinning = true;
      this.sendData({}, true);
      this.set_filterByNodeLabelsVisible(false);
      this.spinning = false;
    },
  },
};
</script>

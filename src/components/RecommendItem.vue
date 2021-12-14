<template>
  <div class="recommend-item">
    <!-- img -->
    <div class="img">
      <img src="../assets/word.png" alt="" />
      <div class="title">{{ fileData.filename }}</div>
    </div>
    <!-- options -->
    <div class="options">
      <!-- to graph -->
      <a-tooltip placement="right">
        <template slot="title">构建图谱</template>
        <div class="graph" @click="buildGraph({ ...fileData })">
          <a-icon type="branches" />
        </div>
      </a-tooltip>
      <!-- dowload -->
      <a-tooltip placement="right">
        <template slot="title">下载案例</template>
        <div class="download" @click="downloadRecommend({ ...fileData })">
          <a-icon type="download" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendItem',
  props: ['fileData', 'buildGraph', 'downloadRecommend'],
};
</script>

<style scoped>
.recommend-item {
  display: flex;
  padding-top: 14px;
}

.recommend-item .img {
  width: 150px;
  height: 100px;
  text-align: center;
}

.recommend-item .img img {
  height: calc(100% - 30px);
}

.recommend-item .img .title {
  width: 100%;
  height: 30px;
  padding: 0 12px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-item .options {
}

.recommend-item .options .graph,
.recommend-item .options .download {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
}

.recommend-item .options .graph:hover,
.recommend-item .options .download:hover {
  background-color: #b3b3b3;
}
</style>

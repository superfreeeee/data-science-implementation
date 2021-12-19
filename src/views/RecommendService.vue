<template>
  <div class="recommend-service-container">
    <HomeHeader title="推荐服务" subtitle="上传或输入案例以获取相关推荐案例" />
    <div class="main">
      <!-- 上传列表 -->
      <div class="input-bar">
        <!-- 列表为空 -->
        <a-upload-dragger
          v-if="recommendGraphs.length === 0"
          accept=".doc,.docx,text/plain"
          class="upload-file-container"
          :customRequest="() => {}"
          :show-upload-list="false"
          @change="uploadFile"
        >
          <div class="upload-file">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传案例</div>
          </div>
        </a-upload-dragger>
        <!-- 列表不为空 -->
        <a-upload
          v-else
          accept=".doc,.docx,text/plain"
          :customRequest="() => {}"
          :show-upload-list="false"
          @change="uploadFile"
        >
          <a-button>
            <a-icon type="upload" />
            上传其他案例
          </a-button>
        </a-upload>
        <!-- // TODO no input textarea type -->
        <div class="input-textarea" style="display: none">
          <a-textarea
            v-model="inputText"
            placeholder="输入司法案例内容"
            :auto-size="{ minRows: 6, maxRows: 6 }"
          ></a-textarea>
          <div style="text-align: right">
            <a-button @click="uploadText">上传</a-button>
          </div>
        </div>
      </div>
      <!-- 推荐列表 -->
      <div class="answers" ref="answers_ref">
        <div
          class="answer-row"
          v-for="(answer, index) in recommendGraphs"
          :key="index"
        >
          <div class="input">
            <span class="subtitle">上传案例</span>
            <RecommendItem
              :fileData="answer.input"
              :buildGraph="buildInputGraph"
              :downloadRecommend="downloadInput"
            />
            <!-- {{ answer.input.filename }} -->
          </div>
          <a-divider type="vertical" style="height: unset"></a-divider>
          <div class="recommend-list">
            <a-table
              class="file-table"
              :pagination="{ pageSize: 3 }"
              :columns="columns"
              :data-source="answer.recommendList"
            >
              <a slot="name" slot-scope="name">{{ name }}</a>
              <div
                class="file-table-keywords"
                slot="keywords"
                slot-scope="keywords"
              >
                <a-tag v-for="keyword in keywords" :key="keyword" color="red">
                  {{ keyword }}
                </a-tag>
              </div>
              <div class="file-table-actions" slot="action" slot-scope="file">
                <IconWithTooltip
                  title="构建图谱"
                  iconType="branches"
                  className="graph"
                  placement="top"
                  :action="() => buildGraph({ ...file })"
                />
                <!-- dowload -->
                <IconWithTooltip
                  title="下载案例"
                  iconType="download"
                  className="download"
                  placement="top"
                  :action="() => downloadRecommend({ ...file })"
                />
              </div>
            </a-table>
            <!-- <RecommendItem
                v-for="(recommend, i) in answer.recommendList"
                :key="i"
                :fileData="recommend"
                :buildGraph="buildGraph"
                :downloadRecommend="downloadRecommend"
              /> -->
            <!-- {{ recommend.filename }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HomeHeader from '@/components/HomeHeader.vue';
import RecommendItem from '@/components/RecommendItem.vue';
import IconWithTooltip from '../components/IconWithTooltip.vue';
import { autoScrollDown } from '@/utils/dom.js';
import { downloadFile, downloadText } from '@/utils/download.js';

const columns = [
  {
    title: '推荐案例',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    width: '50%',
  },
  {
    title: '关键字',
    dataIndex: 'keywords',
    key: 'keywords',
    scopedSlots: { customRender: 'keywords' },
    width: '40%',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  components: {
    HomeHeader,
    RecommendItem,
    IconWithTooltip,
  },
  name: 'RecommendService',
  props: ['createGraphFromFile', 'checkNewGraph'],
  data() {
    return {
      inputText: '',
      answers: [],
      columns,
    };
  },
  computed: {
    ...mapGetters(['recommendGraphs']),
  },
  methods: {
    ...mapActions(['getRecommendFIles', 'getGraphByName']),
    async uploadFile(e) {
      const file = e.file.originFileObj;
      console.log('[uploadFile] file', file);

      await this.getRecommendFIles(file);

      console.log('[uploadFile] recommendGraphs', this.recommendGraphs);

      this.$nextTick(() => {
        // console.log('[uploadFile] answers_ref', this.$refs.answers_ref);
        autoScrollDown(this.$refs.answers_ref);
      });
    },
    uploadText() {
      console.log(`[uploadText] text = ${this.inputText}`);
      this.inputText = '';
    },
    buildInputGraph(fileData) {
      console.log('[buildInputGraph]', fileData);
      this.createGraphFromFile(fileData);
    },
    downloadInput(fileData) {
      console.log('[downloadInput]', fileData);
      downloadFile(fileData);
    },
    async buildGraph(fileData) {
      console.log('[buildGraph]', fileData);
      await this.getGraphByName(fileData.name);
      this.checkNewGraph();
    },
    downloadRecommend(fileData) {
      console.log('[downloadRecommend]', fileData);
      downloadText(fileData.name, fileData.text);
    },
  },
};
</script>

<style scoped>
.recommend-service-container {
  height: calc(100vh - 70px);
}

.recommend-service-container .main {
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  padding: 32px 6% 0;
  overflow: hidden;
}

.input-bar .input-textarea {
  min-width: 400px;
  width: 50%;
}

.answers {
  flex: 1;
  margin-top: 24px;
  overflow: auto;
}

.answer-row {
  display: flex;
}

.answer-row + .answer-row {
  margin-top: 32px;
}

.answer-row .recommend-list {
  width: 80%;
  overflow: hidden;
}

.answer-row .file-table {
  width: 100%;
}
.answer-row .file-table-actions {
  display: flex;
}

.answer-row .file-table-keywords {
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
}

.subtitle {
  padding: 0 20px;
  font-size: 14px;
  color: #8b9098;
  font-family: 'Microsoft YaHei';
  font-weight: 600;
}
</style>

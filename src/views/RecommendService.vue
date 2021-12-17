<template>
  <div class="recommend-service-container">
    <HomeHeader title="推荐服务" subtitle="上传或输入案例以获取相关推荐案例" />
    <div class="main">
      <!-- 上传列表 -->
      <div class="input-bar">
        <a-upload
          class="avatar-uploader"
          accept=".doc,.docx,text/plain"
          :customRequest="() => {}"
          :before-upload="beforeUpload"
          :show-upload-list="false"
          @change="uploadFile"
        >
          <a-button>
            <a-icon type="upload" />
            上传案例
          </a-button>
        </a-upload>
        <div class="input-textarea">
          <a-textarea
            v-model="inputText"
            placeholder="输入司法案例内容"
            :auto-size="{ minRows: 6, maxRows: 6 }"
          ></a-textarea>
          <div style="text-align: right">
            <!-- // TODO clear fake -->
            <a-button @click="addFakeRec">addFake</a-button>
            <a-button @click="uploadText">上传</a-button>
          </div>
        </div>
      </div>
      <!-- 推荐列表 -->
      <div class="answers">
        <div class="answer-row" v-for="(answer, index) in answers" :key="index">
          <div class="input">
            <span class="subtitle">上传案例</span>
            <RecommendItem
              :fileData="answer.input"
              :buildGraph="buildGraph"
              :downloadRecommend="downloadRecommend"
            />
            <!-- {{ answer.input.filename }} -->
          </div>
          <a-divider type="vertical" style="height: unset"></a-divider>
          <div class="recommend-list">
            <a-table
              class="file-table"
              :pagination="{ pageSize: 5 }"
              :columns="columns"
              :data-source="answer.recommendList"
            >
              <a slot="name" slot-scope="filename">{{ filename }}</a>
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
import HomeHeader from '@/components/HomeHeader.vue';
import RecommendItem from '@/components/RecommendItem.vue';
import IconWithTooltip from '../components/IconWithTooltip.vue';

const columns = [
  {
    title: '推荐案例',
    dataIndex: 'filename',
    key: 'filename',
    scopedSlots: { customRender: 'name' },
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
  data() {
    return {
      inputText: '',
      answers: [],
      columns,
    };
  },
  methods: {
    addFakeRec() {
      this.answers.push({
        input: {
          filename: 'file.1234567890qwertyuioasdfghjkl',
          file: '0000000000',
        },
        recommendList: [
          {
            key: 0,
            filename: 'file1.doc',
            file: '1111111111',
          },
          {
            key: 1,
            filename: 'file2.doc',
            file: '2222222222222',
          },
          {
            key: 2,
            filename: 'file3.doc',
            file: '33333333333333',
          },
          {
            key: 3,
            filename: 'file4.doc',
            file: '44444444444',
          },
          {
            key: 4,
            filename: 'file1.doc',
            file: '1111111111',
          },
          {
            key: 5,
            filename: 'file2.doc',
            file: '2222222222222',
          },
          {
            key: 6,
            filename: 'file3.doc',
            file: '33333333333333',
          },
          {
            key: 7,
            filename: 'file4.doc',
            file: '44444444444',
          },
        ],
      });
    },
    beforeUpload(e) {
      console.log('[beforeUpload]', e);
      return true;
    },
    uploadFile(e) {
      const file = e.file;
      console.log('[uploadFile]', file);
    },
    uploadText() {
      console.log(`[uploadText] text = ${this.inputText}`);
      this.inputText = '';
    },
    buildGraph(fileData) {
      console.log('[buildGraph]', fileData);
    },
    downloadRecommend(fileData) {
      console.log('[downloadRecommend]', fileData);
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
  width: 70%;
  max-height: 400px;
  overflow: hidden;
}

.answer-row .file-table {
  width: 100%;
}
.answer-row .file-table-actions {
  display: flex;
}

.subtitle {
  padding: 0 20px;
  font-size: 14px;
  color: #8b9098;
  font-family: 'Microsoft YaHei';
  font-weight: 600;
}
</style>

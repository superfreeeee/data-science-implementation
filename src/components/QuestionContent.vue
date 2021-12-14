<template>
  <div class="question-content-container">
    <div class="talk_table" id="scrolldIV">
      <div v-for="(item, index) in chatList" :key="index">
        <div class="answer" v-if="item.IsAnswer">
          <img src="../assets/question/IQ.svg" />
          <div class="info">
            <div class="info-content">{{ item.Text }}</div>
          </div>
        </div>
        <div class="question" v-else>
          <div class="info">
            <div class="info-content">{{ item.Text }}</div>
          </div>
          <img src="../assets/question/user.svg" />
        </div>
      </div>
    </div>
    <div class="action-bar">
      <a-popover placement="topLeft" v-model="show_l">
        <template slot="content">
          <a-list size="small" bordered :data-source="recommand_list">
            <a-list-item
              class="recommend-question"
              slot="renderItem"
              slot-scope="item, index"
              @click="get_answer(index)"
            >
              {{ item }}
            </a-list-item>
          </a-list>
        </template>
        <a-button>推荐问题</a-button>
      </a-popover>
      <a-input-search class="post_question" allow-clear @search="onSearch" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'QuestionContent',
  data() {
    return {
      chatList: [
        {
          IsAnswer: true,
          Text: 'Input Your Question Below!',
        },
        {
          IsAnswer: false,
          Text: 'Hello',
        },
        {
          IsAnswer: true,
          Text: 'Nice to meet u',
        },
      ],
      show: false,
      show_l: false,
    };
  },
  computed: {
    ...mapGetters(['answer', 'recommand_list']),
  },
  methods: {
    ...mapMutations(['set_recommand']),
    ...mapActions(['getAnswer', 'getRecommand']),
    scrollDown() {
      var div = document.getElementById('scrolldIV');
      setTimeout(function () {
        div.scrollTop = div.scrollHeight;
      });
    },
    async get_answer(index) {
      this.show_l = false;
      const question_cur = this.recommand_list[index];
      const res = await Promise.all([
        this.getAnswer(question_cur),
        this.getRecommand(question_cur),
      ]);
      console.log('res', res);
      if (res.some((b) => !b)) {
        console.error('[get_answer] getAnswer / getRecommand fail');
        // return;
      }
      this.chatList.push({
        IsAnswer: false,
        Text: question_cur,
      });
      this.chatList.push({
        IsAnswer: true,
        Text: this.answer,
      });
      this.scrollDown();
    },
    async onSearch(value) {
      const res = await Promise.all([
        this.getAnswer(value),
        this.getRecommand(value),
      ]);
      console.log('res', res);
      if (res.some((b) => !b)) {
        console.error('[get_answer] getAnswer / getRecommand fail');
        // return;
      }
      this.value = '';
      console.log('recommand', this.recommand_list);

      this.chatList.push({
        IsAnswer: false,
        Text: value,
      });
      this.chatList.push({
        IsAnswer: true,
        Text: this.answer,
      });
      this.scrollDown();
    },
  },
};
</script>

<style scoped>
.question-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 0 5.5%;
  overflow: hidden;
}
.talk_table {
  flex: 1;
  width: 100%;
  padding: 10px;
  overflow-y: auto;
}
.answer {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.answer img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.answer .info {
  margin-left: 10px;
}
.answer .info .info-content {
  padding: 10px;
  font-size: 14px;
  background: #a3c3f6;
  position: relative;
  white-space: pre-line;
  margin-top: 8px;
  overflow-wrap: break-word;
}
.answer .info .info-content::before {
  position: absolute;
  left: -8px;
  top: 8px;
  content: '';
  border-right: 10px solid #a3c3f6;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.action-bar {
  display: flex;
  align-items: center;
  padding: 12px 24px 0;
}

.post_question {
  margin: 0 10px;
}

.question {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}
.question img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.question .info {
  width: 90%;
  margin-left: 10px;
  text-align: right;
}
.question .info .info-content {
  max-width: 70%;
  padding: 10px;
  font-size: 14px;
  float: right;
  margin-right: 10px;
  position: relative;
  margin-top: 8px;
  background: #ecd1e9;
  text-align: left;
  overflow-wrap: break-word;
}

.question .info .info-content::after {
  position: absolute;
  right: -8px;
  top: 8px;
  content: '';
  border-left: 10px solid #ecd1e9;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.recommend-question {
  cursor: pointer;
}
</style>

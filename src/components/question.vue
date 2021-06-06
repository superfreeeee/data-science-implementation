<style scoped>

.drop_down {
  display: inline-block;
}


.talk_table {
  width: 600px;
  height: 400px;
  padding: 10px;
  overflow-y:auto;
}

.post_question {
  padding: 10px;
  width: 600px;
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
  background: #A3C3F6;
  position: relative;
  margin-top: 8px;
}
.answer .info .info-content::before {
  position: absolute;
  left: -8px;
  top: 8px;
  content: '';
  border-right: 10px solid #A3C3F6;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.question {
  display: flex;
  justify-content:flex-end;
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
.question .info .info-content{
  max-width: 70%;
  padding: 10px;
  font-size: 14px;
  float: right;
  margin-right: 10px;
  position: relative;
  margin-top: 8px;
  background: #ECD1E9;
  text-align: left;
}

.question .info .info-content::after {
  position: absolute;
  right: -8px;
  top: 8px;
  content: '';
  border-left: 10px solid #ECD1E9;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}
</style>

<template>
  <div class = "question_table">
    <div id="recommand_question">
      <a-dropdown-button class="drop_down" >
        <a-popover placement="topRight" title="Intelligence Question" v-model="show" trigger="click">
          <template slot="content">
            <div>
              <div class="talk_table" id="scrolldIV">
                <div v-for="item in chatList">
                  <div class="answer" v-if="item.IsAnswer">
                    <img src="../assets/question/IQ.svg" >
                    <div class="info">
                      <div class="info-content">{{item.Text}}</div>
                    </div>
                  </div>
                  <div class="question" v-else>
                    <div class="info">
                      <div class="info-content">{{item.Text}}</div>
                    </div>
                    <img src="../assets/question/user.svg" >
                  </div>
                </div>
              </div>
              <a-input-search placeholder="input search text" class="post_question" @search="onSearch" />
            </div>
          </template>
          <img src="../assets/question/IQ.svg" style="max-height: 100%">
        </a-popover>
        <a-menu slot="overlay">
          <a-menu-item v-for="(Mitem, Mindex) in recommand_list" :key="Mindex" @click="set_talkVisible(Mindex)">
            {{Mitem}}
          </a-menu-item>
        </a-menu>
      </a-dropdown-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "question",
  data () {
    return {
      chatList:[
        {
          IsAnswer:true,
          Text:"Input Your Question Below!"
        },
        {
          IsAnswer: false,
          Text:"Hello"
        },
        {
          IsAnswer: true,
          Text:"Nice to meet u"
        }
      ],
      show: false,
    }
  },
  computed: {
    ...mapGetters([
        "answer",
        "recommand_list"
        ]),
  },
  methods: {
    ...mapMutations([
      'set_recommand'
        ]),
    ...mapActions([
      'getAnswer',
      'getRecommand',
    ]),
    down_scroll(){
      var div = document.getElementById('scrolldIV');
      setTimeout(function(){div.scrollTop = div.scrollHeight;}, 1);
    },
    async set_talkVisible(index){
      const question_cur = this.recommand_list[index]
      await Promise.all([this.getAnswer(question_cur), this.getRecommand(question_cur)])
      this.chatList.push({
        IsAnswer:false,
        Text:question_cur
      })
      this.chatList.push({
        IsAnswer:true,
        Text:this.answer
      })
      this.show = true;
      this.down_scroll()
    },
    async onSearch(value) {
      await Promise.all([this.getAnswer(value), this.getRecommand(value)])
      this.chatList.push({
        IsAnswer:false,
        Text:value
      })
      this.chatList.push({
        IsAnswer:true,
        Text:this.answer
      })
      this.down_scroll()
    },
  },
};
</script>
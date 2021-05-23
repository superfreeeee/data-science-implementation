<style scoped>
.questionTable{
    margin-left: 20px;
}
#search-result-list{
    margin-top: 60px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
    margin-left: 20px;
}
</style>

<template>
  <a-drawer
    title="智能问答"
    placement="right"
    :closable="true"
    :visible="questionVisible"
    @close="onClose"
    width="720"
    :body-style="{ paddingBottom: '80px' }"
  >
    <div class = "questionTable">
        <a-input-search placeholder="input search text" size="large" @search="onSearch" />
    </div>
    <div id="search-result-list">
      Search Result List
    </div>
  </a-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
}from "../api/api";
export default {
  name: "question",
  computed: {
    ...mapGetters([
        "questionVisible",
        "answer"
        ]),
  },
  methods: {
    ...mapMutations([
        "set_questionVisible"
        ]),
    ...mapActions([
        "getAnswer"
    ]),
    onClose() {
      this.set_questionVisible(false)
    },
    onSearch(value) {
        this.getAnswer(value)
        var answer_table = document.getElementById('search-result-list')
        answer_table.innerText = this.answer
    },
  },
};
</script>
<template>
<a-col :md="16" :sm="16" :lg="16">
  <a-form layout="inline" :form="form" @submit="search">
    <!-- <a-col :md="16" :sm="16" :lg="16"> -->
      <div style="display: flex; align-items: center">
        <a-form-item label="搜索类型">
          <a-select
            placeholder="请选择"
            style="width: 100px"
            v-decorator="[
              'searchType',
              { rules: [{ required: false, message: '请选择搜索类型' }] },
            ]"
            allowClear
            name="searchType"
          >
            <a-select-option value="1">所有</a-select-option>
            <a-select-option value="2">节点</a-select-option>
            <a-select-option value="3">关系</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'searchValue',
              { rules: [{ required: false, message: '请输入搜索值' }] },
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-button html-type="submit">查询</a-button>
        <a-button style="margin-left: 10px" @click="reset">重置</a-button>
      </div>
    <!-- </a-col> -->
  </a-form>
</a-col>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "mySearch",
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      searchParams: {
        type_id: undefined,
      },
      searchValue: "",
      // 高级搜索 展开/关闭
      advanced: false,
      searchType: "",
      // 查询参数
      queryParam: {},
    };
  },
  computed: {
    ...mapGetters(["currentIndex", "allGraphList"]),
  },
  methods: {
    reset() {
      this.form.resetFields();
    },
    handleChange(value) {
      this.searchType = value;
    },
    search(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.searchValue = values.searchValue;
          this.searchType = values.searchType;
          this.queryParam = {
            searchType: values.searchType,
            searchValue: values.searchValue,
          };
        }
        // this.$refs.stable.refresh();
        // 模糊搜索
        if (this.searchType === "1") {
          this.searchNode(this.searchValue);
          this.searchEdge(this.searchValue);
        }
        if (this.searchType === "2") {
          console.log("test");
          this.searchNode(this.searchValue);
        }
        if (this.searchType === "3") {
          this.searchEdge(this.searchValue);
        }
      });
    },
    searchEdge(key) {
      var graphIndex = this.$store.getters.currentIndex;
      var graph = this.$store.getters.allGraphList[graphIndex];
      var edgesCollection=[]
      for (var item in graph) {
        if(graph[item].group=="edges"){
          edgesCollection.push(graph[item])
        }
      }
      // console.log(edgesCollection)

      var i = 0
      var reg = this.dealSearchKey(key)
      var idList=[]
      while (i < edgesCollection.length) {
        var edge = edgesCollection[i]
        i = i + 1
        var edgeInfo = edge.data
        var edgeName = edgeInfo.name

        if (edgeName.match(reg)) {
          // console.log(edgeInfo.id)
          idList.push(edgeInfo.id)
        }
      }
      this.$emit('listenToMySearch',idList )
    },
    searchNode(key) {
      // 获取所有节点
      var graphIndex = this.$store.getters.currentIndex;
      var graph = this.$store.getters.allGraphList[graphIndex];
      var nodesCollection=[]
      for (var item in graph) {
        // console.log("edges", graph[item]);
        if(graph[item].group=="nodes"){
          nodesCollection.push(graph[item])
        }
      }

      var i = 0;
      var reg = this.dealSearchKey(key);
      var idList=[]

      while (i < nodesCollection.length) {
        var node = nodesCollection[i];
        i = i + 1;
        var nodeInfo = node.data
        var nodeName = nodeInfo.name;
        if (nodeName.match(reg)) {
          // console.log(nodeInfo.id)
          idList.push(nodeInfo.id)
        }
      }
      // console.log("idList",idList)
      this.$emit('listenToMySearch',idList)
    },

    dealSearchKey(key) {
      const escapeRegExp = /[-#$^*()+[\]{}|\\,.?\s]/g;
      var src = ["(.*?)("];
      var ks = key.split("");
      if (ks.length) {
        while (ks.length) {
          src.push(ks.shift().replace(escapeRegExp, "\\$&"), ")(.*?)(");
        }
        src.pop();
      }
      src.push(")(.*?)");
      src = src.join("");
      var reg = new RegExp(src, "i");
      var replacer = [];
      var start = key.length;
      var begin = 1;
      while (start > 0) {
        start--;
        replacer.push("$", begin, "($", begin + 1, ")");
        begin += 2;
      }
      replacer.push("$", begin);
      return reg;
    },
  },
};
</script>

<style scoped>
</style>

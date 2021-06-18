<style scoped>
#picture {
  height: 450px;
  width: 80%;
  margin-top: 10px;
  margin-left: 5.5%;
  margin-right: 20%;
  /* padding-top: 30px; */
  z-index: 1;
  background-color: white;
  border: 1.5px solid;
  border-radius: 15px 15px 15px 15px;
  border-style: outset;
}
.constructionProcess {
  width: 80%;
  height: 30px;
  background-color: white;
  /* margin: 10px; */
  margin-left: 5.5%;
}
</style>
<template>
  <div>
    <div
      :style="{ padding: '24px', minHeight: '80px' }"
      style="text-align: center"
    >
      <a-form layout="inline" :form="form" @submit="constructGraph">
        <div style="display: flex; align-items: center">
          <a-form-item label="url" style="margin-left: 5.5%">
            <a-input
              style="width: 500px"
              v-decorator="[
                'searchUrl',
                { rules: [{ required: true, message: '请输入搜索url' }] },
              ]"
              placeholder="请输入url"
            />
          </a-form-item>
          <a-form-item label="爬取页面数量">
            <a-input
              style="width: 100px"
              v-decorator="[
                'searchNum',
                { rules: [{ required: true, message: '请输入搜索页面数量' }] },
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
          <a-button html-type="submit">构建</a-button>
          <a-button style="margin-left: 10px" @click="stopConstruction"
            >停止构建</a-button
          >
        </div>
      </a-form>
    </div>
    <div class="constructionProcess">
      当前爬取页面数：<span id="pageNum"></span>
    </div>

    <div>
      <div id="picture"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import infiniteScroll from "vue-infinite-scroll";
import cytoscape from "cytoscape";
import {
  stopConstructionAPI,
  getConstructionDetailAPI,
  constructGraphAPI,
} from "../api/graphConstruction";
export default {
  name: "AutomaticBuilding",
  beforeCreate() {
    this.$myCy && this.$myCy.destroyed() && this.$myCy.destroy();
    delete this.$myCy;
  },
  beforeDestroy() {
    this.$myCy && this.$myCy.destroyed() && this.$myCy.destroy();
    delete this.$myCy;
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      searchUrl: "",
      searchNum: "",
      queryParam: {},
      num:0
    };
  },
  mounted() {
    this.$myCy = cytoscape({
      container: document.getElementById("picture"),
      userZoomingEnabled: true, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
      boxSelectionEnabled: false,
    });
    this.$myCy
      .style()
      /* 未选择节点样式 */
      .selector("node")
      .style({
        // content: 'data(id)',
        "pie-size": "100%",
        "text-valign": "center",
        "text-halign": "center",
        label: "data(name)",
        "font-size": "15pt",
        width: "50pt",
        height: "50pt",
        "background-color": "#fce9cc",
      })
      /* 已选择节点样式 */
      .selector("node:selected")
      .style({ "border-color": "#c84e40", "border-width": "1px" })
      /* 未选择节点样式 */
      .selector("edge")
      .style({
        label: "data(name)",
        "target-arrow-shape": "triangle" /* 箭头样式 */,
        "target-arrow-size": "1px" /* 箭头大小 */,
        "target-arrow-color": "rgba(230,230,250,0.9)" /* 箭头颜色 */,
        "curve-style": "bezier" /* 线条样式曲线 */,
        "line-color": "rgba(230,230,250,0.9)" /* 线条颜色 */,
        width: "1px" /* 线条宽度 */,
        "font-size": "10px" /* 标签字体大小 */,
        color: "#000000" /* 标签字体大小 */,
        // 'text-outline-color': 'white', /* 文本轮廓颜色 */
        // 'text-outline-width': '0.5px', /* 文本轮廓宽度 */
        "text-rotation": "autorotate" /* 标签方向 */,
      })
      /* 已选择节点样式 */
      .selector("edge:selected")
      .style({
        color: "#90acfc" /* 标签字体大小 */,
        "target-arrow-color": "#9ad3f8" /* 箭头颜色 */,
        "line-color": "#abdbfa" /* 线条颜色 */,
      })
      /* 高亮样式 */
      .selector(".light-off")
      .style({ opacity: "0.1" })
      .selector(".0")
      .style({ "background-color": "#fce9cc" })
      .selector(".1")
      .style({ "background-color": "#aeeaf5" })
      .selector(".2")
      .style({ "background-color": "#FFC0CB" })
      .selector(".3")
      .style({ "background-color": "#FFF8DC" })
      .selector(".4")
      .style({ "background-color": "#FFFACD" })
      .selector(".5")
      .style({ "background-color": "#48D1CC" })
      .selector(".6")
      .style({ "background-color": "#B0E0E6" });
  },
  computed: {
    ...mapGetters(["elesToBeAdded", "latestConstructGraph"]),
  },
  methods: {
    ...mapMutations([
      "set_preConstructGraph",
      "set_latestConstructGraph",
      "set_elesToBeAdded",
      "set_graphConstructId",
    ]),
    ...mapActions(["getGraphById", "getConstructionDetail"]),
    // 添加元素
    addEles(eles) {
      // console.log(eles)
      if (eles) {
        this.$myCy.startBatch();
        this.$myCy.batch(() => {
          const elements = (
            Array.isArray
              ? Array.isArray(eles)
              : eles != null && eles instanceof Array
          )
            ? eles
            : [eles];
          const filterElements = elements.filter(
            (__) => !this.$myCy.getElementById(__.data.id).length
          );
          this.$myCy.add(filterElements);
          this.$myCy.layout({ name: "cose", animate: false }).run();
        });
        this.$myCy.endBatch();
      }
    },
    async constructGraph(e) {
      e.preventDefault();
      this.$myCy.elements().remove()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.searchUrl = values.searchUrl;
          this.searchNum = values.searchNum;
          console.log(this.searchUrl);
          console.log(this.searchNum);
          this.queryParam = {
            startUrl: this.searchUrl,
            pageNum: parseInt(this.searchNum),
          };
        }
      });
      var cnt = 1;
      var graphConstructId;
      //  获得图的id
      await constructGraphAPI(this.queryParam)
        .then((res) => {
          console.log(res.content);
          graphConstructId = "" + res.content;
          this.set_graphConstructId(graphConstructId);
        })
        .catch((err) => console.log(err));
      // 然后每隔5秒getGraphById,将新增元素添加到图中
      // 当新增元素为空时停止循环
      var eles = [];
      var id1 = setInterval(async () => {
        this.getGraphById();
        eles = this.$store.getters.elesToBeAdded;
        console.log("eles", eles);
        var preConstructGraph = this.$store.getters.preConstructGraph;
        if (eles.length == 0 && preConstructGraph.length > 0) {
          clearInterval(id1);
          // console.log("id1")
          this.set_preConstructGraph([]);
          this.set_latestConstructGraph([]);
          this.set_elesToBeAdded([]);
          this.form.resetFields();
        }
        for (var key in eles) {
          this.addEles(eles[key]);
        }
        // this.getConstructionDetail();
        
        // await getConstructionDetailAPI()
        //     .then((res) => {
        //         console.log("num",res)
        //         this.num=res
        //     })
        //     .catch((err) => { console.log(err) })
        // window.document.getElementById("pageNum").innerHTML=this.num+"页"
        this.set_preConstructGraph(this.$store.getters.latestConstructGraph);
        this.set_latestConstructGraph([]);
        this.set_elesToBeAdded([]);
      }, 3000);
      // var id1=setInterval(() => {
      //   // alert("dahuaidanljb")
      //   this.addEles({group:'nodes',data:{id:""+cnt}})
      //   cnt++
      //   if(cnt==5){
      //       clearInterval(id1)
      //   }
      // },1000)
    },
    async stopConstruction() {
      await stopConstructionAPI()
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

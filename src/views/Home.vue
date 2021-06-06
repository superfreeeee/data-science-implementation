<style src="../assets/style/Home.css"></style>
<template>
  <div style="height: 100%; width: 100%;">
    <!--顶部导航栏-->
    <div class="topNavigator">
      <div class="table-page-search-wrapper">
        <a-form
          layout="inline"
          :form="searchForm"
          @submit="search"
        >
          <a-row :gutter="24">
            <a-col :md="2" :sm="24" :lg="2"></a-col>
            <a-col :md="4" :sm="24" :lg="4">
              <a-form-item label="搜索类型">
                <a-select
                  placeholder="请选择"
                  style="width: 100px"
                  v-decorator="['searchType',
                        {rules: [{ required: false, message: '请选择搜索类型' }]}
                        ]"
                  allowClear
                  name="searchType">
                  <a-select-option value="1">所有</a-select-option>
                  <a-select-option value="2">节点</a-select-option>
                  <a-select-option value="3">关系</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" :lg="8">
              <a-form-item>
                <a-input
                  v-decorator="['searchValue',
                {rules: [{ required: false, message: '请输入搜索值' }]}
                ]"
                  placeholder="请输入"/>
              </a-form-item>
              <span class="table-page-search-submitButtons">
                <a-button html-type="submit" style="background-color:rgb(248, 182, 138);box-shadow: 0px 1px 2px rgb(253, 146, 84), 0px 1px 2px rgba(0, 0, 0, .7);color: white;margin-top: 3px">查询</a-button>
                <a-button style="margin-left: 10px" @click="reset">重置</a-button>
              </span>
            </a-col>
            <a-col :md="4" :sm="24" :lg="4"></a-col>
            <a-col :md="5" :sm="24" :lg="5">
              <a-button @click="filterByNodeLabels()" style="font-size: 16px; color: white;background-color:transparent;border:0px">
                类型过滤
              </a-button>
              <a-dropdown style="margin-left: 20px">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()"
                   style="font-size: 16px; color: white; margin-top: 20px">
                  调整布局 <a-icon type="down" />
                </a>
                <a-menu slot="overlay" @click="onClick">
                  <a-menu-item key="1" @click="refresh({name: 'cose'})"><a-icon title="刷新布局" type="sync" />刷新布局
                  </a-menu-item>
                  <a-menu-item key="2"  @click="refresh({name: 'fcose'})">
                  <a-icon type="global" />力导图模式
                  </a-menu-item>
                  <a-menu-item key="3" @click="refresh({name: 'klay'})">
                    <a-icon title="排版布局" type="appstore" />排版模式
                  </a-menu-item>
                  <a-menu-item key="4" @click="saveGraph">
                    <a-icon title="排版布局" type="download" />保存布局
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 左侧导航栏 -->
    <div class="cytoolbar_id">
      <div class="tools">
        <div class="center-center">
          <a-icon type="plus-circle" style="font-size: 25px;cursor: pointer;"
            title="放大"
            @click="magnifying()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="minus-circle" 
            style="font-size: 25px; cursor: pointer"
            title="缩小"
            @click="contractible()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="fullscreen" 
            style="font-size: 25px; cursor: pointer"
            title="合适大小"
            @click="resize()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="highlight"
            style="font-size: 25px; cursor: pointer"
            title="高亮邻居"
            @click="highlight()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon
            type="download"
            style="font-size: 25px; cursor: pointer;"
            title="xml下载"
            @click="downloadXml()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="camera"
            style="font-size: 25px; cursor: pointer"
            title="全图导出"
            @click="exportPng()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="history"
            style="font-size: 25px; cursor: pointer"
            title="历史记录"
            @click="showHistory()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon
            type="setting"
            style="font-size: 25px; cursor: pointer"
            title="设置"
            @click="setting()"
          />
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon
            type="unordered-list"
            style="font-size: 25px; cursor: pointer"
            title="详细信息"
            @click="showGraphDetails()"
          />
        </div>
      </div>
    </div>
    <!-- 画布 -->
    <div>
    <div class="navigatorAboveDrawer"></div>
    <Drawer ref="ref_CJS" @reloadGraph="reloadGraph">
    </Drawer>
    </div>
    <!-- 智能问答 -->
    <Question class = "Int_question"></Question>
    <div class="propertyDisplay">
      <span id="labels"></span>
      <p id="properties"> click on the node or edge to display more infomation!</p>
    </div>
    <Setting @listenToSet='getSetting'></Setting>
    <GraphDetails></GraphDetails>
    <History></History>
    <FilterByNodeLabels @listenToChild='getChildData'></FilterByNodeLabels>
  </div>
</template>

<script>
import Drawer from "../components/knowledgeGraph"
import Setting from "../components/setting"
import GraphDetails from "../components/graphDetails"
import History from "../components/history"
import FilterByNodeLabels from "../components/nodeLabelsFiltering"
import Question from '../components/question'
import { mapActions, mapGetters,mapMutations } from 'vuex'
export default{
  components:{
    Drawer,
    Setting,
    GraphDetails,
    History,
    FilterByNodeLabels,
    Question
  },
  computed:{
    ...mapGetters(['settingVisible','settingList','historyVisible'])
  },
  methods:{
    ...mapMutations(["set_settingVisible","set_graphDetailsVisible","set_historyVisible","set_filterByNodeLabelsVisible","set_isInit"]),
    ...mapActions(["getGraphDetailsList","getHistoryList","updateNodePos"]),
    // 放大
    magnifying(){
      console.log(this)
      this.$refs.ref_CJS.magnifying()
    },
    // 缩小
    contractible(){
      this.$refs.ref_CJS.contractible ()
    },
    // 合适大小
    resize(){
      this.$refs.ref_CJS.resize()
    },
    // 高亮
    highlight(){
      this.$refs.ref_CJS.highlight()
    },
    // 导出xml
    downloadXml(){
      this.$refs.ref_CJS.downloadXml()
    },
    // 导出图片
    exportPng(){
      this.$refs.ref_CJS.exportPng()
    },
    // 刷新布局
    refresh(name){
      this.$refs.ref_CJS.refresh(name)
    },
    // 设置节点属性
    async setting() {
      await this.set_settingVisible(true);
    },
    getSetting(settingData) {
      console.log(settingData)
      this.$refs.ref_CJS.$cy.style()
      .selector('node')
      .style({
        "font-size": settingData.textSize+ "pt",
        width: settingData.nodeSize + settingData.widthE + "pt",
        height: settingData.nodeSize + "pt",
        shape: settingData.shape
      }).update()
      var edgeFont = "10px";
      if (!settingData.lableVisible) {
        edgeFont = "0px";
      }
      this.$refs.ref_CJS.$cy.style()
      .selector('edge')
      .style({
        "font-size": edgeFont
      }).update()
      this.$refs.ref_CJS.$cy.style()
      .selector(".eh-handle")
      .style({
        "background-color": "#fce9cc",
        width: 10,
        height: 10,
        shape: "ellipse",
        "overlay-opacity": 0,
        "border-width": 12, // makes the handle easier to hit
        "border-opacity": 0,
      }).update()
      // this.$cy.endBatch();
    },
    // 显示图详细信息
    showGraphDetails() {
      this.getGraphDetailsList();
      this.set_graphDetailsVisible(true);
    },
    // 显示历史记录
    showHistory() {
      this.getHistoryList();
      this.set_historyVisible(true);
    },
    onClick ({ key }) {
      console.log(`Click on item ${key}`)
    },
    // 重新加载图片
    async reloadGraph(){
      await this.$refs.ref_CJS.getGraphList()
      console.log("hhh",this.$store.getters.isInit)
      this.$refs.ref_CJS.$cy.fit()
    },
    // 节点过滤
    filterByNodeLabels() {
      this.getGraphDetailsList();
      this.set_filterByNodeLabelsVisible(true);
    },
    getChildData(graph,isReset){
       console.log("filter",graph);
      console.log("重新加载",isReset);
      this.$refs.ref_CJS.$cy.elements().remove();
      if(!isReset){
      var nodes = graph.nodes;
      var edges = graph.edges;
      for (var n in nodes) {
        var node = nodes[n];
        const data = {};
        if (node.properties) {
          for (var key in node.properties) {
            data[key] = node.properties[key];
          }
        } else {
          data.name = "";
        }
        data.id = node.identity;
        console.log(data);
        this.$refs.ref_CJS.addEles([
          {
            group: "nodes",
            data,
            //  position: {
            //   x: parseFloat(node.properties.x),
            //   y: parseFloat(node.properties.y)
            // }
          },
        ]);
        console.log("added");
      }

      for (var e in edges) {
        var edge = edges[e];
        const data = {};
        if (edge.properties) {
          for (var keyE in edge.properties) {
            if (keyE !== "type") {
              data[keyE] = edge.properties[keyE];
            }
          }
        }
        data.id = edge.identity;
        data.source = edge.start;
        data.target = edge.end;
        data.name = edge.type;
        this.$refs.ref_CJS.addEles([
          {
            group: "edges",
            data,
          },
        ]);
      }
      this.$refs.ref_CJS.$cy
        .layout({
          name: "cose",
          randomize: false,
          animate: true,
        })
        .run();
      }else{
        this.reloadGraph()
        this.resize()
      }
    },
    // 保存位置信息
    saveGraph() {
      this.set_isInit(true)
      var nodesCollection = this.$refs.ref_CJS.$cy.filter(function (e, i) {
        return e.isNode();
      });
      // var nodes={}
      // var test1=/^[0-9]+$/
      // for(var item in nodesCollection){
      //   // console.log(nodesCollection[item])
      //   console.log(nodesCollection[item].data().id)
      //   if(test1.test(nodesCollection[item].data().id)){
      //     // console.log("t")
      //     console.log(nodesCollection[item].data().id)
      //     nodes[item]=nodesCollection[item]
      //   }
      // }
      // console.log(nodesCollection)
      // console.log(nodes)
      this.updateNodePos(nodesCollection);
    },
  }
}

</script>

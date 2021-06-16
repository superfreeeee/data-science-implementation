<style src="../assets/style/Home.css"></style>
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider v-model="collapsed"  collapsible width = 350 >
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']"  mode="inline">
        <a-menu-item key="1" @click="newDrawer">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-sub-menu>
          <span slot="title"><a-icon type="user" /><span>所有节点</span></span>
            <a-sub-menu  v-for='(value, key) in nodeList' :key="key"  >
              <span slot="title"><a-icon type="user" /><span>{{key}}</span></span>
              <a-sub-menu  v-for='(value1, key1) in value' :key="key+key1"  >
                <span slot="title"><a-icon type="user" /><span>{{key1}}</span></span>
                  <a-menu-item v-for='(item, index) in value1' :key="key+key1+item" >
                    {{item}}
                  </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
        </a-sub-menu>
        <a-menu-item key="8">
          <a-icon type="desktop" />
          <span>Option 8</span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Team</span></span>
          <a-menu-item key="9">
            Team 1
          </a-menu-item>
          <a-menu-item key="10">
            Team 2
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <!-- 顶部搜索框 -->
        <div style="padding: 16px 24px; height: 70px; background-color: white; border-bottom:1px groove">
          <a-input-search placeholder="input search text" style="width: 60%; margin-left: 5.5%;"  />
        </div>

        <div :style="{ padding: '24px', minHeight: '360px' }">
          <div style="height: 100%; width: 100%;">
            <!-- 画布 -->
            
            <div class="navigatorAboveDrawer">
          <div class="mytab" v-for="item in graphIndexList" :key="item" @click="changeGraph(item)" v-bind:class="{ active1: arrIndex.indexOf(item) > -1 }">
           <span class="tabTitle" v-bind:class="{ active2: arrIndex.indexOf(item) > -1 }">graph {{graphIndexList.indexOf(item)}}</span> <a-icon type="close" v-bind:class="{ active3: arrIndex.indexOf(item) > -1 }" @click="closeGraph(item)"/>
          </div>
          <a-divider style="margin:0;padding:0"/>
              <a-form
                layout="inline"
                :form="form"
                @submit="search"
              >
                <a-row :gutter="24">
                  <a-col :md="0" :sm="0" :lg="2"></a-col>
                  <a-col :md="16" :sm="16" :lg="16" >
                    <div style = "display: flex; align-items: center;">
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
                      <a-form-item>
                        <a-input
                          v-decorator="['searchValue',
                        {rules: [{ required: false, message: '请输入搜索值' }]}
                        ]"
                          placeholder="请输入"/>
                      </a-form-item>
                      <a-button html-type="submit">查询</a-button>
                      <a-button style="margin-left: 10px" @click="reset">重置</a-button>
                    </div>
                  </a-col>
                  <a-col :md="2" :sm="2" :lg="0"></a-col>
                  <a-col :md="6" :sm="6" :lg="6">
                    <div style = "display: flex; align-items: center;">
                      <a-button @click="filterByNodeLabels()" style="font-size: 16px; color: black;background-color:transparent;border:0px">
                        类型过滤
                      </a-button>
                      <a-dropdown style="margin-left: 20px">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()"
                            style="font-size: 16px; color: black">
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
                    </div>
                  </a-col>
                </a-row>
              </a-form>
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

            <!-- list画布 -->
            <Drawer ref="ref_CJS" @reloadGraph="reloadGraph">
            </Drawer>
            <!-- 智能问答 -->
            <Question class = "Int_question"></Question>
            <div class="propertyDisplay">
              <span id="labels"></span>
              <pre id="properties"> click on the node or edge to display more infomation!</pre>
            </div>
            <Setting @listenToSet='getSetting'></Setting>
            <GraphDetails></GraphDetails>
            <History></History>
            <FilterByNodeLabels @listenToChild='getChildData'></FilterByNodeLabels>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Drawer from "../components/knowledgeGraph";
import Setting from "../components/setting";
import GraphDetails from "../components/graphDetails";
import History from "../components/history";
import FilterByNodeLabels from "../components/nodeLabelsFiltering";
import Question from "../components/question";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      collapsed: true,
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
      nodeList: {
        开心: { A: ["1", "2"], B: ["1", "2"] },
        快乐: { A: ["1", "2"], B: ["1", "2", "3"] },
      },
      // graphIndexList:[0,1],
      arrIndex:[0]
    };
  },
  components: {
    Drawer,
    Setting,
    GraphDetails,
    History,
    FilterByNodeLabels,
    Question,
  },
  async beforeMount(){
    // var that=this
    await this.getGraph()
  },
  computed: {
    ...mapGetters(["settingVisible", "settingList", "historyVisible","graphIndexList"]),
  },
  methods: {
    ...mapMutations([
      "set_settingVisible",
      "set_graphDetailsVisible",
      "set_historyVisible",
      "set_filterByNodeLabelsVisible",
      "set_isInit",
      "set_currentIndex",
      "set_graphIndexList",
      "set_graphNumber"
    ]),
    ...mapActions(["getGraphDetailsList", "getHistoryList", "updateNodePos","getGraph",]),
    // 放大
    magnifying() {
      console.log(this);
      this.$refs.ref_CJS.magnifying();
    },
    // 缩小
    contractible() {
      this.$refs.ref_CJS.contractible();
    },
    // 合适大小
    resize() {
      this.$refs.ref_CJS.resize();
    },
    // 高亮
    highlight() {
      this.$refs.ref_CJS.highlight();
    },
    // 导出xml
    downloadXml() {
      this.$refs.ref_CJS.downloadXml();
    },
    // 导出图片
    exportPng() {
      this.$refs.ref_CJS.exportPng();
    },
    // 刷新布局
    refresh(name) {
      this.$refs.ref_CJS.refresh(name);
    },
    // 设置节点属性
    async setting() {
      await this.set_settingVisible(true);
    },
    getSetting(settingData) {
      console.log(settingData);
      this.$refs.ref_CJS.$cy
        .style()
        .selector("node")
        .style({
          "font-size": settingData.textSize + "pt",
          width: settingData.nodeSize + settingData.widthE + "pt",
          height: settingData.nodeSize + "pt",
          shape: settingData.shape,
        })
        .update();
      var edgeFont = "10px";
      if (!settingData.lableVisible) {
        edgeFont = "0px";
      }
      this.$refs.ref_CJS.$cy
        .style()
        .selector("edge")
        .style({
          "font-size": edgeFont,
        })
        .update();
      this.$refs.ref_CJS.$cy
        .style()
        .selector(".eh-handle")
        .style({
          "background-color": "#fce9cc",
          width: 10,
          height: 10,
          shape: "ellipse",
          "overlay-opacity": 0,
          "border-width": 12, // makes the handle easier to hit
          "border-opacity": 0,
        })
        .update();
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
    onClick({ key }) {
      console.log(`Click on item ${key}`);
    },
    // 重新加载图片
    async reloadGraph() {
      await this.$refs.ref_CJS.getGraphList();
      console.log("hhh", this.$store.getters.isInit);
      this.$refs.ref_CJS.$cy.fit();
    },
    // 节点过滤
    filterByNodeLabels() {
      this.getGraphDetailsList();
      this.set_filterByNodeLabelsVisible(true);
    },
    getChildData(graph, isReset) {
      console.log("filter", graph);
      console.log("重新加载", isReset);
      this.$refs.ref_CJS.$cy.elements().remove();
      if (!isReset) {
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
      } else {
        this.reloadGraph();
        this.resize();
      }
    },
    // 保存位置信息
    saveGraph() {
      this.set_isInit(true);
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
          this.queryParam = {
            searchType: values.searchType,
            searchValue: values.searchValue,
          };
        }
        this.refresh();
      });
    },
    newDrawer() {
      this.collapsed = false;
    },

    async closeGraph(item){
      var list=this.$store.getters.graphIndexList
      console.log("len",list.length)
      if(list.length==1){
        // 只有一张图不能删除
        console.log(this.document)
        alert("can't be delete!There is only one graph")
      }else{
        // 将Index从currentIndex中删除
        var index=list.indexOf(item)
        list.splice(index,1)
        this.set_graphIndexList(list)
        // 更改当前的currentIndex
        if(index==0){
          index=imdex+1
        }else{
          index=index-1
        }
      var currentIndex=list[index]
      this.set_currentIndex(currentIndex)
      this.$refs.ref_CJS.getGraphList()
      // 图数量减一
      var num=this.$store.getters.graphNumber
      num=num-1
      this.set_graphNumber(num)
      // await this.removeGraph(item)
      }
    },

    changeGraph(item){
      console.log("item",item)
      let arrIndex = this.arrIndex.indexOf(item);
      if (arrIndex <= -1) {
        // 未选中,点击选中
        this.arrIndex=[]
        this.arrIndex.push(item);
      }
      this.set_currentIndex(item)
      this.$refs.ref_CJS.getGraphList()
    }
  },
};
</script>

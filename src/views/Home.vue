<style src="../assets/style/Home.css"></style>
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible width="350">
      <div class="logo">
        <img src="../assets/Logo.jpg" width="60px" />
      </div>
      <HomeMenu
        ref="home_menu_ref"
        :nodeList="nodeList"
        :menuChange="menuChange"
        :addGraph="addGraph"
      />
    </a-layout-sider>
    <a-layout>
      <!-- 主页面 -->
      <a-layout-content v-show="isHome">
        <!-- Header -->
        <div
          style="
            padding: 16px 24px;
            height: 70px;
            background-color: white;
            border-bottom: 1px groove;
          "
        >
          <div style="font-size: 16px; font-weight: 600; margin-left: 5.5%">
            搜索节点：
            <a-select
              style="width: 60%"
              show-search
              placeholder="Select a node"
              option-filter-prop="children"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChangeS"
            >
              <a-select-option
                v-for="(value, key) in searchNodeList"
                :key="value"
              >
                {{ key }}
              </a-select-option>
            </a-select>
            <a-icon style="margin-left: 20px" type="radar-chart" />
          </div>
        </div>
        <!-- Main -->
        <div :style="{ padding: '24px', minHeight: '360px' }">
          <div style="height: 100%; width: 100%">
            <!-- tab -->
            <div
              class="outer-container"
              style="
                overflow: auto;
                margin-left: 5.5%;
                width: 80%;
                margin-top: 20px;
              "
            >
              <div class="inner-container">
                <!-- upload button -->
                <a-upload
                  accept=".doc,.docx,text/plain"
                  :customRequest="() => {}"
                  :show-upload-list="false"
                  @change="uploadFileToGraph"
                  style="display: inline-block"
                >
                  <a-button type="primary" class="upload-btn">
                    <a-icon type="upload" />
                    上传案例
                  </a-button>
                </a-upload>
                <!-- tabs -->
                <div class="tabs" ref="home_main_tabs">
                  <div
                    class="mytab"
                    v-for="item in graphIndexList"
                    :key="item"
                    @click="changeGraph(item)"
                    :class="{ active1: isTabActive(item) }"
                    style="align-items: center"
                  >
                    <span
                      class="tabTitle"
                      v-bind:class="{ active2: isTabActive(item) }"
                      style="padding: 5px"
                      >graph {{ graphIndexList.indexOf(item) }}</span
                    >
                    <a-icon
                      class="closeIcon"
                      type="close"
                      v-bind:class="{ active3: isTabActive(item) }"
                      @click="closeGraph(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <a-divider style="margin: 0 0 0 5.5%; width: 80%; padding: 0" />
            <!-- 画布上方导航栏 -->
            <div class="navigatorAboveDrawer">
              <a-row :gutter="24">
                <a-col :md="0" :sm="0" :lg="1"></a-col>
                <MySearch @listenToMySearch="getSearchResult"></MySearch>
                <a-col :md="2" :sm="2" :lg="0"></a-col>
                <a-col :md="6" :sm="6" :lg="6">
                  <div style="display: flex; align-items: center">
                    <a-button
                      @click="filterByNodeLabels()"
                      style="
                        font-size: 16px;
                        font-family: 'Microsoft YaHei';
                        font-weigth: 400;
                        color: black;
                        background-color: transparent;
                        border: 0px;
                      "
                    >
                      类型过滤
                    </a-button>
                    <a-dropdown style="margin-left: 20px">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font: 16px 'Microsoft YaHei'; color: black"
                      >
                        调整布局 <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay" @click="onClick">
                        <a-menu-item key="1" @click="refresh({ name: 'cose' })"
                          ><a-icon title="刷新布局" type="sync" />刷新布局
                        </a-menu-item>
                        <a-menu-item
                          key="2"
                          @click="refresh({ name: 'fcose' })"
                        >
                          <a-icon type="global" />力导图模式
                        </a-menu-item>
                        <a-menu-item key="3" @click="refresh({ name: 'klay' })">
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
            </div>
            <!-- 右侧导航栏 -->
            <div class="cytoolbar_id">
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="plus-circle"
                    style="font-size: 25px; cursor: pointer"
                    title="放大"
                    @click="magnifying()"
                  />
                </div>
              </div>
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="minus-circle"
                    style="font-size: 25px; cursor: pointer"
                    title="缩小"
                    @click="contractible()"
                  />
                </div>
              </div>
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="fullscreen"
                    style="font-size: 25px; cursor: pointer"
                    title="合适大小"
                    @click="resize()"
                  />
                </div>
              </div>
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="highlight"
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
                    style="font-size: 25px; cursor: pointer"
                    title="xml下载"
                    @click="downloadXml()"
                  />
                </div>
              </div>
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="camera"
                    style="font-size: 25px; cursor: pointer"
                    title="全图导出"
                    @click="exportPng()"
                  />
                </div>
              </div>
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="history"
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
              <div class="tools">
                <div class="center-center">
                  <a-icon
                    type="file-add"
                    style="font-size: 25px; cursor: pointer"
                    title="上传文件"
                    @click="uploadFile()"
                  />
                </div>
              </div>
            </div>
            <!-- 画布 -->
            <Drawer ref="ref_CJS" @reloadGraph="reloadGraph"> </Drawer>
            <!-- 智能问答 -->
            <Question class="Int_question"></Question>
            <div class="propertyDisplay">
              <span id="labels"></span>
              <pre id="properties">
                click on the node or edge to display more infomation!
              </pre>
              <div class="scrollbar"></div>
            </div>
            <!-- 设置 -->
            <Setting @listenToSet="getSetting"></Setting>
            <GraphDetails></GraphDetails>
            <History></History>
            <FilterByNodeLabels
              @listenToChild="getChildData"
            ></FilterByNodeLabels>
            <UploadFile></UploadFile>
          </div>
        </div>
      </a-layout-content>
      <!-- 语义搜索页面 -->
      <a-layout-content v-show="isQA">
        <!-- <semanticsS></semanticsS> -->
        <QAService />
      </a-layout-content>
      <!-- 自动构建页面 -->
      <a-layout-content v-show="isRecommend">
        <RecommendService
          :createGraphFromFile="createGraphFromFile"
          :checkNewGraph="checkNewGraph"
        />
      </a-layout-content>
      <a-layout-content v-show="isAutomaticBuilding">
        <AutomaticBuilding></AutomaticBuilding>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Created by Trillion Coin
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import Drawer from '../components/knowledgeGraph';
import Setting from '../components/setting';
import SemanticsS from '../views/SemanticsS';
import GraphDetails from '../components/graphDetails';
import History from '../components/history';
import FilterByNodeLabels from '../components/nodeLabelsFiltering';
import Question from '../components/Question';
import MySearch from '../components/mySearch';
import UploadFile from '../components/file';
import AutomaticBuilding from './AutomaticBuilding';
import { getNodesListAPI, getSearchNodeListAPI } from '../api/api';

import HomeMenu from '@/components/HomeMenu';
import QAService from '@/views/QAService';
import RecommendService from '@/views/RecommendService';
import { MenuItemKeys } from '@/common/config';
import { autoScrollDown } from '@/utils/dom.js';

export default {
  components: {
    Drawer,
    Setting,
    GraphDetails,
    History,
    FilterByNodeLabels,
    Question,
    SemanticsS,
    MySearch,
    UploadFile,
    AutomaticBuilding,
    // new
    HomeMenu,
    QAService,
    RecommendService,
  },
  data() {
    return {
      // constant
      MenuItemKeys,
      formLayout: 'horizontal',
      // tab value
      isHome: true,
      isQA: false,
      isRecommend: false,
      isAutomaticBuilding: false,
      // variable data
      collapsed: true,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      nodeList: {},
      searchNodeList: [],
      // graphIndexList:[0,1],
      arrIndex: [0],
    };
  },
  async mounted() {
    await Promise.all([this.getNodeList(), this.getSearchNodeList()]);
  },
  async beforeMount() {
    await this.getGraph();
    // console.log('list', this.graphIndexList)
  },
  computed: {
    ...mapGetters([
      'settingVisible',
      'settingList',
      'historyVisible',
      'isInitList',
      'allGraphList',
      'graphIndexList',
      'currentIndex',
    ]),
  },
  methods: {
    ...mapMutations([
      'set_settingVisible',
      'set_graphDetailsVisible',
      'set_historyVisible',
      'set_filterByNodeLabelsVisible',
      'set_isInit',
      'set_currentIndex',
      'set_graphIndexList',
      'set_graphNumber',
      'set_uploadFormVisible',
      'set_isInitList',
      'set_allGraphList',
    ]),
    ...mapActions([
      'getGraphDetailsList',
      'getHistoryList',
      'updateNodePos',
      'getGraph',
      'getNewGraph',
      'getLabelsByGraphId',
      'removeGraph',
      'getNewGraphByFile',
    ]),
    // 放大
    magnifying() {
      // console.log(this);
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
      // console.log(settingData);
      this.$refs.ref_CJS.$cy
        .style()
        .selector('node')
        .style({
          'font-size': settingData.textSize + 'pt',
          width: settingData.nodeSize + settingData.widthE + 'pt',
          height: settingData.nodeSize + 'pt',
          shape: settingData.shape,
        })
        .update();
      var edgeFont = '10px';
      if (!settingData.lableVisible) {
        edgeFont = '0px';
      }
      this.$refs.ref_CJS.$cy
        .style()
        .selector('edge')
        .style({
          'font-size': edgeFont,
        })
        .update();
      this.$refs.ref_CJS.$cy
        .style()
        .selector('.eh-handle')
        .style({
          'background-color': '#fce9cc',
          width: 10,
          height: 10,
          shape: 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0,
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
      // console.log(`Click on item ${key}`);
    },
    // 重新加载图片
    async reloadGraph() {
      await this.$refs.ref_CJS.getGraphList();
      // console.log("hhh", this.$store.getters.isInit);
      this.$refs.ref_CJS.$cy.fit();
    },
    // 节点过滤
    filterByNodeLabels() {
      this.getLabelsByGraphId();
      this.set_filterByNodeLabelsVisible(true);
    },
    getChildData(graph, isReset) {
      // console.log("filter", graph);
      // console.log("重新加载", isReset);
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
            data.name = '';
          }
          data.id = node.identity;
          // console.log(data);
          this.$refs.ref_CJS.addEles([
            {
              group: 'nodes',
              data,
              //  position: {
              //   x: parseFloat(node.properties.x),
              //   y: parseFloat(node.properties.y)
              // }
            },
          ]);
          // console.log("added");
        }

        for (var e in edges) {
          var edge = edges[e];
          const data = {};
          if (edge.properties) {
            for (var keyE in edge.properties) {
              if (keyE !== 'type') {
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
              group: 'edges',
              data,
            },
          ]);
        }
        this.$refs.ref_CJS.$cy
          .layout({
            name: 'cose',
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
      var idx = this.$store.getters.currentIndex;
      var isInit = this.$store.getters.isInitList;
      isInit[idx] = true;
      this.set_isInitList(isInit);
      var nodesCollection = this.$refs.ref_CJS.$cy.filter(function (e, i) {
        return e.isNode();
      });
      this.updateNodePos(nodesCollection);
    },
    newDrawer() {
      if (this.collapsed) {
        this.collapsed = false;
      } else {
        this.collapsed = true;
      }
    },
    async addGraph(item) {
      this.menuChange(MenuItemKeys.HOME);
      await this.getNewGraph(item);
      this.switchTab(this.$store.getters.currentIndex);
      console.log('[addGraph] arrIndex', this.arrIndex);
      this.$refs.ref_CJS.getGraphList();
    },
    // 上传文件并创建图谱
    uploadFileToGraph(e) {
      console.log('[uploadFileToGraph] e =', e);
      const file = e.file.originFileObj;
      this.createGraphFromFile(file);
    },
    // 从文件创建新图谱
    async createGraphFromFile(file) {
      if (file) {
        if (!this.isHome) {
          this.menuChange(MenuItemKeys.HOME);
        }
        await this.getNewGraphByFile(file);
        this.switchTab(this.$store.getters.currentIndex);
        this.$nextTick(() => {
          autoScrollDown(this.$refs.home_main_tabs, true);
        });
        this.$refs.ref_CJS.getGraphList();
      }
    },
    async handleChangeS(value) {
      await this.getNewGraph(value);
      this.switchTab(this.$store.getters.currentIndex);
      console.log('[handleChangeS] arrIndex', this.arrIndex);
      this.$refs.ref_CJS.getGraphList();
    },
    handleBlur() {
      // console.log("blur");
    },
    handleFocus() {
      // console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 页面切换
    menuChange(item) {
      console.log(`[menuChange] switch to ${item}`);
      this.isHome = item === MenuItemKeys.HOME;
      this.isQA = item === MenuItemKeys.QA;
      this.isRecommend = item === MenuItemKeys.RECOMMEND;
      this.isAutomaticBuilding = item === MenuItemKeys.AUTO_BUILDING;
      this.$refs.home_menu_ref.switchMenuKey(item);
    },
    checkNewGraph() {
      this.menuChange(MenuItemKeys.HOME);
      this.switchTab(this.$store.getters.currentIndex);
      this.$nextTick(() => {
        autoScrollDown(this.$refs.home_main_tabs, true);
      });
    },
    switchTab(index) {
      this.arrIndex = [index];
    },
    async getNodeList() {
      await getNodesListAPI()
        .then((res) => {
          console.log('nodelist', res.content);
          this.nodeList = { ...res.content };
        })
        .catch((err) => console.log(err));
    },
    async getSearchNodeList() {
      await getSearchNodeListAPI()
        .then((res) => {
          this.searchNodeList = res.content;
        })
        .catch((err) => console.log(err));
    },
    // 删除图
    async closeGraph(item) {
      await this.removeGraph(item);
      var list = this.$store.getters.graphIndexList;
      if (list.length == 1) {
        // 只有一张图不能删除
        alert("can't be delete!There is only one graph");
      } else {
        // 将Index从graphIndexList中删除
        var index = list.indexOf(item);
        list.splice(index, 1);
        this.set_graphIndexList(list);
        // 更改当前的currentIndex,加入arrIndex中
        if (index == 0) {
          index = index + 1;
        } else {
          index = index - 1;
        }
        var currentIndex = list[index];
        this.set_currentIndex(currentIndex);
        this.switchTab(currentIndex);
        // 展示前一张图
        this.$refs.ref_CJS.getGraphList();
        // 图的数量减一
        var num = this.$store.getters.graphNumber;
        num = num - 1;
        this.set_graphNumber(num);
        // 将这张图从allGraphList中删除，是否初始化从isInitList中删除
        var allGraphs = this.$store.getters.allGraphList;
        delete allGraphs.item;
        var isInitList = this.$store.getters.isInitList;
        delete isInitList.item;
        this.set_allGraphList(allGraphs);
        this.set_isInitList(isInitList);
      }
    },
    // 切换图
    changeGraph(item) {
      let arrIndex = this.arrIndex.indexOf(item);
      if (arrIndex <= -1) {
        // 未选中,点击选中
        this.arrIndex = [];
        this.arrIndex.push(item);
      }
      this.set_currentIndex(item);
      this.$refs.ref_CJS.getGraphList();
    },
    // 模糊搜索结果高亮
    getSearchResult(idList) {
      this.$refs.ref_CJS.$cy.elements().addClass('light-off');
      for (var key in idList) {
        var id = idList[key];
        this.$refs.ref_CJS.$cy.startBatch();
        this.$refs.ref_CJS.$cy.batch(() => {
          const elements = (
            Array.isArray
              ? Array.isArray(id)
              : id != null && id instanceof Array
          )
            ? id
            : [id];
          elements.forEach((__) => {
            this.$refs.ref_CJS.$cy.getElementById(__).removeClass('light-off');
            //   this.$cy.getElementById(__).neighborhood().removeClass('light-off')
          });
        });
        this.$refs.ref_CJS.$cy.once('click', () =>
          this.$refs.ref_CJS.$cy.elements().removeClass('light-off')
        );
        this.$refs.ref_CJS.$cy.endBatch();
      }
    },
    uploadFile() {
      this.set_uploadFormVisible(true);
    },
    isTabActive(item) {
      return this.arrIndex.indexOf(item) > -1;
    },
  },
};
</script>

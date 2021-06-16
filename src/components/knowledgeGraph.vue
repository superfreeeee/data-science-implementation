<style src="../assets/style/knowledgeGraph.css"></style>

<template>
<!-- <div> -->
  <div class="drawer"> 
    
    <div id="cytoscape_id"></div>
    <!-- <a-spin v-if="loading" class="demo-loading" /> -->
    <addEdge :sourceId=this.from :targetId=this.to @listenToAddedEdge='getEdgeData'></addEdge>
    <modifyEdge :edge=this.edgeData @listenToModifiedEdge="getModifiedEdge"></modifyEdge>
    <addNode :posX=this.posX :posY=this.posY @listenToAddedNode="getNodeData"></addNode>
    <modifyNode :node=this.nodeData @listenToModifiedNode="getModifiedNode"></modifyNode>
  </div>
  <!-- <div >
    <div id="cytoscape_id1" style="height: 150px;
    width:950px;margin-top:10px;margin-left: 5.5%;
    /* margin-right: 20%; */
    padding-top: 30px;
    z-index: 1;
    background-color: white;
    border: 1.5px solid;
    border-radius:0px 0px 15px 15px;
    border-style: outset;
    padding: 1px;"></div>
  </div>
</div> -->
</template>

<script>
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";
import contextMenus from 'cytoscape-context-menus';
import {DownloadXmlAPI} from "../api/api"
import {mapGetters,mapActions,mapMutations} from 'vuex'
import addEdge from "../components/addEdge"
import modifyEdge from "../components/edgeModifying"
import fcose from "cytoscape-fcose"
import klay from "cytoscape-klay"
import addNode from '../components/addNode'
import modifyNode from '../components/nodeModifying'

export default {
  name: "Drawer",
  beforeCreate() {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy();
    delete this.$cy;
  },
  beforeDestroy() {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy();
    delete this.$cy;
  },
  watch: {
         ...mapGetters(["graphList","isInit","currentIndex","allGraphList"])
  },
  props: {},
  components:{
    addEdge,
    modifyEdge,
    addNode,
    modifyNode
  },
  computed:{
  },
  mounted(){
    cytoscape.use(cxtmenu)
    cytoscape.use(edgehandles)
    cytoscape.use(fcose)
    cytoscape.use(klay)
    cytoscape.use(contextMenus)
    this.$cy=cytoscape({
      container: document.getElementById('cytoscape_id'),
      // 一个指定布局选项的普通对象.
      userZoomingEnabled: true, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
      boxSelectionEnabled: false,
      
    })
    this.getGraphList()
    // this.$cy=[cytoscape({container: document.getElementById('cytoscape_id'),userZoomingEnabled: false, boxSelectionEnabled: false,}),
    // cytoscape({container: document.getElementById('cytoscape_id1'),userZoomingEnabled: false, boxSelectionEnabled: false,})
    // ]
    // 拖拽添加边
    const eh = this.$cy.edgehandles({ preview: false })
    eh.enable()
    var that = this
    // 拖动添加边
    this.$cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
      that.$cy.getElementById(addedEles.data().id).remove()
      that.addEdges([sourceNode.data().id], [targetNode.data().id])
    })
    // 鼠标移动到节点上显示属性
    this.$cy.on('mousemove', 'node', function (e) {
      var list = e.target.data();
      var listStr = JSON.stringify(list);
      if (list.labels == "") {
        document.getElementById("labels").innerHTML ="\xa0\xa0name:" + list.name + "\xa0\xa0";
      } else {
        document.getElementById("labels").innerHTML ="\xa0\xa0labels:" + list.labels + "\xa0\xa0";
      }
      var value = ""
        var not_list = ["labels", "id", "name", "x", "y"]
        for(var item in list){
          if(!not_list.includes(item)){
            value += item + ": " + list[item] + "\n"
          }
        }
      document.getElementById("properties").innerHTML = value;
    });
    // 鼠标移动到边上显示属性
    this.$cy.on('mouseover', 'edge', function (e) {
      var list = e.target.data()
      var listStr = JSON.stringify(list)
      document.getElementById('labels').innerHTML = '\xa0\xa0' + list.name + '\xa0\xa0'
      document.getElementById('properties').innerHTML = listStr
    })
    // 鼠标点击节点或边显示属性
    this.$cy.on('click',function (e) {
      // console.log(JSON.stringify(e.target.data()))
      if (JSON.stringify(e.target.data()) === '{}') {
        that._data.labels = ''
        that._data.properties = ' click on the node or edge to display more infomation!'
        document.getElementById('labels').innerHTML = ''
        document.getElementById('properties').innerHTML = ' click on the node or edge to display more infomation!'
      } else {
        that._data.isClick = true;
        var list = e.target.data();
        var listStr = JSON.stringify(list);
        if(e.target.isEdge()){
           document.getElementById('labels').innerHTML = '\xa0\xa0' + list.name + '\xa0\xa0'
           that._data.labels="\xa0\xa0name:" + list.name + "\xa0\xa0";
        }else{
        if (list.labels == "") {
          document.getElementById("labels").innerHTML ="\xa0\xa0name:" + list.name + "\xa0\xa0";
            that._data.labels = "\xa0\xa0name:" + list.name + "\xa0\xa0";
        } else {
          document.getElementById("labels").innerHTML ="\xa0\xa0labels:" + list.labels + "\xa0\xa0";
            that._data.labels = "\xa0\xa0labels:" + list.labels + "\xa0\xa0";
        }
        }
        var value = ""
        var not_list = ["labels", "id", "name", "x", "y"]
        for(var item in list){
          if(!not_list.includes(item)){
            value += item + ": " + list[item] + "\n"
          }
        }
        document.getElementById("properties").innerHTML = value;
        that._data.properties = value;
      }
    });
    // 鼠标移开不显示
    this.$cy.on("mouseout", function () {
      // console.log(this.data().isClick)
      if (!that._data.isClick) {
        document.getElementById("labels").innerHTML = "";
        document.getElementById("properties").innerHTML =
          " click on the node or edge to display more infomation!";
      } else {
        document.getElementById("labels").innerHTML = that._data.labels;
        document.getElementById("properties").innerHTML = that._data.properties;
      }
    });
    // Cxtmenu圆形菜单--节点
    this.$cy.cxtmenu({
      menuRadius: 80, // the radius of the circular menu in pixels
      selector: "node",
      commands: (element) => {
        return [
          {
            fillColor: "rgba(200, 200, 200, 0.75)", // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">删除节点</span>', // html/text content to be displayed in the menu
            select: (ele) => this.removeNode([ele.id()]),
            enabled: true, 
          },
          {
            content: "高亮邻居", 
            select: (ele) => this.lightOn([ele.id()]), // a function to execute when the command is selected
            enabled: true, // whether the command is selectable
          },
          {
            content: "修改", // html/text content to be displayed in the menu
            select: (ele) => this.modifyNode(ele.data()), // a function to execute when the command is selected
            enabled: true, // whether the command is selectable
          },
        ];
      },
      activePadding: 10, // additional size in pixels for the active command
      indicatorSize: 14, // the size in pixels of the pointer to the active command
      separatorWidth: 4, // 连续命令之间的空白间隔(以像素为单位)
      spotlightPadding: 10, // 元素和聚光灯之间的额外间距(以像素为单位)
      minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
      openMenuEvents: "cxttapstart taphold", // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: "white", // 各指令元素内字体颜色
      itemTextShadowColor: "red", // 各指令元素内字体阴影颜色
    })
     // 边删除、修改
    this.$cy.cxtmenu({
      menuRadius: 40, // the radius of the circular menu in pixels
      selector: "edge", // elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: (element) => {
        return [
          {
            fillColor: "rgba(200, 200, 200, 0.75)", // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">删除</span>', // html/text content to be displayed in the menu
            select: (ele) => this.removeEdge([ele.id()]),
            enabled: true, // whether the command is selectable
          },
          {
            fillColor: "rgba(200, 200, 200, 0.75)", // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">修改</span>', // html/text content to be displayed in the menu
            select: (ele) =>this.modifyEdge(ele.data()),
            enabled: true, // whether the command is selectable
          },
        ];
      },
      activePadding: 10, // additional size in pixels for the active command
      indicatorSize: 14, // the size in pixels of the pointer to the active command
      separatorWidth: 4, // 连续命令之间的空白间隔(以像素为单位)
      spotlightPadding: 10, // 元素和聚光灯之间的额外间距(以像素为单位)
      minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
      openMenuEvents: "cxttapstart taphold", // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: "white", // 各指令元素内字体颜色
      itemTextShadowColor: "red", // 各指令元素内字体阴影颜色
    });
    let options={
      evtType: 'cxttap',
      menuItems: [
        {
        id: 'add-node',
        content: 'add node',
        tooltipText: 'node',
        selector: 'node',
        coreAsWell: true,
        onClickFunction: function (e) {
          console.log(e.position.x)
          that._data.posX=e.position.x
          that._data.posY=e.position.y
          that.addNode()
        }
      }
      ]
    };
    this.$cy.contextMenus(options)
    // 通用的样式
    this.$cy.style()
    /* 未选择节点样式 */
      .selector('node')
      .style({
        // content: 'data(id)',
        'pie-size': '100%',
        'text-valign': 'center',
        'text-halign': 'center',
        label: 'data(name)',
        'font-size': '15pt',
        width: '50pt',
        height: '50pt',
        'background-color': '#fce9cc',
      })
      /* 已选择节点样式 */
      .selector("node:selected")
      .style({ "border-color": "#c84e40", "border-width": "1px"})
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
      /* 拖拽添加边样式*/
      .selector(".eh-handle")
      .style({
        "background-color": "#fce9cc",
        width: 12,
        height: 12,
        shape: "ellipse",
        "overlay-opacity": 0,
        "border-width": 12, // makes the handle easier to hit
        "border-opacity": 0,
      })
      .selector(".0")
      .style({'background-color': '#fce9cc'})
      .selector(".1")
      .style({'background-color': '#aeeaf5'})
      .selector(".2")
      .style({'background-color': '#FFC0CB'})
      .selector(".3")
      .style({'background-color': '#FFF8DC'})
      .selector(".4")
      .style({'background-color': '#FFFACD'})
      .selector(".5")
      .style({'background-color': '#48D1CC'})
      .selector(".6")
      .style({'background-color': '#B0E0E6'});

  },
  data(){
    return{
      from:"",//增加边时起始节点
      to:"",//增加边时结束节点
      isClick: false,//显示属性时
      labels: '',
      properties: '',
      edgeData:{},//修改边时
      posX:"",//保存布局
      posY:"",
      // 修改节点时
      nodeData: {
        identity: '',
        labels: [], // 标签
        properties: {
          name: ''
          // 属性（键值对）
        }
      },
      node_properties:[]
    }
  },
  methods:{
    ...mapActions(["getGraph","removeNodes","removeEdges"]),
    ...mapMutations(["set_addEdgeFormVisible","set_modifyEdgeFormVisible","set_edgeId","set_nodeId","set_addNodeFormVisible","set_modifyNodeFormVisible","set_nodeProperties"]),
    // 添加元素
    addEles(eles) {
      // console.log(eles)
      if (eles) {
        this.$cy.startBatch();
        this.$cy.batch(() => {
          const elements = ((Array.isArray ? Array.isArray(eles) : eles != null && eles instanceof Array) ? eles : [eles])
          const filterElements = elements.filter(__ => !this.$cy.getElementById(__.data.id).length)
          this.$cy.add(filterElements)
        })
        this.$cy.endBatch()
      }
    },
    // 删除选择的内容(可能是顶点, 也可能是关系)
     delEles() {
      this.$cy.startBatch();
      this.$cy.batch(() => {
        const selectedEles = this.$cy.elements(":selected");
        // console.log(selectedEles)
        // 未选择不进行操作
        if (!selectedEles || selectedEles.length < 1) {
          return false
        }
        selectedEles.remove()
      })
      this.$cy.endBatch()
    },
    // 缩放大小
    zoom(zoom) {
      /** 获取已选择内容 */
      const selectedEles = this.$cy.elements('node:selected')
      /** 获取已选择内容中得第一个, 没有选择为null */
      const selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null
      /** 获取画布偏移位置 */
      const pan = this.$cy.pan()
      /** 计算原点坐标 */
      const [x, y] = selectedEle ? [selectedEle.position('x'), selectedEle.position('y')] : [pan.x, pan.y]
      let level = this.$cy.zoom() + zoom;
      (level > this.$cy.maxZoom) && (level = this.$cy.maxZoom);
      (level < this.$cy.minZoom) && (level = this.$cy.minZoom)
      this.$cy.zoom({
        level: level,
        renderedPosition: {
          x: x,
          y: y
        }
      })
    },
    // 放大
    magnifying () {
      this.zoom(0.3)
    },
    // 缩小 
    contractible () {
      this.zoom(-0.3)
    },
    // 合适大小
    resize () {
      this.$cy.fit()
    },
    // 高亮
    //  @param ele 某元素ID
    lightOn(ele) {
      this.$cy.startBatch();
      this.$cy.batch(() => {
        this.$cy.elements().addClass('light-off') //* 添加样式*/
        const elements = ((Array.isArray ? Array.isArray(ele) : ele != null && ele instanceof Array) ? ele : [ele])
        elements.forEach(__ => {
          this.$cy.getElementById(__).removeClass('light-off')
          this.$cy.getElementById(__).neighborhood().removeClass('light-off')
        })
      })
      this.$cy.once('click', () => this.lightOff())
      this.$cy.endBatch()
    },
    // 取消高亮
    lightOff() {
      this.$cy.startBatch();
      this.$cy.batch(
        () => this.$cy.elements().removeClass("light-off") /* 移除样式 */
      );
      this.$cy.endBatch();
    },
    /** 高亮邻居 */
    highlight () {
      const selectedEles = this.$cy.elements('node:selected')
      /** 获取已选择内容中得第一个, 没有选择为null */
      const selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null;
      (selectedEle) && (this.lightOn(selectedEle.id()))
    },
    /**
     * 刷新布局.
     * name取值范围:
     * ['cose','fcose','klay' ]
     */
    refresh({ name = "cose", randomize = false, animate = true } = {}) {
      this.$cy
        .layout({ name: name, randomize: randomize, animate: animate,padding:0,componentSpacing: 30,nodeOverlap:10 })
        .run();
    },
    /**
     * 导出全局图片.
     */
    exportPng() {
      const blob = this.$cy.png({
        output: "blob",
        bg: "transparent",
        full: true,
        scale: 4,
        quality: 1,
      });
      const [aLink, evt] = [
        document.createElement("a"),
        document.createEvent("HTMLEvents"),
      ];
      evt.initEvent("click", true, true);
      [aLink.download, aLink.href] = [
        `${new Date().getTime()}.png`,
        URL.createObjectURL(blob),
      ];
      aLink.dispatchEvent(evt);
      aLink.click();
    },
    // 导出xml
    downloadXml () {
      DownloadXmlAPI().then(res => {
        // console.log(res)
      }).catch(err => console.log(err))
      const url = 'https://sec123.oss-cn-shanghai.aliyuncs.com/export.xml'
      const x = new XMLHttpRequest()
      const fileName = 'xml导出'
      x.open('GET', url, true)
      x.responseType = 'blob'
      x.onload = function (e) {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
      }
      x.send()
    },
    //获取图
    async getGraphList(){
      // await this.getGraph()
      var graphIndex=this.$store.getters.currentIndex
      var allGraphs=this.$store.getters.allGraphList
      var graph=allGraphs[graphIndex]
      console.log(graphIndex)
      // this.$cy.elements().remove()
      console.log(graph)
      this.addEles(graph)
      if(!(this.$store.getters.isInit)){
        this.$cy.layout({name: 'cose',randomize: false,animate: true,padding:0,componentSpacing: 30,nodeOverlap:4
      }).run()
      this.resize()
      }else{
        this.resize()
        // console.log("kg",this.$store.getters.isInit)
      }
      
    },
    //删除节点
    async removeNode(e){
      this.set_nodeId(e[0])
      this.$cy.getElementById(e).remove();
      await this.removeNodes()
      await this.getGraph()
      // console.log(this.$store.getters.graphList)
    },
    //删除边
    async removeEdge(e){
      this.set_edgeId(e[0])
      await this.removeEdges()
      this.$cy.getElementById(e).remove();
      await this.getGraph()
      // console.log(this.$store.getters.graphList)
    },
    // 添加边
    async addEdges(sourceId,endId){
      this.from=sourceId[0]
      this.to=endId[0]
      this.set_addEdgeFormVisible(true)
    },
    getEdgeData(ele){
      this.addEles(ele)
      this.$store.getters.graphList.push(ele)
      // console.log(this.$store.getters.graphList)
    },
    // 修改边
    modifyEdge(ele){
      this.edgeData=ele
      this.set_modifyEdgeFormVisible(true)
    },
    async getModifiedEdge(ele){
      this.$cy.getElementById(ele.data.id).data().name = ele.data.name
      this.$cy.getElementById(ele.data.id).remove()
      this.addEles([ele])
      await this.getGraph()
      // console.log(this.$store.getters.graphList)
    },
    // 增加节点
    addNode(){
      this.set_addNodeFormVisible(true)
    },
    getNodeData(ele){
      this.addEles(ele)
      this.$store.getters.graphList.push(ele)
      // console.log(this.$store.getters.graphList)
    },
    // 修改节点
    modifyNode(ele){
      this.nodeData.identity=ele.id
      this.nodeData.labels=ele.labels
      this.nodeData.properties.name=ele.name
      for(var item in ele){
        if(item !=="id" && item!=="labels" && item!=="name"){
          this.nodeData.properties[item]=ele[item]
          this.node_properties.push({
            title: item,
            value: ele[item]
          })
        }
      }
      this.set_nodeProperties(this.node_properties)
      this.set_modifyNodeFormVisible(true)
      this.node_properties=[]
    },
    async getModifiedNode(color,id,name,label){
         this.$cy.startBatch();
          this.$cy.batch(() => {
            this.$cy.getElementById(id).data().name = name;
            this.$cy.getElementById(id).label = label;
            if(color!==""){
            this.$cy.getElementById(id).style({"background-color":color});
            }
            this.lightOff();
          });
          this.$cy.endBatch();
          await this.getGraph()
    }
  },
};
</script>

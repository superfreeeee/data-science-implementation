<style scoped>
  .tools {
    /*display: inline-block;*/
    /*height: 45px;*/
    /*width: 45px;*/
    /*vertical-align: middle;*/
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
  }
  .tools:hover{
    background-color: #797979;
    color: white;
  }

  .center-center {
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }
  .cytoolbar_id{
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 5.5%;
    background-color: rgba(104, 104, 103, 0.6);
    position: fixed;
    height: 100%;
    overflow: auto;
    z-index: 2;
  }
  #cytoscape_id{
    height: 90%;
    margin-left: 7.5%;
    margin-right: 1%;
    z-index: 1;
    background-color: white;
    border: 1.5px solid ;
    border-radius: 15px;
    border-style: outset;
    padding: 1px;
  }
</style>

<template>
  <!--  整体-->
  <div style="position: relative; height: 100%; width: 100%; z-index: 0;">
    <!--    顶部导航栏-->
    <div class="cytoolbar_id" >
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="放大" type="ios-add-circle-outline" color="white" @click="magnifying()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="缩小" type="ios-remove-circle-outline" color="white" @click="contractible()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="合适大小" type="ios-resize" color="white" @click="resize()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="高亮邻居" type="ios-color-wand-outline" color="white" @click="highlight()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="刷新布局" type="ios-sync" color="white" @click="refresh({name: 'cola'})"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="网格布局" type="ios-apps-outline" color="white" @click="refresh({name: 'grid'})"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="环形布局" type="ios-globe-outline" color="white" @click="refresh({name: 'circle'})"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <a-icon type="download"  style="font-size: 32px; cursor: pointer; color: white" title="xml下载" color="white" @click="downloadXml()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="全图导出" type="ios-reverse-camera-outline" color="white" @click="exportPng()"/>
        </div>
      </div>
    </div>
    <!--    知识图谱-->
    <div id="cytoscape_id"></div>
    <a-modal :visible="modifyEdgeFormVisible" title="修改边" @cancel="cancelModifyEdge" @ok="modifyEdge">
      <a-form :form="modifyEdgeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="name">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the node!' }] }]"
          />
        </a-form-item>
        <!--        <a-form-item label="sourceNode">-->
        <!--          <a-input-->
        <!--            v-decorator="['sourceNode',{rules:[{required:true,message:'please input the sourceNode!'}]}]"></a-input>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="endNode">-->
        <!--          <a-input-->
        <!--            v-decorator="['endNode',{rules:[{required:true,message:'please input the endNode!'}]}]"></a-input>-->
        <!--        </a-form-item>-->
      </a-form>
    </a-modal>
    <a-modal :visible="modifyNodeFormVisible" title="修改结点" @cancel="cancelModifyNode" @ok="modifyNode">
      <a-form :form="modifyNodeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="name">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the node!' }] }]"
          />
        </a-form-item>
        <a-form-item label="label">
          <a-input
            v-decorator="['label',{rules:[{required:false,message:'please input the label!'}]}]"></a-input>
        </a-form-item>
        <a-button @click="addNodeProperty" style="margin: 20px 0px 10px 100px">增加属性</a-button>
        <div style = "margin-left:50px; margin-top:30px">
          <h4 style="margin-bottom: 16px">
            颜色:
          </h4>
          <div>
            <a-checkable-tag color="pink"  v-model="checkedPink" @change="handleChangeColor">
              pink
            </a-checkable-tag>
            <a-checkable-tag color="red"   v-model="checkedRed" @change="handleChangeColor">
              red
            </a-checkable-tag>
            <a-checkable-tag color="orange"  v-model="checkedOrange" @change="handleChangeColor">
              orange
            </a-checkable-tag>
            <a-checkable-tag color="green"  v-model="checkedGreen" @change="handleChangeColor">
              green
            </a-checkable-tag>
            <a-checkable-tag color="cyan"  v-model="checkedCyan" @change="handleChangeColor">
              cyan
            </a-checkable-tag>
            <a-checkable-tag color="blue"  v-model="checkedBlue" @change="handleChangeColor">
              blue
            </a-checkable-tag>
            <a-checkable-tag color="purple"  v-model="checkedPurple" @change="handleChangeColor">
              purple
            </a-checkable-tag>
          </div>
        </div>
      </a-form>
    </a-modal>
    <a-modal :visible="addNodePropertyFormVisible" title="增加属性" @cancel="cancelAddNodeProperty" @ok="addNodeProperties">
      <a-form :form="NodePropertyForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="key">
          <a-input
            v-decorator="['key', { rules: [{ required: true, message: 'Please input key of the property!' }] }]"
          />
        </a-form-item>
        <a-form-item label="value">
          <a-input
            v-decorator="['value', { rules: [{ required: false, message: 'choose to input value of the property!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :visible="addEdgeFormVisible" title="增加边" @cancel="cancelAddEdge" @ok="addEdge">
      <a-form :form="edgeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="name">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the Edge!' }] }]"
          />
        </a-form-item>
        <a-form-item label="property name">
          <a-input
            v-decorator="['propertyName', { rules: [{ required: false, message: 'choose to input property of the edge!' }] }]"
          />
        </a-form-item>
        <a-form-item label="property value ">
          <a-input
            v-decorator="['propertyValue', { rules: [{ required: false, message: 'choose to input property of the edge!' }] }]"
          />
        </a-form-item>
        <!--        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">-->
        <!--          <a-button type="primary" @click="addItem"><E5><A2><9E><E5><8A><A0><E5><B1><9E><E6><80><A7></a-button>-->
        <!--        </a-form-item>-->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'
import cola from 'cytoscape-cola'
import avsdf from 'cytoscape-avsdf'
import coseBilkent from 'cytoscape-cose-bilkent'
import { UpdataNodeAPI, DeleteNodeAPI, DownloadXmlAPI, DeleteEdgeAPI, updateEdgeAPI } from '@/api/api'
// import { UpdataNodeAPI, DeleteNodeAPI, DeleteEdgeAPI, updateEdgeAPI, AddEdgeAPI } from '@/api/api'
import edgehandles from 'cytoscape-edgehandles'

export default {
  name: 'CJS',
  beforeCreate () {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy()
    delete this.$cy
  },
  beforeDestroy () {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy()
    delete this.$cy
  },
  watch: {},
  props: {},
  mounted () {
    // Cxtmenu圆形菜单主要依赖组件
    if (!cytoscape().cxtmenu) {
      cytoscape.use(cxtmenu)
      cytoscape.use(cola)
      cytoscape.use(avsdf)
      cytoscape.use(coseBilkent)
      cytoscape.use(edgehandles)
    }

    this.$cy = cytoscape({
      // initial viewport state:
      zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.
      pan: { x: 0, y: 0 }, // 图表的初始平移位置.
      // interaction options:
      minZoom: 1e-50, // 图表缩放级别的最小界限.视口的缩放比例不能小于此缩放级别.
      maxZoom: 1e50, // 图表缩放级别的最大界限.视口的缩放比例不能大于此缩放级别.
      zoomingEnabled: true, // 是否通过用户事件和编程方式启用缩放图形.
      userZoomingEnabled: false, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
      panningEnabled: true, // 是否通过用户事件和编程方式启用平移图形.
      userPanningEnabled: true, // 是否允许用户事件(例如拖动图形背景)平移图形.平移的程序化更改不受此选项的影响.
      boxSelectionEnabled: false, // 是否启用了框选择(即拖动框叠加,并将其释放为选择).如果启用,则用户必须点击以平移图表.
      selectionType: 'single', // 一个字符串，指示用户输入的选择行为.对于'additive',用户进行的新选择将添加到当前所选元素的集合中.对于'single',用户做出的新选择成为当前所选元素的整个集合.
      touchTapThreshold: 8, // 非负整数,分别表示用户在轻击手势期间可以在触摸设备和桌面设备上移动的最大允许距离.这使得用户更容易点击.
      // 这些值具有合理的默认值,因此建议不要更改这些选项,除非您有充分的理由这样做.大值几乎肯定会产生不良后果.
      desktopTapThreshold: 4, // 非负整数,分别表示用户在轻击手势期间可以在触摸设备和桌面设备上移动的最大允许距离.这使得用户更容易点击.
      // 这些值具有合理的默认值,因此建议不要更改这些选项,除非您有充分的理由这样做.大值几乎肯定会产生不良后果.
      autolock: false, // 默认情况下是否应锁定节点(根本不可拖动,如果true覆盖单个节点状态).
      autoungrabify: false, // 默认情况下节点是否不允许被拾取(用户不可抓取,如果true覆盖单个节点状态).
      autounselectify: false, // 默认情况下节点是否允许被选择(不可变选择状态,如果true覆盖单个元素状态).
      // rendering options:
      headless: false, // true:空运行,不显示不需要容器容纳.false:显示需要容器容纳.
      styleEnabled: true, // 一个布尔值,指示是否应用样式.
      hideEdgesOnViewport: false, // 渲染提示,设置为true在渲染窗口时,不渲染边.例如,移动某个顶点时或缩放时,边信息会被临时隐藏,移动结束后,边信息会被执行一次渲染.由于性能增强,此选项现在基本上没有实际意义.
      hideLabelsOnViewport: true, // 渲染提示,当设置为true使渲染器在平移和缩放期间使用纹理而不是绘制元素时,使大图更具响应性.由于性能增强,此选项现在基本上没有实际意义.
      textureOnViewport: true, // 渲染提示,当设置为true使渲染器在平移和缩放期间使用纹理而不是绘制元素时,使大图更具响应性.由于性能增强,此选项现在基本上没有实际意义.
      motionBlur: true, // 渲染提示,设置为true使渲染器使用运动模糊效果使帧之间的过渡看起来更平滑.这可以增加大图的感知性能.由于性能增强,此选项现在基本上没有实际意义.
      motionBlurOpacity: 0.2, // 当motionBlur:true,此值控制运动模糊帧的不透明度.值越高,运动模糊效果越明显.由于性能增强,此选项现在基本上没有实际意义.
      wheelSensitivity: 0.3, // 缩放时更改滚轮灵敏度.这是一个乘法修饰符.因此,0到1之间的值会降低灵敏度(变焦较慢),而大于1的值会增加灵敏度(变焦更快).
      pixelRatio: 'auto', // 使用手动设置值覆盖屏幕像素比率(1.0建议,如果已设置).这可以通过减少需要渲染的有效区域来提高高密度显示器的性能,
      // 尽管在最近的浏览器版本中这是不太必要的.如果要使用硬件的实际像素比,可以设置pixelRatio: 'auto'(默认).
      // DOM容器,决定内容展示的位置,方式一(原生):document.getElementById('xx'),方式二(jQuery):$('#xx')
      container: document.getElementById('cytoscape_id'),
      // 一个指定布局选项的普通对象.
      layout: {
        name: 'random'
        // fit: true, // whether to fit to viewport
        // padding: 30, // fit padding
        // boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        // animate: false, // whether to transition the node positions
        // animationDuration: 500, // duration of animation in ms if enabled
        // animationEasing: undefined, // easing of animation if enabled
        // // animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        // ready: undefined, // callback on layoutready
        // stop: undefined, // callback on layoutstop
        // transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
      }

    })
    const defaults = {

      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
      handlePosition: function (node) {
        return 'middle top' // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      },
      handleInDrawMode: false, // whether to show the handle in draw mode
      edgeType: function (sourceNode, targetNode) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat'
      },
      loopAllowed: function (node) {
        // for the specified node, return whether edges from itself to itself are allowed
        return false
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      // nodeParams: function (sourceNode, targetNode) {
      //   // for edges between the specified source and target
      //   // return element object to be passed to cy.add() for intermediary node
      //   return {}
      // },
      // edgeParams: function (sourceNode, targetNode, i) {
      //   // for edges between the specified source and target
      //   // return element object to be passed to cy.add() for edge
      //   // NB: i indicates edge index in case of edgeType: 'node'
      //   return {}
      // },
      // ghostEdgeParams: function () {
      //   // return element object to be passed to cy.add() for the ghost edge
      //   // (default classes are always added for you)
      //   return {}
      // },
      // show: function (sourceNode) {
      //   // fired when handle is shown
      // },
      // hide: function (sourceNode) {
      //   // fired when the handle is hidden
      // },
      // start: function (sourceNode) {
      //   console.log(sourceNode)
      // },
      complete: function (sourceNode, targetNode, addedEles) {
        console.log(sourceNode.data().id)
        console.log(targetNode.data().id)
        // this.addEdgeFormVisible = true
        // this.$cy.addEdges([sourceNode.data().id], [targetNode.data().id])
      }
      // stop: function (sourceNode) {
      //   // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      // },
      // cancel: function (sourceNode, cancelledTargets) {
      //   // fired when edgehandles are cancelled (incomplete gesture)
      // },
      // hoverover: function (sourceNode, targetNode) {
      //   // fired when a target is hovered
      // },
      // hoverout: function (sourceNode, targetNode) {
      //   // fired when a target isn't hovered anymore
      // },
      // previewon: function (sourceNode, targetNode, previewEles) {
      //   // fired when preview is shown
      // },
      // previewoff: function (sourceNode, targetNode, previewEles) {
      //   // fired when preview is hidden
      // },
      // drawon: function () {
      //   // fired when draw mode enabled
      // },
      // drawoff: function () {
      //   // fired when draw mode disabled
      // }
    }
    const eh = this.$cy.edgehandles(defaults)
    eh.enable()
    var that = this
    this.$cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
      // console.log(sourceNode.data().id)
      // that.addEdgeFormVisible = true
      console.log(addedEles.data())
      that.$cy.getElementById(addedEles.data().id).remove()
      that.addEdges([sourceNode.data().id], [targetNode.data().id])
    })

    // Cxtmenu圆形菜单--节点
    this.$cy.cxtmenu({
      menuRadius: 80, // the radius of the circular menu in pixels
      selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
      // eslint-disable-next-line no-unused-vars
      commands: (element) => {
        return [
          // {
          //   fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          //   content: '<span class="fa fa-flash fa-2x">导出图片</span>', // html/text content to be displayed in the menu
          //   contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          //   select: function (ele) { // a function to execute when the command is selected
          //     alert(ele.id()) // `ele` holds the reference to the active element
          //   },
          //   enabled: true // whether the command is selectable
          // },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">删除节点</span>', // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: (ele) => this.removeNode([ele.id()]),
            // select: function (ele) { // a function to execute when the command is selected

            //   ele.remove()
            // },
            enabled: true // whether the command is selectable
          },
          {
            // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: '高亮邻居', // html/text content to be displayed in the menu
            // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: (ele) => this.lightOn([ele.id()]), // a function to execute when the command is selected
            enabled: true // whether the command is selectable
          },
          {
            // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: '修改', // html/text content to be displayed in the menu
            // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: (ele) => this.changeNode([ele.id()]), // a function to execute when the command is selected
            enabled: true // whether the command is selectable
          }
          // {
          //   // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          //   content: '禁用', // html/text content to be displayed in the menu
          //   // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          //   select: (ele) => alert(ele.id()), // a function to execute when the command is selected
          //   enabled: false // whether the command is selectable
          // }
        ]
      },
      fillColor: 'rgba(0, 0, 0, 0.75)', // 指令默认颜色(the background colour of the menu)
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // 所选指令的颜色(the colour used to indicate the selected command)
      activePadding: 10, // additional size in pixels for the active command
      indicatorSize: 14, // the size in pixels of the pointer to the active command
      separatorWidth: 4, // 连续命令之间的空白间隔(以像素为单位)
      spotlightPadding: 10, // 元素和聚光灯之间的额外间距(以像素为单位)
      minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // 各指令元素内字体颜色
      itemTextShadowColor: 'red', // 各指令元素内字体阴影颜色
      zIndex: 9999, // the z-index of the ui div
      atMouse: true // draw menu at mouse position
    })
    // 边删除、修改
    this.$cy.cxtmenu({
      menuRadius: 40, // the radius of the circular menu in pixels
      selector: 'edge', // elements matching this Cytoscape.js selector will trigger cxtmenus
      // eslint-disable-next-line no-unused-vars
      commands: (element) => {
        return [
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">删除</span>', // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: function (ele) { // a function to execute when the command is selected
              console.log(ele)
              ele.remove() // `ele` holds the reference to the active element
            },
            enabled: true // whether the command is selectable
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: '<span class="fa fa-flash fa-2x">修改</span>', // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: (ele) => this.setModifyEdgeFormVisible([ele.data().id, ele.data().source, ele.data().target]),
            enabled: true // whether the command is selectable
          }
        ]
      },
      fillColor: 'rgba(0, 0, 0, 0.75)', // 指令默认颜色(the background colour of the menu)
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // 所选指令的颜色(the colour used to indicate the selected command)
      activePadding: 10, // additional size in pixels for the active command
      indicatorSize: 14, // the size in pixels of the pointer to the active command
      separatorWidth: 4, // 连续命令之间的空白间隔(以像素为单位)
      spotlightPadding: 10, // 元素和聚光灯之间的额外间距(以像素为单位)
      minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // 各指令元素内字体颜色
      itemTextShadowColor: 'red', // 各指令元素内字体阴影颜色
      zIndex: 9999, // the z-index of the ui div
      atMouse: true // draw menu at mouse position
    })
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
        'font-size': '10pt',
        width: '40pt',
        height: '40pt',
        'background-color': '#fce9cc'
      })
    /* 已选择节点样式 */
      .selector('node:selected')
      .style({ 'border-color': '#c84e40', 'border-width': '1px' })
    /* 未选择节点样式 */
      .selector('edge')
      .style({
        label: 'data(name)',
        'target-arrow-shape': 'triangle', /* 箭头样式 */
        'target-arrow-size': '1px', /* 箭头大小 */
        'target-arrow-color': 'rgba(230,230,250,0.9)', /* 箭头颜色 */
        'curve-style': 'bezier', /* 线条样式曲线 */
        'line-color': 'rgba(230,230,250,0.9)', /* 线条颜色 */
        width: '1px', /* 线条宽度 */
        'font-size': '10px', /* 标签字体大小 */
        color: '#000000', /* 标签字体大小 */
        // 'text-outline-color': 'white', /* 文本轮廓颜色 */
        // 'text-outline-width': '0.5px', /* 文本轮廓宽度 */
        'text-rotation': 'autorotate' /* 标签方向 */
      })
    /* 已选择节点样式 */
      .selector('edge:selected')
      .style({
        color: '#90acfc', /* 标签字体大小 */
        'target-arrow-color': '#9ad3f8', /* 箭头颜色 */
        'line-color': '#abdbfa' /* 线条颜色 */
      })
    /* 高亮样式 */
      .selector('.light-off')
      .style({ opacity: '0.1' })
      .selector('.eh-handle')

      .style({
        'background-color': '#fce9cc',
        width: 12,
        height: 12,
        shape: 'ellipse',
        'overlay-opacity': 0,
        'border-width': 12, // makes the handle easier to hit
        'border-opacity': 0
      })
  },
  data () {
    return {
      modifyEdgeFormVisible: false,
      modifyEdgeForm: this.$form.createForm(this, { name: 'coordinated' }),
      edgeId: '',
      sourceNode: '',
      endNode: '',
      modifyNodeFormVisible: false,
      modifyNodeForm: this.$form.createForm(this, { name: 'coordinated' }),
      nodeId: '',
      from: '',
      to: '',
      addEdgeFormVisible: false,
      edgeForm: this.$form.createForm(this, { name: 'coordinated' }),
      addNodePropertyFormVisible: false,
      NodePropertyForm: this.$form.createForm(this, { name: 'coordinated' }),
      nodeData: {
        identity: '',
        labels: [], // 标签
        properties: {
          name: ''
          // 属性（键值对）
        }
      },
      checkedPink: false,
      checkedRed: false,
      checkedOrange: false,
      checkedGreen: false,
      checkedCyan: false,
      checkedBlue: false,
      checkedPurple: false
    }
  },
  methods: {
    /**
       * eles : Array or Map.
       * node_eg: {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * edge_eg: {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'A', target: 'B', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * node_eg: [
       *   {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       *   {group: 'nodes', data: {id: 'nid2', name: 'name2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * ];
       * edge_eg: [
       *   {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'nid1', target: 'nid2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       *   {group: 'edges', data: {id: 'eid2', name: 'name1', source: 'nid2', target: 'nid3', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * ];
       * @param eles 元素集合.
       */
    addEles (eles) {
      console.log(eles)
      if (eles) {
        this.$cy.startBatch()
        this.$cy.batch(() => {
          const elements = ((Array.isArray ? Array.isArray(eles) : eles != null && eles instanceof Array) ? eles : [eles])
          const filterElements = elements.filter(__ => !this.$cy.getElementById(__.data.id).length)
          this.$cy.add(filterElements)
        })
        this.$cy.endBatch()
      }
    },
    /**
       * 删除选择的内容(可能是顶点, 也可能是关系)
       */
    delEles () {
      this.$cy.startBatch()
      this.$cy.batch(() => {
        const selectedEles = this.$cy.elements(':selected')
        console.log(selectedEles)
        // 未选择不进行操作
        if (!selectedEles || selectedEles.length < 1) {
          return false
        }
        selectedEles.remove()
      })
      this.$cy.endBatch()
    },
    /** *************************工具栏************************/
    /**
       * 缩放大小.
       * @param zoom 增减幅度.
       */
    zoom (zoom) {
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
      this.$cy.zoom({ level: level, renderedPosition: { x: x, y: y } })
    },
    /** 放大 */
    magnifying () {
      this.zoom(0.3)
    },
    /** 缩小 */
    contractible () {
      this.zoom(-0.3)
    },
    /** 合适大小 */
    resize () {
      this.$cy.fit()
    },
    /**
       * 高亮.
       * @param ele 某元素ID
       */
    lightOn (ele) {
      this.$cy.startBatch()
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
    /**
       * 取消高亮.
       */
    lightOff () {
      this.$cy.startBatch()
      this.$cy.batch(() => this.$cy.elements().removeClass('light-off') /* 移除样式 */)
      this.$cy.endBatch()
    },
    /** 高亮邻居 */
    highlight () {
      /** 获取已选择内容 */
      const selectedEles = this.$cy.elements('node:selected')
      /** 获取已选择内容中得第一个, 没有选择为null */
      const selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null;
      (selectedEle) && (this.lightOn(selectedEle.id()))
    },
    /**
       * 刷新布局.
       * name取值范围:
       * ['grid', 'circle', 'cola', 'avsdf', 'cose-bilkent', ]
       * @param {name = 'cola......', randomize = true | false, animate = true | false}
       */
    refresh ({ name = 'cola', randomize = false, animate = true } = {}) {
      this.$cy.layout({ name: name, randomize: randomize, animate: animate }).run()
    },
    /**
       * 绘制水印.
       */
    drawWatermark ({
      canvas = null,
      words = `请勿外传 时间: ${new Date().toTimeString()}`,
      width = 400,
      height = 400,
      font = '15px microsoft yahei', // 水印字体设置
      fillStyle = 'rgba(0, 0, 0, 0.3)', // 水印字体颜色设置
      rotate = 10 * Math.PI / 180, // 水印字体倾斜角度设置, 正数顺时针, 负数逆时针
      positionX = 20, // X 轴偏移像素
      positionY = 20 // Y 轴偏移像素
    } = {}) {
      const tempCanvas = document.createElement('canvas');
      [tempCanvas.width, tempCanvas.height] = [width, height]
      const tempCtx = tempCanvas.getContext('2d')
      /** 清除画布 */
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
      /** 文字倾斜角度 */
      tempCtx.rotate(rotate);
      /** 字体样式及颜色 */
      [tempCtx.font, tempCtx.fillStyle] = [font, fillStyle]

      let [wordsArr, index, s] = [[], 0, '']
      for (const code of words) {
        s = code
        code.codePointAt(0) > 255 ? index = 2 : index = 1;
        (index > tempCanvas.width / 11.25) && (wordsArr.push(s)) && ([index, s] = [0, ''])
      }
      wordsArr.push(s)

      for (let i = 0; i < wordsArr.length; i) {
        tempCtx.fillText(wordsArr[i], positionX, positionY + i * 20, tempCanvas.width - positionX)
      }

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = ctx.createPattern(tempCanvas, 'repeat')
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    },
    /**
       * 导出全局图片.
       */
    exportPng () {
      const blob = this.$cy.png({ output: 'blob', bg: 'transparent', full: true, scale: 4, quality: 1 })
      const [aLink, evt] = [document.createElement('a'), document.createEvent('HTMLEvents')]
      evt.initEvent('click', true, true);
      [aLink.download, aLink.href] = [`${new Date().getTime()}.png`, URL.createObjectURL(blob)]
      aLink.dispatchEvent(evt)
      aLink.click()
    },
    /**
       * 导出全局图片带有水印.
       */
    exportPngAndWatermark () {
      const time = new Date().getTime()
      const blob = this.$cy.png({ output: 'blob', bg: 'transparent', full: true, scale: 4, quality: 1 })

      const image = new Image();
      [image.id, image.crossOrigin, image.src] = [time, 'anonymous', window.URL.createObjectURL(blob)]
      image.onload = () => {
        const canvas = document.createElement('canvas');
        [canvas.width, canvas.height] = [image.width, image.height]
        const ctx = canvas.getContext('2d')
        /** 绘制水印 */
        this.drawWatermark({ canvas: canvas, words: `请勿外传! 时间: ${new Date().toTimeString()}` })
        /** 绘制原图 */
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)
        ctx.save()
        const [aLink, evt] = [document.createElement('a'), document.createEvent('HTMLEvents')]
        evt.initEvent('click', true, true);
        [aLink.download, aLink.href] = [`${time}.png`, canvas.toDataURL('image/png')]
        aLink.dispatchEvent(evt)
        aLink.click()
      }
    },
    /**
       * 导出局部图片.
       */
    exportCutPng ({ watermark = false } = {}) {
      const unselectedVertexes = this.$cy.elements('node:unselected')
      if (!unselectedVertexes || unselectedVertexes.length === 0) {
        return false
      }
      const remove = unselectedVertexes.remove() // 保留删除内容
      watermark ? this.exportPngAndWatermark() : this.exportPng();
      (remove && remove.length) && (remove.restore()) // 恢复删除内容
    },
    /**
       * 导出局部图片.
       */
    exportCutPngAndWatermark () {
      this.exportCutPng({ watermark: true })
    },
    downloadXml () {
      DownloadXmlAPI().then(res => {
        console.log(res)
      }).catch(err => console.log(err))
      const url = 'https://sec123.oss-cn-shanghai.aliyuncs.com/export.xml'
      // const params = '前端xml下载'
      // const xhr = new XMLHttpRequest()
      // xhr.open('POST', url, true)
      // xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
      // xhr.responseType = 'blob'
      // xhr.onload = function (e) {
      //   if (this.status === 200) {
      //     if (navigator.msSaveBlob) {
      //       return navigator.msSaveBlob(this.response, params.originalName ? params.originalName : '错误提示文档.xlsx')
      //     }
      //     const blob = this.response
      //     const a = document.createElement('a')
      //     const url = window.URL.createObjectURL(blob)
      //     a.href = url
      //     // 获取后端文件名称
      //     const fileName = decodeURI(xhr.getResponseHeader('content-disposition'))
      //     // 截取=字符串后面的内容
      //     const str = fileName.substring(21, fileName.length)
      //     const utfStr = decodeURI(escape(str)) // 是ISO_8859_1格式->改成utf-8
      //     a.download = utfStr
      //     a.click()
      //     window.URL.revokeObjectURL(url)
      //   }
      // }
      // // 参数是json格式
      // xhr.send(JSON.stringify(params))
      //
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
    /** *************************工具栏************************/
    modifyEdge (e) {
      console.log(e)
      e.preventDefault()
      this.modifyEdgeForm.validateFields((err, values) => {
        if (!err) {
          console.log('the value of the form: ', values)
        } else {
          console.log(err)
        }
        const edgeData = {
          identity: this.edgeId,
          start: this.sourceNode,
          end: this.endNode,
          type: values.name,
          properties: {}
        }
        const ele = {
          group: 'edges',
          data: {
            id: this.edgeId,
            name: edgeData.type,
            source: edgeData.start,
            target: edgeData.end
          }
        }
        console.log(ele.data)
        console.log(this.$cy)
        console.log(this.$cy.getElementById(ele.data.id).data())
        this.$cy.getElementById(ele.data.id).data().name = ele.data.name
        // this.$cy.getElementById(ele.data.id).data().source = ele.data.source
        // this.$cy.getElementById(ele.data.id).data().target = ele.data.target
        // console.log(this.$cy.getElementById(ele.data.id).data())
        this.$cy.getElementById(ele.data.id).remove()
        // console.log(ele)
        this.addEles([ele])
        updateEdgeAPI(edgeData).then(res => {
          console.log(res)
        }).catch(err => console.log(err))
        this.modifyEdgeFormVisible = false
        this.modifyEdgeForm.resetFields()
        this.edgeId = ''
        this.sourceNode = ''
        this.endNode = ''
      })
    },
    /** 修改结点名称或属性 */
    changeNode (ele) {
      console.log(ele)
      this.modifyNodeFormVisible = true
      this.nodeId = ele
    },
    cancelModifyNode () {
      this.modifyNodeFormVisible = false
      this.modifyNodeForm.resetFields()
      this.nodeId = ''
    },
    modifyNode (e) {
      e.preventDefault()
      this.modifyNodeForm.validateFields((err, values) => {
        if (!err) {
          console.log('the value of the form: ', values)
        } else {
          console.log(err)
        }
        this.nodeData.identity = this.nodeId[0]
        this.nodeData.labels = [values.label]
        this.nodeData.properties.name = values.name
        // const nodeData = {
        //   identity: this.nodeId[0],
        //   // identity: '26626',
        //   labels: [values.label],
        //   properties: {
        //     name: values.name
        //   }
        // }
        console.log(this.nodeData)
        const ele = {
          group: 'nodes',
          data: {
            id: this.nodeId[0],
            name: values.name,
            label: values.label
          }
        }
        // console.log(ele.data.id)
        // console.log(this.$cy)
        // console.log(this.$cy.getElementById(ele.data.id).data())
        this.$cy.getElementById(ele.data.id).data().name = ele.data.name
        this.$cy.getElementById(ele.data.id).label = ele.data.label
        // console.log(this.$cy.getElementById(ele.data.id).data())
        // this.lightOn(ele.data.id)
        UpdataNodeAPI(this.nodeData).then(res => {
          console.log(res)
        }).catch(err => console.log(err))
        this.modifyNodeFormVisible = false
        this.modifyNodeForm.resetFields()
        this.nodeId = ''
      })
    },
    removeNode (e) {
      console.log(e)
      DeleteNodeAPI({ identity: e }).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
      this.$cy.getElementById(e).remove()
    },
    // 点击跳出增加结点
    addNodeProperty () {
      this.addNodePropertyFormVisible = true
    },
    // 点击增加结点属性
    addNodeProperties (e) {
      e.preventDefault()
      this.NodePropertyForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
        var test1 = /^[0-9][\s\S]*$/
        if (test1.test(values.key)) {
          alert('开头是数字')
        } else {
          this.nodeData.properties[values.key] = values.value
        }
      })
      console.log('first')
      console.log(this.nodeData)
      this.addNodePropertyFormVisible = false
      this.NodePropertyForm.resetFields()
    },
    // 取消增加结点属性
    cancelAddNodeProperty () {
      this.addNodePropertyFormVisible = false
      this.NodePropertyForm.resetFields()
    },

    setModifyEdgeFormVisible (ele) {
      this.modifyEdgeFormVisible = true

      this.edgeId = ele[0]
      this.sourceNode = ele[1]
      this.endNode = ele[2]
    },
    cancelModifyEdge () {
      this.modifyEdgeFormVisible = false
      this.modifyEdgeForm.resetFields()
      this.edgeId = ''

      this.sourceNode = ''
      this.endNode = ''
    },
    removeEdge (e) {
      console.log(e)
      DeleteEdgeAPI({ identity: e }).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
      this.$cy.getElementById(e).remove()
    },
    addEdge (e) {
      console.log(e)
      e.preventDefault()
      this.edgeForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
        const edgeData = {
          identity: '',
          start: this.from[0],
          end: this.to[0],
          type: values.name,
          property: {}
        }
        edgeData.property[values.propertyName] = values.propertyValue
        console.log(edgeData)
        const ele = {
          group: 'edges',
          data: {
            id: '20',
            name: edgeData.type,
            source: edgeData.start,
            target: edgeData.end
          }
        }
        console.log(ele)
        this.addEles([ele])
        console.log('TRUE')
        // this.$cy.getElementById(ele.data.id).data().name = ele.data.name
        // AddEdgeAPI(edgeData).then(res => {
        //   ele.data.id = res.content
        //   console.log(ele)
        // }).catch(err => console.log(err))
      })
      this.addEdgeFormVisible = false
      this.edgeForm.resetFields()
      this.from = ''
      this.to = ''
    }, // <E7><82><B9><E5><87><BB><E6><B7><BB><E5><8A><A0><E8><BE><B9><E8><B7><B3><E5><87><BA><E8><A1><A8><E5><8D><95>
    addEdges (source, target) {
      this.addEdgeFormVisible = true
      this.from = source
      this.to = target
    }, // <E5><8F><96><E6><B6><88><E6><B7><BB><E5><8A><A0><E8><BE><B9>
    cancelAddEdge () {
      this.addEdgeFormVisible = false
      this.edgeForm.resetFields()
    },
    handleChangeColor (checked) {
      const selectedEles = this.$cy.getElementById(this.nodeId)
      console.log(this.nodeId)
      if (this.checkedPink) {
        selectedEles.style({ 'background-color': '#E7919C' })
      } else if (this.checkedBlue) {
        selectedEles.style({ 'background-color': '#91CBE7' })
      } else if (this.checkedCyan) {
        selectedEles.style({ 'background-color': '#91E1E7' })
      } else if (this.checkedGreen) {
        selectedEles.style({ 'background-color': '#3E9A33' })
      } else if (this.checkedOrange) {
        selectedEles.style({ 'background-color': '#ECA95A' })
      } else if (this.checkedPurple) {
        selectedEles.style({ 'background-color': '#D56DB4' })
      } else if (this.checkedRed) {
        selectedEles.style({ 'background-color': '#E93D4A' })
      }
      this.checkedRed = false
      this.checkedCyan = false
      this.checkedOrange = false
      this.checkedBlue = false
      this.checkedPurple = false
      this.checkedPink = false
      this.checkedGreen = false
    }
  }
}
</script>

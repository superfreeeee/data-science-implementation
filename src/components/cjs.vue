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
    height: 100%;
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
          <Icon style="font-size: 32px; cursor: pointer;" title="局部导出" type="ios-crop-outline" color="white" @click="exportCutPngAndWatermark()"/>
        </div>
      </div>
      <div class="tools">
        <div class="center-center">
          <Icon style="font-size: 32px; cursor: pointer;" title="全图导出" type="ios-reverse-camera-outline" color="white" @click="exportPngAndWatermark()"/>
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
        <a-form-item label="sourceNode">
          <a-input
            v-decorator="['sourceNode',{rules:[{required:true,message:'please input the sourceNode!'}]}]"></a-input>
        </a-form-item>
        <a-form-item label="endNode">
          <a-input
            v-decorator="['endNode',{rules:[{required:true,message:'please input the endNode!'}]}]"></a-input>
        </a-form-item>
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
import { UpdataNodeAPI, DeleteNodeAPI } from '@/api/api'

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
            select: (ele) => this.setModifyEdgeFormVisible([ele.data().id]),
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
  },
  data () {
    return {
      modifyEdgeFormVisible: false,
      modifyEdgeForm: this.$form.createForm(this, { name: 'coordinated' }),
      edgeId: '',
      modifyNodeFormVisible: false,
      modifyNodeForm: this.$form.createForm(this, { name: 'coordinated' }),
      nodeId: ''
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
        s += code
        code.codePointAt(0) > 255 ? index += 2 : index += 1;
        (index > tempCanvas.width / 11.25) && (wordsArr.push(s)) && ([index, s] = [0, ''])
      }
      wordsArr.push(s)

      for (let i = 0; i < wordsArr.length; i++) {
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
    /** *************************工具栏************************/

    setModifyEdgeFormVisible (id) {
      this.modifyEdgeFormVisible = true
      this.edgeId = id
    },
    cancelModifyEdge () {
      this.modifyEdgeFormVisible = false
      this.modifyEdgeForm.resetFields()
      this.edgeId = ''
    },
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
          name: values.name,
          sourceNode: values.sourceNode,
          endNode: values.endNode
        }
        const ele = {
          group: 'edges',
          data: {
            id: this.edgeId[0],
            name: edgeData.name,
            source: edgeData.sourceNode,
            target: edgeData.endNode
          }
        }
        // console.log(ele.data.id)
        // console.log(this.$cy)
        // console.log(this.$cy.getElementById(ele.data.id).data())
        this.$cy.getElementById(ele.data.id).data().name = ele.data.name
        this.$cy.getElementById(ele.data.id).data().source = ele.data.source
        this.$cy.getElementById(ele.data.id).data().target = ele.data.target
        // console.log(this.$cy.getElementById(ele.data.id).data())
        this.$cy.getElementById(ele.data.id).remove()
        this.addEles([ele])
        this.modifyEdgeFormVisible = false
        this.modifyEdgeForm.resetFields()
        this.edgeId = ''
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
        const nodeData = {
          identity: this.nodeId[0],
          labels: [values.label],
          properties: {
            name: values.name
          }
        }
        console.log(nodeData)
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
        UpdataNodeAPI(nodeData).then(res => {
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
    }
  }
}
</script>

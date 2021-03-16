<!--<template>-->
<!--  <div id="app">-->
<!--    <img src="./assets/logo.png">-->
<!--    <router-view/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'App'-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 60px;-->
<!--}-->
<!--</style>-->
<template>
  <div id="box">
    <h1>demo</h1>
    <div id="cy"  ref="capture" ></div>
    <div>
    <a-button type="primary"  @click="test">Button</a-button>
    <a-button type="primary"  @click="generatorImage" >save</a-button>
    </div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import {getListAPI, postFormAPI} from './api/api'
import html2canvas from 'html2canvas'

export default {
  name: 'cytoscape',
  components: {},
  data () {
    return {
      nodes: [{
        data: {
          id: 'n0'
        }
      },
      {
        data: {
          id: 'n1'
        }
      },
      {
        data: {
          id: 'n2'
        }
      },
      {
        data: {
          id: 'n3'
        }
      }

      ],
      edges: [{
        data: {
          source: 'n2',
          target: 'n1'
        }
      },
      {
        data: {
          source: 'n2',
          target: 'n3'
        }
      },
      {
        data: {
          source: 'n2',
          target: 'n0'
        }
      },
      {
        data: {
          source: 'n1',
          target: 'n0'
        }
      },
      {
        data: {
          source: 'n0',
          target: 'n1'
        }
      }
      ]
    }
  },
  methods: {
    createCytoscape: function () {
      cytoscape.warnings(false)
      const cy = cytoscape({ // eslint-disable-line no-unused-vars
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        userZoomingEnabled: false, // 滚轮缩放
        wheelSensitivity: 0.1,
        autounselectify: false,
        autoungrabify: true,
        layout: {
          // name: 'breadthfirst',
        },
        minZoom: 0.3,
        style: [{
          selector: 'node',
          style: {
            content: 'data(id)',
            'text-opacity': 0.5,
            height: 40,
            width: 40,
            'pie-size': '100%',
            'text-valign': 'center',
            'text-halign': 'left',
            'pie-color': '#9dbaea'
          }
        },
        {
          selector: ':parent',
          css: {
            'text-valign': 'top',
            'text-halign': 'center'
            // 'text-halign': 'right',
            // 'text-rotation': '90deg', //文字旋转
          }
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            label: 'data(label)',
            'target-arrow-shape': 'triangle',
            // "target-arrow-fill": "hollow", //箭头填充 空心
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        }

        ],
        elements: {
          // 节点数据
          nodes: this.nodes,
          //
          edges: this.edges
        }
      })
    },
    test(){
      getListAPI().then(res => console.log(res)).catch(err => console.log(err))
    },
    generatorImage() {
      html2canvas(this.$refs.capture).then(canvas => {
        // this.$refs.addImage.append(canvas);//在下面添加canvas节点
        let link = document.createElement("a");
        link.href = canvas.toDataURL();//下载链接
        link.setAttribute("download","test.png");
        link.style.display = "none";//a标签隐藏
        document.body.appendChild(link);
        link.click();
      });
    },
    postForm(formData) {
      let data = formData
      postFormAPI(data).then(res => console.log(res)).catch(err => console.log(err))
    },
  },
  mounted () {
    this.createCytoscape()
  }
}

</script>

<style>

  #box {
    width: 500px;
    height: 300px;
  }

  #cy {
    width: 100%;
    height: 100%;
  }

  h1 {
    opacity: 0.5;
    font-size: 1em;
  }

</style>

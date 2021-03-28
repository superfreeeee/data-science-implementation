<template>
  <div style="height: 100%; width: 100%;">
    <div style="position: fixed; right: 20pt;bottom: 0pt; z-index: 2;">
      <Button size="middle" style="background-color: #67758D;color: white; margin-right: 30px" @click="addNodes">添加节点</Button>
      <Button size="middle" style="background-color: #67758D;color: white" @click="delEles">删除</Button>
      <div class="change_form" >
        <a-modal :visible="addNodeFormVisible" title="增加节点" @cancel="cancelAddNode" @ok="addNode">
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="addNode">
            <a-form-item label="name">
              <a-input
                v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the node!' }] }]"
                placeholder="input name here"
              />
            </a-form-item>
            <a-form-item label="label">
              <a-input
                v-decorator="['label', { rules: [{ required: false, message: 'choose to input label of the node!' }] }]"
                placeholder="input label here!"
              />
            </a-form-item>
            <div style = "margin-left:50px; margin-top:30px">
              <h4 style="margin-bottom: 16px">
              属性:
              </h4>
              <a-list item-layout="horizontal" :data-source="all_property">
              <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta>
                  <a slot="title" >{{ item.title }}:&nbsp;{{item.value}}</a>
                  </a-list-item-meta>
              </a-list-item>
              </a-list>
              <a-button @click="addNodeProperty" style="margin: 20px 0px 10px 100px">增加属性</a-button>
            </div>
            <!--          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">-->
            <!--            <a-button type="primary" html-type="submit">-->
            <!--              增加node-->
            <!--            </a-button>-->
            <!--          </a-form-item>-->
          </a-form>
        </a-modal>
      </div>
      <a-modal :visible="addNodePropertyFormVisible" title="增加属性" @cancel="cancelAddNodeProperty"
               @ok="addNodeProperties">
        <a-form :form="NodePropertyForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="key">
            <a-input
              v-decorator="['key', { rules: [{ required: true, message: 'Please input key of the property!' }] }]"
              placeholder="input key here"
            />
          </a-form-item>
          <a-form-item label="value">
            <a-input
              v-decorator="['value', { rules: [{ required: true, message: 'choose to input value of the property!' }] }]"
              placeholder="input value here"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <CJS ref="ref_CJS"></CJS>
  </div>
</template>

<script>
import CJS from './components/cjs'
import { getListAPI, getGraphAPI, AddNodeAPI } from '@/api/api'

export default {
  name: 'Test',
  components: { CJS },
  watch: {},
  mounted () {
    this.addEles()
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      addNodeFormVisible: false,
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
      nodeId: '',
      all_property: []
    }
  },
  methods: {
    async addEles () {
      var graph
      await getGraphAPI().then(res => {
        graph = res.content
        // console.log(res)
      }).catch(err => console.log(err))

      // console.log(graph)
      var nodes = graph.nodes
      var edges = graph.edges

      // console.log(this.$refs.ref_CJS)
      for (var n in nodes) {
        var node = nodes[n]
        const data = {}
        if (node.properties) {
          for (var key in node.properties) {
            data[key] = node.properties[key]
          }
        } else {
          data.name = ''
        }
        data.id = node.identity
        // console.log(data)
        this.$refs.ref_CJS.addEles([{
          group: 'nodes',
          data,
          position: {
            x: Math.ceil(Math.random() * 10) * 90,
            y: Math.ceil(Math.random() * 10) * 90
          }
        }])
      }

      for (var e in edges) {
        var edge = edges[e]
        const data = {}
        if (edge.properties) {
          for (var keyE in edge.properties) {
            if (keyE !== 'type') {
              data[keyE] = edge.properties[keyE]
            }
          }
        }
        data.id = edge.identity
        data.source = edge.start
        data.target = edge.end
        data.name = edge.type
        this.$refs.ref_CJS.addEles([{
          group: 'edges',
          data
        }])
      }
      // this.$refs.ref_CJS.addEles([

      // { group: 'nodes', data: { id: '0', name: 'n0' }, position: { x: 200, y: 50 } },
      // { group: 'nodes', data: { id: '1', name: 'n1' }, position: { x: 500, y: 50 } },
      // { group: 'nodes', data: { id: '2', name: 'n2' }, display: 'hide', position: { x: 200, y: 150 } },
      // { group: 'nodes', data: { id: '3', name: 'n3' }, position: { x: 500, y: 150 } },
      // { group: 'nodes', data: { id: '4', name: 'n4' }, position: { x: 100, y: 100 } },
      // { group: 'nodes', data: { id: '5', name: 'n5' }, position: { x: 400, y: 100 } },
      // { group: 'nodes', data: { id: '6', name: 'n6' }, display: 'hide', position: { x: 300, y: 100 } },
      // { group: 'nodes', data: { id: '7', name: 'n7' }, position: { x: 300, y: 200 } },
      // { group: 'edges', data: { id: '8', name: '属于', source: '0', target: '1' } },
      // { group: 'edges', data: { id: '9', name: '属于', source: '1', target: '6' } },
      // { group: 'edges', data: { id: '10', name: '属于', source: '4', target: '0' } },
      // { group: 'edges', data: { id: '11', name: '属于', source: '3', target: '4' } },
      // { group: 'edges', data: { id: '12', name: '属于', source: '2', target: '7' } },
      // { group: 'edges', data: { id: '13', name: '属于', source: '5', target: '3' } },
      // { group: 'edges', data: { id: '14', name: '属于', source: '3', target: '2' } },
      // { group: 'edges', data: { id: '15', name: '属于', source: '6', target: '1' } },
      // { group: 'edges', data: { id: '16', name: '属于', source: '7', target: '2' } }
      // ])
    },
    delEles () {
      this.$refs.ref_CJS.delEles()
    },
    test_api () {
      getListAPI('').then(res => console.log(res)).catch(err => console.log(err))
    },
    addNode (e) {
      console.log(e)
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.nodeData.labels = [values.label]
          this.nodeData.properties.name = values.name
          // const nodeData = {
          //   identity: '',
          //   labels: [values.label], // 标签
          //   properties: {
          //     name: values.name
          //     // 属性（键值对）
          //   }
          // }
          const ele = {
            group: 'nodes',
            data: {
              id: '',
              name: values.name,
              label: values.label
            },
            position: {
              x: 600,
              y: 400
            }
          }
          for (var key in this.nodeData.properties) {
            ele.data[key] = this.nodeData.properties[key]
          }
          await AddNodeAPI(this.nodeData).then(res => {
            ele.data.id = res.content + ''
          }).catch(err => console.log(err))
          this.$refs.ref_CJS.addEles([
            ele
          ])
          this.nodeData.properties = {
            name: ''
          }
          this.addNodeFormVisible = false
          this.form.resetFields()
          this.all_property = []
        }
      })
    },
    addEdge (e) {
      console.log(e)
      e.preventDefault()
      this.edgeForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const edgeData = {
            name: values.name,
            property: values.property,
            sourceNode: values.sourceNode,
            endNode: values.endNode
          }
          const ele = {
            group: 'edges',
            data: {
              id: '9',
              name: edgeData.name,
              source: edgeData.sourceNode,
              target: edgeData.endNode
            }
          }
          this.$refs.ref_CJS.addEles([
            ele
          ])
          this.addEdgeFormVisible = false
          this.edgeForm.resetFields()
        }
      })
    },
    // 点击添加节点跳出表单
    addNodes () {
      this.addNodeFormVisible = true
    },
    // 点击添加边跳出表单
    addEdges () {
      this.addEdgeFormVisible = true
    },
    // 取消添加节点
    cancelAddNode () {
      this.addNodeFormVisible = false
      this.form.resetFields()
    },
    // 取消添加边
    cancelAddEdge () {
      this.addEdgeFormVisible = false
      this.edgeForm.resetFields()
    },
    // 点击跳出增加结点属性表单
    addNodeProperty () {
      this.addNodePropertyFormVisible = true
    },
    // 点击增加结点属性
    addNodeProperties (e) {
      e.preventDefault()
      this.NodePropertyForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          var test1 = /^[0-9]+[\s\S]*$/
          if (test1.test(values.key)) {
            alert('开头是数字')
          } else {
            this.nodeData.properties[values.key] = values.value
          }
          this.all_property.push({
            title: values.key,
            value: values.value
          })
          this.addNodePropertyFormVisible = false
          this.NodePropertyForm.resetFields()
        }
      })
    },
    // 取消增加结点属性
    cancelAddNodeProperty () {
      this.addNodePropertyFormVisible = false
      this.NodePropertyForm.resetFields()
      this.all_property = []
    }
  }
}
</script>

<style scoped>
  .change_form {
    padding-top: 30px;
  }
</style>

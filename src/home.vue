<template>
  <div style="height: 100%; width: 100%;">
    <div style="position: fixed; right: 40pt;bottom: 30pt; z-index: 99999;">
      <Button size="middle" @click="addNodes">添加节点</Button>
      <Button size="middle" @click="addEdges">添加边</Button>
      <Button size="middle" @click="delEles">删除</Button>
      <Button size="middle" @click="test_api">测试接口</Button>
      <div class="change_form" >
        <a-modal :visible="addNodeFormVisible" title="增加节点" @cancel="cancelAddNode" @ok="addNode">
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="addNode" >
            <a-form-item label="name">
              <a-input
                v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the node!' }] }]"
              />
            </a-form-item>
            <a-form-item label="label">
              <a-input
                v-decorator="['label', { rules: [{ required: false, message: 'choose to input label of the node!' }] }]"
              />
            </a-form-item>
<!--          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">-->
<!--            <a-button type="primary" html-type="submit">-->
<!--              增加node-->
<!--            </a-button>-->
<!--          </a-form-item>-->
          </a-form>
        </a-modal>
      </div>
      <a-modal :visible="addEdgeFormVisible" title="增加边" @cancel="cancelAddEdge" @ok="addEdge">
        <a-form :form="edgeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="name">
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: 'Please input name of the node!' }] }]"
            />
          </a-form-item>
          <a-form-item label="property">
            <a-input
              v-decorator="['property', { rules: [{ required: false, message: 'choose to input property of the node!' }] }]"
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
    </div>
    <CJS ref="ref_CJS"></CJS>
  </div>
</template>

<script>
import CJS from './components/cjs'
import { getListAPI, AddNodeAPI } from '@/api/api'

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
      addEdgeFormVisible: false,
      edgeForm: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    addEles () {
      this.$refs.ref_CJS.addEles([
        { group: 'nodes', data: { id: 'n0', name: 'n0' }, position: { x: 200, y: 50 } },
        { group: 'nodes', data: { id: 'n1', name: 'n1' }, position: { x: 500, y: 50 } },
        { group: 'nodes', data: { id: 'n2', name: 'n2' }, display: 'hide', position: { x: 200, y: 150 } },
        { group: 'nodes', data: { id: 'n3', name: 'n3' }, position: { x: 500, y: 150 } },
        { group: 'nodes', data: { id: 'n4', name: 'n4' }, position: { x: 100, y: 100 } },
        { group: 'nodes', data: { id: 'n5', name: 'n5' }, position: { x: 400, y: 100 } },
        { group: 'nodes', data: { id: 'n6', name: 'n6' }, display: 'hide', position: { x: 300, y: 100 } },
        { group: 'nodes', data: { id: 'n7', name: 'n7' }, position: { x: 300, y: 200 } },
        { group: 'edges', data: { id: 'e0', name: '属于', source: 'n0', target: 'n1' } },
        { group: 'edges', data: { id: 'e1', name: '属于', source: 'n1', target: 'n6' } },
        { group: 'edges', data: { id: 'e2', name: '属于', source: 'n4', target: 'n0' } },
        { group: 'edges', data: { id: 'e3', name: '属于', source: 'n3', target: 'n4' } },
        { group: 'edges', data: { id: 'e4', name: '属于', source: 'n2', target: 'n7' } },
        { group: 'edges', data: { id: 'e5', name: '属于', source: 'n5', target: 'n3' } },
        { group: 'edges', data: { id: 'e6', name: '属于', source: 'n3', target: 'n2' } },
        { group: 'edges', data: { id: 'e7', name: '属于', source: 'n6', target: 'n1' } },
        { group: 'edges', data: { id: 'e8', name: '属于', source: 'n7', target: 'n2' } }
      ])
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
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
        const nodeData = {
          identity: '',
          labels: [values.label], // 标签
          properties: {
            name: values.name
            // 属性（键值对）
          }
        }
        const ele = {
          group: 'nodes',
          data: {
            id: 0,
            name: values.name,
            label: values.label
          },
          position: {
            x: 600,
            y: 400
          }
        }
        AddNodeAPI(nodeData).then(res => {
          ele.data.id = res.content
          console.log(ele)
        }).catch(err => console.log(err))
        this.$refs.ref_CJS.addEles([
          ele
        ])
      })
      this.addNodeFormVisible = false
      this.form.resetFields()
    },
    addEdge (e) {
      console.log(e)
      e.preventDefault()
      this.edgeForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
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
      })
      this.addEdgeFormVisible = false
      this.edgeForm.resetFields()
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
    }
  }
}
</script>

<style scoped>
.change_form {
  padding-top: 30px
}
</style>

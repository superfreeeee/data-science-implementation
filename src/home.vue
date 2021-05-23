<template>
  <div style="height: 100%; width: 100%;">
    <CJS ref="ref_CJS" @reloadGraph="reloadGraph">
    </CJS>
    <div class = "Int_question" @click = "int_question">
      <a-icon class = "ques_icon" type="customer-service" />
    </div>
    <Question></Question>
    <div class="buttonBar" style="padding:20px;background-color: rgb(220, 220, 220)">
      <div class="button" style="margin-left: 70%">
        <Button style="background-color: #67758D;color: white; margin-right: 30px" @click="uploading" >上传文件</Button>
        <Button style="background-color: #67758D;color: white; margin-right: 30px" @click="addNodes">添加节点</Button>
      </div>
      <div class="upload_form">
        <a-modal
          title="上传文件" :footer="null" :visible="uploadFormVisible" :confirmLoading="confirmLoading" @cancel="cancelUpload">
          <a-upload-dragger name="mFile" :multiple="false" :showUploadList="true" action="http://localhost:9090/api/graph/uploadFile" :remove="handleRemove"
                            :before-upload="beforeUpload" @change="handleChange" :file-list="fileList">
            <p class="ant-upload-drag-icon">
              <a-icon style="color:#437FFF;font-size: 32px " type="vertical-align-top" />
            </p>
            <p class="ant-upload-text">
              点击或将文件拖拽到这里上传
            </p>
            <p class="ant-upload-hint">
              支持扩展名：.json
            </p>
          </a-upload-dragger>
          <a-button @click="handleSure" type="primary" style="margin: 20px 0px 10px 400px">确认</a-button>
        </a-modal>
      </div>
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
  </div>
</template>

<script>
import CJS from './components/cjs'
import { getListAPI, getGraphAPI, AddNodeAPI } from '@/api/api'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Question from '@/views/question'

export default {
  name: 'Test',
  components: { 
    CJS,
    Question
    },
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
      all_property: [],
      uploadFormVisible: false,
      fileList: [],
      confirmLoading: false,
      graphAll: {},
    }
  },
  methods: {
    ...mapMutations([
      "set_questionVisible"
    ]),
    ...mapActions([
    ]),
    async addEles () {
      var graph = {}
      var isInit=true
      await getGraphAPI().then(res => {
        graph = res.content
        console.log(graph)
      }).catch(err => console.log(err))
      var ele=[]
      var nodes = graph.nodes
      var edges = graph.edges
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
        data.labels=node.labels
        const toBeAdded={
          group: 'nodes',
          data,
        }
        // console.log('xy',node.properties.x,node.properties.y)
        if(node.properties.x!=null && node.properties.y!=null){
          toBeAdded.position={
            x: parseFloat(node.properties.x),
            y: parseFloat(node.properties.y)
          }
        }else{
          // console.log("shit",node.properties.name)
            isInit=false
        }

        this.$refs.ref_CJS.addEles([toBeAdded])
        console.log("true")
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
      console.log(isInit)
      if(!isInit){
      this.$refs.ref_CJS.$cy.layout({
        name: 'cose',
        randomize: false,
        animate: true
      }).run()
      }
      // this.$refs.ref_CJS.addEles([
      // { group: 'nodes', data: { id: '0', name: 'n0' }, position: { x: 200, y: 50 } },
      // ])
    },
    delEles () {
      this.$refs.ref_CJS.delEles()
    },
    addNode (e) {
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
          const pos={x:600,y:400}
          const ele = {
            group: 'nodes',
            data: {
              id: '',
              name: values.name,
              label: values.label
            },
            position: pos
          }
          this.nodeData.properties.x=pos.x
          this.nodeData.properties.y=pos.y
          for (var key in this.nodeData.properties) {
            ele.data[key] = this.nodeData.properties[key]
          }
          console.log("nodeData",this.nodeData)
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
    // 点击添加节点跳出表单
    addNodes () {
      this.addNodeFormVisible = true
    },
    // 取消添加节点
    cancelAddNode () {
      this.addNodeFormVisible = false
      this.form.resetFields()
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
    },
    // 点击上传文件跳出上传框
    uploading () {
      this.uploadFormVisible = true
    },
    // 点击取消上传
    cancelUpload () {
      this.uploadFormVisible = false
    },
    // 删除上传文件
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    // 显示上传文件内容
    beforeUpload (file) {
      console.log('before upload')
      this.spinning = true
      var that = this
      that.visible = false
      // 文件类型
      var fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileName !== 'csv' && fileName !== 'json') {
        this.$message.error('文件类型必须是csv或者json!')
        this.spinning = false
        that.visible = true
        return false
      }
      return true
    },
    handleChange (info) {
      console.log('239==', info)
      const file = info.file
      const name = file.name
      const suffix = name.substr(name.lastIndexOf('.'))
      if (suffix !== '.csv' && suffix !== '.json') {
        console.log(suffix)
        return false
      }
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      console.log('111')
      this.fileList = fileList
      console.log("this.fileList==", this.fileList);
      if (this.fileList && this.fileList.length > 0 && this.fileList[0].response && this.fileList[0].response.code === 0) {
        // this.fileList[0].response 执行的回调信息
        const arr = this.fileList[0].response.list || []
        if (arr.length > 0) {
          console.log('222')
          let majorNames = ''
          arr.forEach(item => {
            if (majorNames) {
              majorNames = majorNames + '，' + item.majorName
            } else {
              majorNames = item.majorName
            }
          })
          this.$message.error('上传失败')
        }
        // console.log(this.$refs.majorUpload)
        const suc = document.getElementsByClassName('ant-upload-list-item-name')
        // console.log("274==",suc)
        // let suc =  document.getElementsByClassName("ant-upload-list-item-card-actions");
        if (suc && suc.length > 0) {
          suc[0].style.width = '60%'
          const parent = suc[0].parentNode
          parent.style.display = 'flex'
          parent.style.marginTop = '16px'
          // console.log('278==parent==',parent)
          const sp = document.createElement('span')
          sp.innerText = '上传成功'
          sp.style.color = '#437FFF'
          parent.insertBefore(sp, suc[0].nextSibling)
        }
      }
      this.all_property = []
    },
    handleSure () {
      this.uploadFormVisible = false
    },
    async reloadGraph(){
      await this.addEles()
      this.$refs.ref_CJS.$cy.fit()
      console.log("resize")
    },
    int_question(){
      this.set_questionVisible(true)
    }

  }
}
</script>

<style scoped>
  .change_form {
    padding-top: 30px;
  }
  .Int_question {
    position: fixed;
    top: 600px;
    right: 20px;
  }
  .Int_question :hover{
    background-color: rgb(103, 117, 141);
    color: white;
  }
  .ques_icon {
    font-size: 35px;
  }
</style>

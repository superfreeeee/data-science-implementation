<template>
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
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "file",
  data(){
    return{
      confirmLoading: false,
      fileList:[]
    }
  },
  computed:{
    ...mapGetters([
      'uploadFormVisible',
    ])
  },
  methods:{
    ...mapMutations([
      "set_uploadFormVisible"
    ]),
    // 点击取消上传
    cancelUpload () {
      this.set_uploadFormVisible(false)
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
      // console.log('239==', info)
      const file = info.file
      const name = file.name
      const suffix = name.substr(name.lastIndexOf('.'))
      if (suffix !== '.csv' || suffix !== '.json') {
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
      this.fileList = fileList
      // console.log("this.fileList==",this.fileList);
      if (this.fileList && this.fileList.length > 0 && this.fileList[0].response && this.fileList[0].response.code === 0) {
        // this.fileList[0].response 执行的回调信息
        const arr = this.fileList[0].response.list || []
        if (arr.length > 0) {
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
          const sp = document.createElement('span')
          sp.innerText = '上传成功'
          sp.style.color = '#437FFF'
          parent.insertBefore(sp, suc[0].nextSibling)
        }
      }
      this.all_property = []
    },
    handleSure () {
      // this.uploadFormVisible = false
      this.set_uploadFormVisible(false)
    },
  }
}
</script>

<style scoped>

</style>

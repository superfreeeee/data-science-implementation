<template>
  <a-drawer
    :visible="settingVisible"
    placement="left"
    :closable="true"
    @close="onClose"
    width="520"
  >
      <a-form
      id="components-form-demo-validate-other"
      :form="form"
      v-bind="formItemLayout"
      @submit="handleSubmit"
    >
      <a-form-item class='select' label="节点图形">
        <a-radio-group class = 'right' v-decorator="['radio-group']">
          <a-radio value="a">
            圆形
          </a-radio>
          <a-radio value="b">
            椭圆形
          </a-radio>
          <a-radio value="c">
            正方形
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item class='select' label="节点大小">
        <a-slider class = 'right'
          v-decorator="['sliderNode']"
          :marks="{ 0: '小', 50: '中', 100: '大' }"
        />
      </a-form-item>
      <a-form-item class='select' label="节点文字大小">
        <a-slider class = 'right'
          v-decorator="['sliderNodeSize']"
          :marks="{ 0: '小', 50: '中', 100: '大' }"
        />
      </a-form-item>
      <a-form-item class='select' label="是否显示关系标签">
        <a-switch class = 'right' v-decorator="['是否显示关系标签', { valuePropName: 'checked' }]" />
      </a-form-item>
      <a-form-item class='select' :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit">
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import infiniteScroll from 'vue-infinite-scroll';
  export default {
    name: "Setting",
    directives:{
      infiniteScroll
    },
    data(){
      return{
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        },
      }
    },
    async mounted(){
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'validate_other' });
    },
    computed:{
      ...mapGetters([
        'settingVisible',
        'settingList'
      ])
    },
    methods:{
      ...mapMutations([
        'set_settingVisible',
        'set_settingList'
      ]),
      ...mapActions([
      ]),
      ...mapGetters([
        'cyinfo'
      ]),
      onClose(){
        this.set_settingVisible(false)
      },
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        })
        if (e.sliderNodeSize == undefined) {
          e.sliderNodeSize = 0
        }
        if (!e.sliderNode == undefined) {
          e.sliderNode = 0
        }
        console.log(e.sliderNode)
        this.set_settingList(e)
        this.set_settingVisible(false)
      },
    }
  }
</script>

<style scoped>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}

.select {
  padding: 15px 0px;
} 

.right {
  margin-left: 20px;
}

</style>

<template>
  <div class="table-page-search-wrapper" style="margin-left: 200px">
    <a-form
      layout="inline"
      :form="form"
      @submit="search"
    >
      <a-row :gutter="24">
        <a-col :md="5" :sm="24" :lg="5">
          <a-form-item label="搜索类型">
            <a-select
              placeholder="请选择"
              style="width: 100px"
              v-decorator="['searchType',
                        {rules: [{ required: false, message: '请选择搜索类型' }]}
                        ]"
              allowClear
              name="searchType">
              <a-select-option value="1">所有</a-select-option>
              <a-select-option value="2">节点</a-select-option>
              <a-select-option value="3">关系</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24" :lg="4">
          <a-form-item>
            <a-input
              v-decorator="['searchValue',
                {rules: [{ required: false, message: '请输入搜索值' }]}
                ]"
              placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24" :lg="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" html-type="submit" style="margin-top: 3px">查询</a-button>
              <a-button style="margin-left: 10px" @click="reset">重置</a-button>
            </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
import cytoscape from 'cytoscape'

export default {
  name: 'mySearch',
  data(){
    return{
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      searchParams: {
        type_id: undefined
      },
      searchValue: '',
      // 高级搜索 展开/关闭
      advanced: false,
      searchType: '',
      // 查询参数
      queryParam: {}
    }
  },
  methods:{
    reset () {
      this.form.resetFields()
    },
    handleChange (value) {
      this.searchType = value
    },
    search(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if(!err) {
          this.queryParam = {
            searchType: values.searchType,
            searchValue: values.searchValue
          }
        }
        this.$refs.stable.refresh()
      })
    }
  }
}
</script>

<style scoped>

</style>

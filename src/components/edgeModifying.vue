<template>
  <div>
    <!-- 增加边属性 -->
    <a-modal
      :visible="addEdgePropertyFormVisible"
      title="增加边属性"
      @cancel="cancelAddEdgeProperty"
      @ok="addEdgeProperties"
    >
      <a-form
        :form="EdgePropertyForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-item label="key">
          <a-input
            v-decorator="[
              'key',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input key of the property!',
                  },
                ],
              },
            ]"
            placeholder="input key here"
          />
        </a-form-item>
        <a-form-item label="value">
          <a-input
            v-decorator="[
              'value',
              {
                rules: [
                  {
                    required: true,
                    message: 'choose to input value of the property!',
                  },
                ],
              },
            ]"
            placeholder="input value here"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改边 -->
    <a-modal
      :visible="modifyEdgeFormVisible"
      title="修改边"
      @cancel="cancelModifyEdge"
      @ok="modifyEdge"
    >
      <a-form
        :form="modifyEdgeForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-item label="name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input name of the edge!',
                  },
                ],
              },
            ]"
            placeholder="input name here"
          />
        </a-form-item>
        <div style="margin-left: 50px; margin-top: 30px">
          <h4 style="margin-bottom: 16px">属性:</h4>
          <a-list item-layout="horizontal" :data-source="all_property">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <a slot="title">{{ item.title }}:&nbsp;{{ item.value }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-button @click="addEdgeProperty" style="margin: 20px 0px 10px 100px"
            >增加属性</a-button
          >
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { updateEdgeAPI } from "../api/api";

export default {
  name: "modifyEdge",
  data() {
    return {
      addEdgePropertyFormVisible: false,
      EdgePropertyForm: this.$form.createForm(this, { name: "coordinated" }),
      all_property: [],
      modifyEdgeForm: this.$form.createForm(this, { name: "coordinated" }),
      edgeData: {
        identity: '',
        start: '',
        end: '',
        type: '',
        properties: {
        }
      },
    };
  },
  computed: {
    ...mapGetters(["modifyEdgeFormVisible"]),
  },
  props:{
      'edge':Object
  },
  methods: {
    ...mapMutations(["set_modifyEdgeFormVisible"]),
    // 跳出增加边属性表单
    addEdgeProperty() {
      for(var keyE in this.edge){
        // console.log(keyE)
        if(keyE!=="id" && keyE!=="name" &&keyE!=="source" &&keyE!=="target"){
          this.edgeData.properties[keyE]=this.edge[keyE]
        }
      }
      console.log(this.edgeData)
      this.addEdgePropertyFormVisible = true;
    },
    // 取消增加边属性
    cancelAddEdgeProperty() {
      this.addEdgePropertyFormVisible = false;
      this.EdgePropertyForm.resetFields();
      this.all_property = [];
    },
    // 点击增加边属性
    addEdgeProperties(e) {
      e.preventDefault();
      this.EdgePropertyForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          var test1 = /^[0-9][\s\S]*$/;
          if (test1.test(values.key)) {
            alert("开头是数字");
          } else {
            this.edgeData.properties[values.key] = values.value;
            this.all_property.push({
              title: values.key,
              value: values.value,
            });
          }
          this.addEdgePropertyFormVisible = false;
          this.EdgePropertyForm.resetFields();
        }
      });
    },
    cancelModifyEdge() {
        this.set_modifyEdgeFormVisible(false)
        this.modifyEdgeForm.resetFields();
    },
    //修改边
    modifyEdge (e) {
      e.preventDefault()
      this.modifyEdgeForm.validateFields(async (err, values) => {
        if (!err) {
          console.log('the value of the form: ', values)
          this.edgeData.identity = this.edge.id
          this.edgeData.start = this.edge.source
          this.edgeData.end = this.edge.target
          if(values.name==""){
            this.edgeData.type=this.edge.name
          }else{
          this.edgeData.type = values.name
          }
          const ele = {
            group: 'edges',
            data: {
              id: this.edge.id,
              name: this.edgeData.type,
              source: this.edgeData.start,
              target: this.edgeData.end
            },
          }
          for (var key in this.edgeData.properties) {
            ele.data[key] = this.edgeData.properties[key]
          }
        //   this.$cy.getElementById(ele.data.id).data().name = ele.data.name
        //   this.$cy.getElementById(ele.data.id).remove()
        //   this.addEles([ele])
        this.$emit('listenToModifiedEdge',ele)
          await updateEdgeAPI(this.edgeData).then(res => {
            console.log(res)
          }).catch(err => console.log(err))
          this.set_modifyEdgeFormVisible(false)
          this.modifyEdgeForm.resetFields()
          this.all_property = []
        } else {
          console.log(err)
        }
      });
    },

  },
};
</script>
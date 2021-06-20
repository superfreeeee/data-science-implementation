<style scoped>
#propertiesDisplay{
  /* width:10px; */
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
<template>
  <div>
    <!-- 增加节点属性 -->
    <a-modal :visible="addNodePropertyFormVisible" title="增加节点属性" @cancel="cancelAddNodeProperty" @ok="addNodeProperties">
      <a-form :form="NodePropertyForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="key">
          <a-input
            v-decorator="['key', { rules: [{ required: true, message: 'Please input key of the property!' }] }]"
            placeholder="input key here"
          />
        </a-form-item>
        <a-form-item label="value">
          <a-input
            v-decorator="['value', { rules: [{ required: true, message: 'please to input value of the property!' }] }]"
            placeholder="input value here"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改节点 -->
    <a-modal
      :visible="modifyNodeFormVisible"
      title="修改结点"
      @cancel="cancelModifyNode"
      @ok="modifyNode"
    >
      <a-form
        :form="modifyNodeForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
      <!-- 节点名称 -->
        <a-form-item label="name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input name of the node!',
                  },
                ],
              },
            ]"
            placeholder="input name here"
          />
        </a-form-item>
        <!-- 节点标签 -->
        <a-form-item label="label">
          <a-input
            v-decorator="[
              'label',
              {
                rules: [
                  { required: false, message: 'please input the label!' },
                ],
              },
            ]"
            placeholder="input label here"
          ></a-input>
        </a-form-item>
        <!-- 属性 -->
        <div style="margin-left: 50px; margin-top: 30px">
          <h4 style="margin-bottom: 16px">属性:</h4>
          <a-list item-layout="horizontal" :data-source="nodeProperties">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <a slot="title" id="propertiesDisplay">{{ item.title }}:&nbsp;{{ item.value }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-button @click="addNodeProperty" style="margin: 20px 0px 10px 100px"
            >增加属性</a-button
          >
        </div>
        <!-- 改变颜色 -->
        <div style="margin-left: 50px; margin-top: 30px">
          <h4 style="margin-bottom: 16px">颜色:</h4>
          <div>
            <a-checkable-tag
              style="background-color: #e7919c"
              v-model="checkedPink"
              @change="handleChangeColor"
            >
              pink
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #e93d4a"
              v-model="checkedRed"
              @change="handleChangeColor"
            >
              red
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #eca95a"
              v-model="checkedOrange"
              @change="handleChangeColor"
            >
              orange
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #3e9a33"
              v-model="checkedGreen"
              @change="handleChangeColor"
            >
              green
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #91e1e7"
              v-model="checkedCyan"
              @change="handleChangeColor"
            >
              cyan
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #91cbe7"
              v-model="checkedBlue"
              @change="handleChangeColor"
            >
              blue
            </a-checkable-tag>
            <a-checkable-tag
              style="background-color: #d56db4"
              v-model="checkedPurple"
              @change="handleChangeColor"
            >
              purple
            </a-checkable-tag>
          </div>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { UpdataNodeAPI } from "../api/api";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "modifyNode",
  data() {
    return {
      color: "",
      checkedPink: false,
      checkedRed: false,
      checkedOrange: false,
      checkedGreen: false,
      checkedCyan: false,
      checkedBlue: false,
      checkedPurple: false,
      addNodePropertyFormVisible: false,
      NodePropertyForm: this.$form.createForm(this, { name: 'coordinated' }),
      modifyNodeForm: this.$form.createForm(this, { name: 'coordinated' }),
      nodeData:{},
      all_property:[]
    };
  },
  created:function(){
    this.nodeData=this.node
  },
  computed: {
    ...mapGetters(["modifyNodeFormVisible","nodeProperties","currentIndex"]),
  },
  props: {
    'node':Object
  },
  methods: {
      ...mapMutations(["set_modifyNodeFormVisible","set_nodeProperties"]),
    //   改变颜色，传回nodeId和颜色值，注意颜色可能为空，要判断
    handleChangeColor() {
      if (this.checkedPink) {
          this.color="#E7919C"
      } else if (this.checkedBlue) {
          this.color="#91CBE7"
      } else if (this.checkedCyan) {
          this.color="#91E1E7" 
      } else if (this.checkedGreen) {
          this.color="#3E9A33"
      } else if (this.checkedOrange) {
          this.color="#ECA95A"
      } else if (this.checkedPurple) {
          this.color="#D56DB4" 
      } else if (this.checkedRed) {
          this.color="#E93D4A"
      }
      this.checkedRed = false;
      this.checkedCyan = false;
      this.checkedOrange = false;
      this.checkedBlue = false;
      this.checkedPurple = false;
      this.checkedPink = false;
      this.checkedGreen = false;
    },
    // 点击跳出增加结点
    addNodeProperty() {
      this.nodeData=this.node
      this.all_property=this.nodeProperties
      this.addNodePropertyFormVisible = true;
    },
    // 取消添加节点属性
     cancelAddNodeProperty() {
      this.addNodePropertyFormVisible = false;
      this.NodePropertyForm.resetFields();
    },
    // 点击增加结点属性
    addNodeProperties(e) {
      e.preventDefault();
      this.NodePropertyForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          var test1 = /^[0-9][\s\S]*$/;
          if (test1.test(values.key)) {
            alert("开头是数字");
          } else {
            this.nodeData.properties[values.key] = values.value;
            // // 获取节点，将属性添加到节点中
            // const sel = this.$cy.getElementById(this.nodeId).data();
            // sel[values.key] = values.value;
            // 添加到all_property中
            this.all_property.push({
              title: values.key,
              value: values.value,
            });
            this.set_nodeProperties(this.all_property)
            this.addNodePropertyFormVisible = false;
            this.NodePropertyForm.resetFields();
          }
        }
      });
    },
    // 取消修改边
    cancelModifyNode() {
      this.set_modifyNodeFormVisible(false);
      this.modifyNodeForm.resetFields();
      this.nodeData={}
      this.all_property=[]
      this.color=""
    },
    // 修改节点  传过来的值有节点属性，节点属性
    modifyNode(e) {
      e.preventDefault();
      console.log(this.nodeData)
      console.log(this.node)
      this.modifyNodeForm.validateFields(async (err, values) => {
        if (!err) {
          console.log("the value of the form: ", values);
          if(values.label!==""){
          this.nodeData.labels = [values.label];}
          if(values.name!==""){
          this.nodeData.properties.name = values.name;
          }
        
        console.log("nodedata",this.nodeData)
          await UpdataNodeAPI({id:this.$store.getters.currentIndex,node:this.nodeData})
            .then((res) => {
              console.log(res)
            })
            .catch((err) => console.log(err));
          this.$emit("listenToModifiedNode",this.color,this.nodeData.identity,this.nodeData.properties.name,this.nodeData.labels)
          this.set_modifyNodeFormVisible(false);
          this.modifyNodeForm.resetFields();
          this.color="";
          this.nodeData={};
          this.all_property=[]
        } else {
          console.log(err);
        }
      });
    },
  },
};
</script>

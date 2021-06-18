<template>
  <div>
    <a-modal
      :visible="addNodePropertyFormVisible"
      title="增加属性"
      @cancel="cancelAddNodeProperty"
      @ok="addNodeProperties"
    >
      <a-form
        :form="NodePropertyForm"
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
    <div class="change_form">
      <a-modal
        :visible="addNodeFormVisible"
        title="增加节点"
        @cancel="cancelAddNode"
        @ok="addNode"
      >
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="addNode"
        >
          <a-form-item label="name">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input name of the node!',
                    },
                  ],
                },
              ]"
              placeholder="input name here"
            />
          </a-form-item>
          <a-form-item label="label">
            <a-input
              v-decorator="[
                'label',
                {
                  rules: [
                    {
                      required: false,
                      message: 'choose to input label of the node!',
                    },
                  ],
                },
              ]"
              placeholder="input label here!"
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
            <a-button
              @click="addNodeProperty"
              style="margin: 20px 0px 10px 100px"
              >增加属性</a-button
            >
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { AddNodeAPI } from "../api/api";

export default {
  name: "addNode",
  data() {
    return {
      addNodePropertyFormVisible: false,
      all_property: [],
      NodePropertyForm: this.$form.createForm(this, { name: "coordinated" }),
      nodeData: {
        identity: "",
        labels: [], // 标签
        properties: {
          name: "",
          // 属性（键值对）
        },
      },
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  computed: {
    ...mapGetters(["addNodeFormVisible","currentIndex"]),
  },
  props: {
    posX: String,
    posY: String,
  },
  methods: {
    ...mapMutations(["set_addNodeFormVisible"]),
    // 取消增加结点属性
    cancelAddNodeProperty() {
      this.addNodePropertyFormVisible = false;
      this.NodePropertyForm.resetFields();
      this.all_property = [];
    },
    // 点击跳出增加结点属性表单
    addNodeProperty() {
      this.addNodePropertyFormVisible = true;
    },
    // 点击增加结点属性
    addNodeProperties(e) {
      e.preventDefault();
      this.NodePropertyForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          var test1 = /^[0-9]+[\s\S]*$/;
          if (test1.test(values.key)) {
            alert("开头是数字");
          } else {
            this.nodeData.properties[values.key] = values.value;
          }
          this.all_property.push({
            title: values.key,
            value: values.value,
          });
          this.addNodePropertyFormVisible = false;
          this.NodePropertyForm.resetFields();
        }
      });
    },
    // 取消添加节点
    cancelAddNode() {
      this.set_addNodeFormVisible(false);
      this.form.resetFields();
      this.all_property = [];
    },
    // 添加节点
    addNode(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.nodeData.labels = [values.label];
          this.nodeData.properties.name = values.name;
          const pos = { x: this.posX, y: this.posY };
          const ele = {
            group: "nodes",
            data: {
              id: "",
              name: values.name,
              labels: values.label,
            },
            position: pos,
          };
          this.nodeData.properties.x = pos.x;
          this.nodeData.properties.y = pos.y;
          for (var key in this.nodeData.properties) {
            ele.data[key] = this.nodeData.properties[key];
          }
          console.log("nodeData", this.nodeData);
          await AddNodeAPI({'id':this.$store.getters.currentIndex,'node':this.nodeData})
            .then((res) => {
              console.log(res);
              ele.data.id = ""+res.content;
            })
            .catch((err) => console.log(err));
          console.log(ele)
          this.$emit("listenToAddedNode", ele);
          this.nodeData.properties = {
            name: "",
          };
          this.set_addNodeFormVisible(false);
          this.form.resetFields();
          this.all_property = [];
        }
      });
    },
  },
};
</script>
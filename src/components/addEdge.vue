<template>
<div>
    <!-- 增加边属性 -->
  <a-modal :visible="addEdgePropertyFormVisible" title="增加边属性" @cancel="cancelAddEdgeProperty" @ok="addEdgeProperties">
      <a-form :form="EdgePropertyForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
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
    <!-- 增加边 -->
  <a-modal
    :visible="addEdgeFormVisible"
    title="增加边"
    @cancel="cancelAddEdge"
    @ok="addEdge"
  >
    <a-form
      :form="edgeForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item label="name">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                { required: true, message: 'Please input name of the Edge!' },
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
import { AddEdgeAPI } from "../api/api";

export default {
  name: "addEdge",
  data() {
    return {
      addEdgePropertyFormVisible: false,
      EdgePropertyForm: this.$form.createForm(this, { name: "coordinated" }),
      all_property: [],
      edgeData: {
        identity: '',
        start: '',
        end: '',
        type: '',
        properties: {
        }
      },
      edgeForm: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  computed: {
    ...mapGetters(["addEdgeFormVisible"]),
  },
  props:{
      'sourceId':String,
      'targetId':String,
  },
  methods: {
    ...mapMutations(["set_addEdgeFormVisible"]),
    addEdgeProperty() {
      this.addEdgePropertyFormVisible = true;
    },
    cancelAddEdgeProperty(){
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
          console.log(this.all_property)
        //   console.log(this.edgeData);
          this.addEdgePropertyFormVisible = false;
          this.EdgePropertyForm.resetFields();
        }
      });
    },
    cancelAddEdge(){
      this.set_addEdgeFormVisible(false);
      this.edgeForm.resetFields();
      this.all_property = [];
      this.edgeData.start = "";
      this.edgeData.end = "";
      this.edgeData.type = "";
      this.edgeData.properties = {};
      this.edgeData.identity = "";
    },

    //增加边
    addEdge(e) {
      // console.log(e)
      e.preventDefault();
      this.edgeForm.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          console.log(this)
          this.edgeData.start = this.sourceId;
          this.edgeData.end = this.targetId;
          this.edgeData.type = values.name;
          const ele = {
            group: "edges",
            data: {
              id: "",
              name: this.edgeData.type,
              source: this.edgeData.start,
              target: this.edgeData.end,
            },
            properties: {},
          };
          // console.log(this.edgeData)
          for (var key in this.edgeData.properties) {
            ele.properties[key] = this.edgeData.properties[key];
          }
          console.log(this.edgeData);
          await AddEdgeAPI(this.edgeData)
            .then((res) => {
              console.log(res.content)
              ele.data.id = res.content + "";
              // console.log(ele)
            })
            .catch((err) => console.log(err));
          this.$emit('listenToAddedEdge',ele);  
          
          this.set_addEdgeFormVisible(false);
          this.edgeForm.resetFields();
          this.from = "";
          this.to = "";
          this.all_property = [];
          this.edgeData.start = "";
          this.edgeData.end = "";
          this.edgeData.type = "";
          this.edgeData.properties = {};
          this.edgeData.identity = "";
        }
      });
    },

  },
};
</script>
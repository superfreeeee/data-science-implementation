<template>
    <div :style="{ padding: '24px', minHeight: '360px'}" style="text-align: center;">
      <div style="margin-top: 50px; height: 100%; width: 80%;display:inline-block">
        <a-input-search placeholder="input search text" size="large"  style="border: 1px solid; border-radius:5px" @search="semanticS" />
        <div class = "answerPart" v-if="semanticAnswer.length != 0">
          <a-list item-layout="vertical" size="large" :data-source="semanticAnswer" style="text-align: center; ">
            <div slot="footer"><b>语义搜索</b></div>
            <a-list-item slot="renderItem" key="item.name" slot-scope="item, index">
              <img
                referrer="no-referrer|origin|unsafe-url"
                eferrerpolicy="no-referrer"
                slot="extra"
                width="272"
                alt="logo"
                :src= "item.pic"
              />
              <a-list-item-meta style="padding: 20px" :description="item.summary">
                <a slot="title" style='font-size:20px' :href="item.url">{{ item.name }}</a>
              </a-list-item-meta>
              <a-collapse v-model="activeKey" size="small" style="margin-top: 50px" :bordered="false">
                <a-collapse-panel v-for="(key, value) in item.property" :key="value" :header="value">
                  <p>{{ key }}</p>
                </a-collapse-panel>
              </a-collapse>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import infiniteScroll from 'vue-infinite-scroll';
  export default {
    name: "semanticsS",
    data(){
      return{
        listData:[]
      }
    },
    async mounted(){
    },
    beforeCreate() {
    },
    computed:{
      ...mapGetters([
        'semanticAnswer'
        ])
    },
    methods:{
        ...mapMutations([
        ]),
        ...mapActions([
          'getSemantics'
        ]),
        ...mapGetters([
        ]),
        async semanticS(value){
          await this.getSemantics(value)
        },
    }
  }
</script>

<style scoped>
 .answerPart{
   margin: 60px 40px;
 }

</style>

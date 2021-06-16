<template>
    <div :style="{ padding: '24px', minHeight: '360px'}" style="text-align: center;">
        <div style="margin-top: 50px; height: 100%; width: 80%;display:inline-block">
        <a-input-search placeholder="input search text" size="large"  @search="semanticS" />
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
      }
    },
    async mounted(){
    },
    beforeCreate() {
    },
    computed:{
      ...mapGetters([
        ])
    },
    methods:{
        ...mapMutations([
        ]),
        ...mapActions([
        ]),
        ...mapGetters([
        ]),
        semanticS(value){
            console.log(value)
        },
    }
  }
</script>

<style scoped>


</style>

import {
    getGraphDetailsAPI
  } from "../../api/graphDetails";
  
//   import {message} from "ant-design-vue";
  
  const graphDetails = {
    state: {
      graphDetailsVisible: false,
      graphDetailsList:[
  
      ]
    },
    mutations: {
        set_graphDetailsVisible: function (state, data) {
            // console.log(data)
        state.graphDetailsVisible = data
        console.log(state.graphDetailsVisible)
      },
      set_graphDetailsList:function (state,data) {
       state.graphDetailsList=data
      }
    },
    actions:{
        getGraphDetailsList:async ({commit})=>{
        const res=await getGraphDetailsAPI()
        if(res){
          commit('set_graphDetailsList',res.content)
        }
      }
    }
  }
  
  export default graphDetails
  
import {
  getGraphDetailsAPI
} from "../../api/graphDetails";

const filterByNodeLabels = {
    state: {
        filterByNodeLabelsVisible: false,
    },
    mutations: {
      set_filterByNodeLabelsVisible: function (state, data) {
            // console.log(data)
        state.filterByNodeLabelsVisible = data
        console.log(state.filterByNodeLabelsVisible)
      },
    //   set_graphDetailsList:function (state,data) {
    //    state.graphDetailsList=data
    //   }
    },
    actions:{
    //     getGraphDetailsList:async ({commit})=>{
    //     const res=await getGraphDetailsAPI()
    //     if(res){
    //       commit('set_graphDetailsList',res.content)
    //     }
    //   }
    
    }
  }
  
  export default filterByNodeLabels
  
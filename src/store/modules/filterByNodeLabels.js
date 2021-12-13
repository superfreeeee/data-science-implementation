import {
  getLabelsByGraphIdAPI
} from "../../api/graphDetails";

const filterByNodeLabels = {
    state: {
        filterByNodeLabelsVisible: false,
        graphLabelsList:[]
    },
    mutations: {
      set_filterByNodeLabelsVisible: function (state, data) {
            // console.log(data)
        state.filterByNodeLabelsVisible = data
        console.log(state.filterByNodeLabelsVisible)
      },
      set_graphLabelsList:function (state,data) {
       state.graphLabelsList=data
      }
    },
    actions:{
       async getLabelsByGraphId({commit}){
        const res=await getLabelsByGraphIdAPI({graphId:this.getters.currentIndex})
        if(res){
          commit('set_graphLabelsList',res.content)
          console.log("labels",res.content)
        }
       }
    
    }
  }
  
  export default filterByNodeLabels
  
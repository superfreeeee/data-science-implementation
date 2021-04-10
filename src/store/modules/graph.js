import {
    getHistoryAPI
  } from "../../api/history";
  
  const graph = {
    state: {
      graphList:{
      },
      cyinfo:{}
    },
    mutations: {
      set_graphList: function (state, data) {
        state.graphList = data
      },
      set_cyinfo: function (state, data) {
        state.cyinfo = data
      }  
    },
    actions:{
      saveGraphToEnd: async ({state})=>{
          console.log(this.cyinfo.nodes())
        // const res = await getHistoryAPI()
        // console.log(res)
        // if(res){
        //   commit('set_historyList',res.content)
        // }
      }
    }
  }
  
  export default graph
  
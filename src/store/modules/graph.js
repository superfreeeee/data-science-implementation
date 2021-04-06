import {
    getHistoryAPI
  } from "../../api/history";
  
  const graph = {
    state: {
    },
    mutations: {  
    },
    actions:{
      setGraphToEnd: async ({})=>{
          console.log('here')
        // const res = await getHistoryAPI()
        // console.log(res)
        // if(res){
        //   commit('set_historyList',res.content)
        // }
      }
    }
  }
  
  export default graph
  
import {
  getHistoryAPI
} from "../../api/history";

const history = {
  state: {
    historyVisible: false,
    historyList:[

    ]
  },
  mutations: {
    set_historyVisible: function (state, data) {
      state.historyVisible = data
    },
    set_historyList:function (state,data) {
     state.historyList=data
    }

  },
  actions:{
    getHistoryList:async ({commit})=>{
      const res=await getHistoryAPI()
      console.log(res)
      if(res){
        commit('set_historyList', res.content)
      }
    }
  }
}

export default history

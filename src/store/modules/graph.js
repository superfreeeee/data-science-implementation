import {
  UpdataNodeAPI
} from "../../api/api";

const graph = {
  state: {
    NodeList:[]
  },
  mutations: {
  },
  actions:{
    updateNodePos: async ({state}, data)=>{
      for(const node of data){
        if(node.data()){
          var nodePro = {}
          var nodeInfo = node.data()
          for(var item in nodeInfo){
            if(item !== 'id'){
              nodePro[item] = nodeInfo[item]
            }
          }
          nodePro.x = node.position().x
          nodePro.y = node.position().y
          var NodeData = {
            identity: nodeInfo.id,
            labels: node.labels == undefined ? [] : node.labels,
            properties: nodePro
          }
          await UpdataNodeAPI(NodeData).then(res => {
            // console.log(res)
          }).catch(err => console.log(err))
        }
      }
    }
  }
}

export default graph
  
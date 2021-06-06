import {
  UpdataNodeAPI,
  getGraphAPI
} from "../../api/api";

const graph = {
  state: {
    graphList:[],
    isInit:true
  },
  mutations: {
    set_graphList:function(state,data){
      state.graphList=data
    },
    set_isInit:function(state,data){
      state.isInit=data
    }
  },
  actions:{
    updateNodePos: async ({state}, data)=>{
      // console.log("update",data)
      for(const node of data){
        if(node.data()){
          var nodePro = {}
          var nodeInfo = node.data()
          // console.log("nodeInfo",nodeInfo)
          for(var item in nodeInfo){
            if(item !== 'id' && item !=='labels'){
              var n=nodeInfo[item]
              n=n.replaceAll('&quot;','\\"')
              nodePro[item]=n
              // nodePro[item] = nodeInfo[item]
            }
          }
          nodePro.x = node.position().x
          nodePro.y = node.position().y
          var NodeData = {
            identity: nodeInfo.id,
            labels: node.labels == undefined ? [] : node.labels,
            properties: nodePro
          }
          console.log("nodedata",NodeData)
          await UpdataNodeAPI(NodeData).then(res => {
            console.log("id",NodeData.identity)
            console.log(res)
          }).catch(err => console.log(err))
        }
      }
    },

    getGraph: async({commit}) =>{
      var graph = {}
      var isInit=true
      var graphList=[]
      await getGraphAPI().then(res => {
        graph = res.content
        console.log(graph)
      }).catch(err => console.log(err))
      var ele=[]
      var nodes = graph.nodes
      var edges = graph.edges
      // 节点
      for (var n in nodes) {
        var node = nodes[n]
        const data = {}
        if (node.properties) {
          for (var key in node.properties) {
            data[key] = node.properties[key]
          }
        } else {
          data.name = ''
        }
        data.id = node.identity
        data.labels=node.labels
        const toBeAdded={
          group: 'nodes',
          data,
        }
        console.log('xy',node.properties.x,node.properties.y)
        if(node.properties.x!=null && node.properties.y!=null){
          toBeAdded.position={
            x: parseFloat(node.properties.x),
            y: parseFloat(node.properties.y)
          }
        }else{
            isInit=false
            commit("set_isInit",isInit)
        }
        graphList.push(toBeAdded)
      }
      // 边
      for (var e in edges) {
        var edge = edges[e]
        const data = {}
        if (edge.properties) {
          for (var keyE in edge.properties) {
            if (keyE !== 'type') {
              data[keyE] = edge.properties[keyE]
            }
          }
        }
        data.id = edge.identity
        data.source = edge.start
        data.target = edge.end
        data.name = edge.type
        const toBeAdded={
          group:'edges',
          data
        }
        graphList.push(toBeAdded)
      }
      console.log(isInit)
      commit("set_graphList",graphList)
    },
  }
}

export default graph
  
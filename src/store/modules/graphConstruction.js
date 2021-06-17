import {
    getGraphByIdAPI,
    getConstructionDetailAPI
} from '../../api/graphConstruction'

const graphConstruction = {
    state: {
        preConstructGraph: [],
        latestConstructGraph: [],
        elesToBeAdded:[]
    },
    mutations: {
        set_preConstructGraph(state, data) {
            state.preConstructGraph = data
        },
        set_latestConstructGraph(state, data) {
            state.latestConstructGraph = data
        },
        set_elesToBeAdded(state,data){
            state.elesToBeAdded=data
        },
        set_graphConstructId(state,data){
            state.graphConstructId=data
        }
    },
    actions: {
        async getGraphById({commit}) {
            var graphId=this.getters.graphConstructId
            console.log("getGraphById")
            var graph = {}
            await getGraphByIdAPI({ id: graphId })
                .then((res) => {
                    console.log("res",res)
                    graph = res.content
                })
                .catch((err) => { console.log(err) })
            console.log("graph",graph)
            var graphList = []
            var nodes=graph.nodes
            var edges=graph.edges
            for(var n in nodes){
                var node=nodes[n]
                const data = {}
                if (node.properties) {
                    for (var key in node.properties) {
                        data[key] = node.properties[key]
                    }
                } else {
                    data.name = ''
                }

                const toBeAdded = {
                    group: 'nodes',
                    data,
                    classes: "" + node.cls
                }
                if (node.properties.x != null && node.properties.y != null) {
                    toBeAdded.position = {
                        x: parseFloat(node.properties.x),
                        y: parseFloat(node.properties.y)
                    }
                } else {
                    // isInit = false
                    console.log("firstLoad")
                }
                graphList.push(toBeAdded)
            }

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
                const toBeAdded = {
                    group: 'edges',
                    data
                }
                graphList.push(toBeAdded)
            }
            console.log("graphList",graphList)
            // graphList放入latestConstructGraph
            // 获得preConstructGraph,比较，不一样的放入elesToBeAdded
            var eles=[]
            commit('set_latestConstructGraph',graphList)
            var preGraph=this.getters.preConstructGraph
            console.log(preGraph)
            for(var item in graphList){
                if(preGraph.indexOf(graphList[item])<=-1){
                    eles.push(graphList[item])
                }
            }
            console.log(eles)
            commit('set_elesToBeAdded',eles)
        },
        async getConstructionDetail(){
            await getConstructionDetailAPI()
            .then((res) => {
                console.log("res",res)
            })
            .catch((err) => { console.log(err) })
        }
    }

}
export default graphConstruction
import {
  UpdataNodeAPI,
  getGraphListAPI,
  removeGraphAPI,
  getGraphByNodeAPI,
} from '../../api/api';
import {
  fileToGraphAPI,
  getGraphByNameAPI,
  recommendFromFileAPI,
} from '../../api/graph';
import { transformGraphData } from '../../utils/transformer';

const graph = {
  state: {
    currentIndex: 0,
    graphNumber: 0,
    getGraphByNodeId: 0,
    graphIndexList: [],
    allGraphList: [],
    isInitList: false,
    recommendGraphs: [],
  },
  mutations: {
    set_currentIndex: function (state, data) {
      state.currentIndex = data;
    },
    set_graphNumber: function (state, data) {
      state.graphNumber = data;
    },
    set_allGraphList: function (state, data) {
      state.allGraphList = data;
    },
    set_graphIndexList: function (state, data) {
      state.graphIndexList = data;
    },
    set_isInitList: function (state, data) {
      state.isInitList = data;
    },
    set_getGraphByNodeId: function (state, data) {
      state.getGraphByNodeId = data;
    },
    set_recommendGraphs(state, newGraphs) {
      state.recommendGraphs = [...state.recommendGraphs, newGraphs];
    },
  },
  actions: {
    async updateNodePos({ state }, data) {
      // console.log("update",data)
      for (const node of data) {
        if (node.data()) {
          var nodePro = {};
          var nodeInfo = node.data();
          // console.log("nodeInfo",nodeInfo)
          for (var item in nodeInfo) {
            if (item !== 'id' && item !== 'labels') {
              var n = nodeInfo[item];
              n = n.replaceAll('&quot;', '\\"');
              nodePro[item] = n;
              // nodePro[item] = nodeInfo[item]
            }
          }
          nodePro.x = node.position().x;
          nodePro.y = node.position().y;
          var NodeData = {
            identity: nodeInfo.id,
            labels: node.labels == undefined ? [] : node.labels,
            properties: nodePro,
          };
          await UpdataNodeAPI({ id: this.getters.currentIndex, node: NodeData })
            .then((res) => {
              console.log('id', NodeData.identity);
              console.log(res);
            })
            .catch((err) => console.log(err));
        }
      }
    },

    getGraph: async ({ commit }) => {
      var graph = {};
      //   var isInit=true //??????
      var allGraphList = {}; //?????????????????????map
      var graphNumber = 0; //????????????
      var graphIndexList = []; //??????index
      var isInitList = {}; //????????????????????????
      await getGraphListAPI()
        .then((res) => {
          graph = res.content;
          console.log('[getGraph] graph', graph);
        })
        .catch((err) => console.log(err));

      for (var item in graph) {
        graphNumber = graphNumber + 1;
        var isInit = true;
        var graphList = [];

        // console.log(graph[item])
        var graphTemp = graph[item];
        var nodes = graphTemp.nodes;
        var edges = graphTemp.edges;
        var index = graphTemp.id;
        graphIndexList.push(index);
        isInitList[index] = isInit;

        // nodes
        for (var n in nodes) {
          var node = nodes[n];
          const data = {};
          if (node.properties) {
            for (var key in node.properties) {
              data[key] = node.properties[key];
            }
          } else {
            data.name = '';
          }
          data.id = node.identity;
          data.labels = node.labels;
          const toBeAdded = {
            group: 'nodes',
            data,
            classes: '' + node.cls,
          };

          if (node.properties.x != null && node.properties.y != null) {
            toBeAdded.position = {
              x: parseFloat(node.properties.x),
              y: parseFloat(node.properties.y),
            };
          } else {
            isInit = false;
            isInitList[index] = false;
          }
          graphList.push(toBeAdded);
        }
        // edge
        for (var e in edges) {
          var edge = edges[e];
          const data = {};
          if (edge.properties) {
            for (var keyE in edge.properties) {
              if (keyE !== 'type') {
                data[keyE] = edge.properties[keyE];
              }
            }
          }
          data.id = edge.identity;
          data.source = edge.start;
          data.target = edge.end;
          data.name = edge.type;
          const toBeAdded = {
            group: 'edges',
            data,
          };
          graphList.push(toBeAdded);
        }

        // {"1":graphList,"2":graphList,..}
        allGraphList[index] = graphList;
      }
      console.log('all_graphList', allGraphList);
      console.log(graphNumber);
      console.log(graphIndexList);
      commit('set_allGraphList', allGraphList);
      commit('set_graphNumber', graphNumber);
      commit('set_graphIndexList', graphIndexList);
      commit('set_isInitList', isInitList);
    },
    // ?????????
    async removeGraph(_, graphId) {
      // console.log("item", graphId)
      await removeGraphAPI({ id: graphId })
        .then((res) => {
          console.log('??????', res);
        })
        .catch((err) => console.log(err));
    },
    // ????????????id???????????????
    async getNewGraph({ commit }, nodeId) {
      let graph = {};
      await getGraphByNodeAPI({ id: nodeId })
        .then((res) => {
          graph = res.content;
        })
        .catch((err) => console.log(err));
      const { graphList, isInit, index } = transformGraphData(graph);

      const { allGraphList, graphNumber, graphIndexList, isInitList } =
        this.getters;
      // ??????????????????allGraphList
      allGraphList[index] = graphList;
      commit('set_allGraphList', allGraphList);
      // ???????????????
      commit('set_graphNumber', graphNumber + 1);
      // ??????index?????????graphIndexList
      commit('set_graphIndexList', [...graphIndexList, index]);
      // ??????????????????index????????????index
      commit('set_currentIndex', index);
      // ??????????????????????????????isInitList
      isInitList[index] = isInit;
      commit('set_isInitList', isInitList);
    },
    // ??????????????????????????????
    async getNewGraphByFile({ commit }, file) {
      try {
        const { content: graph } = await fileToGraphAPI(file);
        console.log('[getNewGraphByFile] get graph', graph);

        const { graphList, isInit, index } = transformGraphData(graph);

        console.log('[getNewGraphByFile] graphList =', graphList);

        const { allGraphList, graphNumber, graphIndexList, isInitList } =
          this.getters;
        // ??????????????????allGraphList
        allGraphList[index] = graphList;
        commit('set_allGraphList', allGraphList);
        // ???????????????
        commit('set_graphNumber', graphNumber + 1);
        // ??????index?????????graphIndexList
        commit('set_graphIndexList', [...graphIndexList, index]);
        // ??????????????????index????????????index
        commit('set_currentIndex', index);
        // ??????????????????????????????isInitList
        isInitList[index] = isInit;
        commit('set_isInitList', isInitList);
      } catch (e) {
        console.log(`[getNewGraphByFile] fail`, e);
      }
    },
    // ??????????????????????????????
    async getRecommendFIles({ commit }, file) {
      try {
        const res = await recommendFromFileAPI(file);
        console.log('[getRecommendFIles] res', res);
        if (!res.success) {
          throw new Error(res);
        }

        const newGraphs = {
          input: file,
          recommendList: [...res.content],
        };

        commit('set_recommendGraphs', newGraphs);
      } catch (e) {
        console.log('[getRecommendFIles] fail', e);
      }
    },
    // ???????????????????????????????????????
    async getGraphByName({ commit }, graphName) {
      try {
        const { content: graph } = await getGraphByNameAPI(graphName);
        console.log('[getGraphByName] get graph', graph);

        const { graphList, isInit, index } = transformGraphData(graph);

        console.log('[getGraphByName] graphList =', graphList);

        const { allGraphList, graphNumber, graphIndexList, isInitList } =
          this.getters;
        // ??????????????????allGraphList
        allGraphList[index] = graphList;
        commit('set_allGraphList', allGraphList);
        // ???????????????
        commit('set_graphNumber', graphNumber + 1);
        // ??????index?????????graphIndexList
        commit('set_graphIndexList', [...graphIndexList, index]);
        // ??????????????????index????????????index
        commit('set_currentIndex', index);
        // ??????????????????????????????isInitList
        isInitList[index] = isInit;
        commit('set_isInitList', isInitList);
      } catch (e) {
        console.log(`[getGraphByName] fail`, e);
      }
    },
  },
};

export default graph;

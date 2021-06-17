const getters={
  historyVisible:state=>state.history.historyVisible,
  historyList:state=>state.history.historyList,
  //file
  uploadFormVisible:state=>state.file.uploadFormVisible,
  fileList:state=>state.file.fileList,
  //setting
  settingVisible: state=>state.setting.settingVisible,
  // graphList:state=>state.graph.graphList,
  //知识图谱详细信息
  graphDetailsVisible:state=>state.graphDetails.graphDetailsVisible,
  graphDetailsList:state=>state.graphDetails.graphDetailsList,
  filterByNodeLabelsVisible: state=>state.filterByNodeLabels.filterByNodeLabelsVisible,
  //知识图谱边节点信息
  graphList:state=>state.graph.graphList,
  isInit:state=>state.graph.isInit,
  currentIndex:state=>state.graph.currentIndex,//当前图index
  graphNumber:state=>state.graph.graphNumber,//图的总数量
  allGraphList:state=>state.graph.allGraphList,//存放所有图的map
  graphIndexList:state=>state.graph.graphIndexList,//存放所有的index
  //添加边
  addEdgeFormVisible:state=>state.edge.addEdgeFormVisible,
  // 修改边
  modifyEdgeFormVisible:state=>state.edge.modifyEdgeFormVisible,
  // 删除边
  edgeId:state=>state.edge.edgeId,
  // 删除节点
  nodeId:state=>state.node.nodeId,
  // 添加节点
  addNodeFormVisible:state=>state.node.addNodeFormVisible,
  // 修改节点
  modifyNodeFormVisible:state=>state.node.modifyNodeFormVisible,
  nodeProperties:state=>state.node.nodeProperties,
  //question
  // questionVisible: state=>state.question.questionVisible,
  answer: state=>state.question.answer,
  recommand_list: state=>state.question.recommand_list,
  semanticAnswer:state=>state.question.semanticAnswer
}

export default getters

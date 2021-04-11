const getters={
  historyVisible:state=>state.history.historyVisible,
  historyList:state=>state.history.historyList,
  //file
  uploadFormVisible:state=>state.file.uploadFormVisible,
  fileList:state=>state.file.fileList,
  //知识图谱详细信息
  graphDetailsVisible:state=>state.graphDetails.graphDetailsVisible,
  graphDetailsList:state=>state.graphDetails.graphDetailsList,
  filterByNodeLabelsVisible: state=>state.filterByNodeLabels.filterByNodeLabelsVisible
}

export default getters

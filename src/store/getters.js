const getters={
  historyVisible:state=>state.history.historyVisible,
  historyList:state=>state.history.historyList,
  //file
  uploadFormVisible:state=>state.file.uploadFormVisible,
  fileList:state=>state.file.fileList,
  //setting
  settingVisible: state=>state.setting.settingVisible,
  graphList:state=>state.graph.graphList,
  //知识图谱详细信息
  graphDetailsVisible:state=>state.graphDetails.graphDetailsVisible,
  graphDetailsList:state=>state.graphDetails.graphDetailsList,
  filterByNodeLabelsVisible: state=>state.filterByNodeLabels.filterByNodeLabelsVisible,
  //question
  questionVisible: state=>state.question.questionVisible,
  answer: state=>state.question.answer
}

export default getters

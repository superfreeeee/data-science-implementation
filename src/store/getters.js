const getters={
  historyVisible:state=>state.history.historyVisible,
  historyList:state=>state.history.historyList,
  //file
  uploadFormVisible:state=>state.file.uploadFormVisible,
  fileList:state=>state.file.fileList,
  //setting
  settingVisible: state=>state.setting.settingVisible,
  settingList: state=>state.setting.settingList,
  graphList:state=>state.graph.graphList,
  cyinfo:state=>state.graph.cyinfo
}

export default getters

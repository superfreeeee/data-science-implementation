import {
  uploadFileAPI
} from "../../api/api"

const file = {
  state:{
    uploadFormVisible:false
  },
  mutations:{
    set_uploadFormVisible(state,data){
      state.uploadFormVisible=data
    }
  }
}
export default file
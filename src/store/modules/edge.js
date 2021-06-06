//边增删改
import {DeleteEdgeAPI, updateEdgeAPI, AddEdgeAPI} from "../../api/api"

const edge={
    state:{
        addEdgeFormVisible:false,
        modifyEdgeFormVisible:false,
        edgeId:""
    },
    mutations:{
        set_addEdgeFormVisible(state,data){
            state.addEdgeFormVisible=data;
        },
        set_modifyEdgeFormVisible(state,data){
            state.modifyEdgeFormVisible=data;
        },
        set_edgeId(state,data){
            state.edgeId=data
        }
    },
    actions:{
        async removeEdges(){
            var params=this.getters.edgeId
            await DeleteEdgeAPI({identity:params})
            .then((res) => {
              console.log(res)
            })
            .catch((err) => console.log(err));
        },
      
    }
}
export default edge
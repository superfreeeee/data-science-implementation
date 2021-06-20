// 节点的增删改
import{UpdataNodeAPI, DeleteNodeAPI} from "../../api/api"

const node={
    state:{
        nodeId:"",
        addNodeFormVisible:false,
        modifyNodeFormVisible:false,
        nodeProperties:[]
    },
    mutations:{
        set_nodeId(state,data){
            state.nodeId=data
        },
        set_addNodeFormVisible(state,data){
            state.addNodeFormVisible=data
        },
        set_modifyNodeFormVisible(state,data){
            state.modifyNodeFormVisible=data
        },
        set_nodeProperties(state,data){
            state.nodeProperties=data
        }
    },
    actions:{
        async removeNodes(){
            console.log(this.getters.nodeId)
            console.log(this.getters.currentIndex)
            await DeleteNodeAPI({identity: this.getters.nodeId,graphId:this.getters.currentIndex})
            .then((res) => {
              console.log(res)
            })
            .catch((err) => console.log(err));
        }
    }
}
export default node
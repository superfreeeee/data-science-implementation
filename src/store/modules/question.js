import {
    getAnswerAPI
} from "../../api/question"

const question = {
    state: {
        answer: "",
        recommand_list:[
            "whoareyou",
            "whoelikeyou",
            "whorecomandyou"
        ],
    },
    mutations: {
        // set_questionVisible: function (state, data) {
        //     state.questionVisible = data
        // },
        set_answer: function(state, data){
            state.answer = data
        },
        set_recommand: function(state, data){
            state.recommand_list = data
        }
    },
    actions:{
        getAnswer: async ({commit}, data)=>{
            await getAnswerAPI(data).then(res => {
                commit('set_answer', res)
            }).catch(err => console.log(err))
        },
        getRecommand: ({commit}, data)=>{
            var res = [
                "RCM1"+data,
                "RCM2"+data,
                "RCM3"+data,
                "RCM4"+data
            ]
            commit('set_recommand', res)
        }
    }
}

export default question

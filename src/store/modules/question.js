import {
    getAnswerAPI,
    semanticSearchAPI
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
            await semanticSearchAPI(data).then(res => {
                getAnswerAPI(res).then(res1 => {
                    commit('set_answer', res1.content.smartQA)
                }).catch(err => console.log(err))
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

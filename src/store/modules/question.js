import {
    getAnswerAPI
} from "../../api/question"

const question = {
    state: {
        questionVisible: false,
        answer: ""
    },
    mutations: {
        set_questionVisible: function (state, data) {
            state.questionVisible = data
        },
        set_answer: function(state, data){
            state.answer = data
        }
    },
    actions:{
        // getAnswer: async ({commit}, data)=>{
        //     await getAnswerAPI(data).then(res => {
        //         commit('set_answer', res)
        //     }).catch(err => console.log(err))
        // }
        getAnswer: ({commit}, data)=>{
            var value = data + 'Answer'
            commit('set_answer', value)
        }
    }
}

export default question

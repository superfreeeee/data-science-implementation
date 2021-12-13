import {
    getAnswerAPI,
    semanticSearchAPI,
    getRecommandAPI
} from "../../api/question"

const question = {
    state: {
        answer: "",
        recommand_list:['新冠，整体预防措施', '手足口病'
        ],
        semanticAnswer: [],
        Answer: ""
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
        },
        set_semanticSearchAnswer: function(state, data){
            state.semanticAnswer = data
        },
        set_semanticAnswer: function(state, data){
            state.Answer = data
        }
    },
    actions:{
        getAnswer: async ({commit}, data)=>{
            // await semanticSearchAPI(data).then(res => {
            //     console.log('seman', res)
            //     getAnswerAPI(res.content.smartQA).then(res1 => {
            //         console.log('answer', res1)
            //         commit('set_answer', res1.message)
            //     }).catch(err => console.log(err))
            // }).catch(err => console.log(err))
            await getAnswerAPI(data).then(res => {
                // console.log(res)
                commit('set_answer', res.content.replace('\\n', '\n'))                
            }).catch(err => console.log(err))
        },
        getSemantics: async({commit}, data)=>{
            commit('set_semanticAnswer', "")
            await semanticSearchAPI(data).then(res => {
                console.log(res)
                var list_of_value = []
                for(var item in res.content.semanticStatement[0]){
                    var context = res.content.semanticStatement[0][item]
                    if(context && "polysemantNamedEntities" in context && context.polysemantNamedEntities){
                        if(context.polysemantNamedEntities.length != 0){
                            var imgPic = ""
                            if(context.polysemantNamedEntities[0].picSrc) {
                                if(context.polysemantNamedEntities[0].picSrc[0]=="H" || context.polysemantNamedEntities[0].picSrc[0]=="h"){
                                    imgPic = context.polysemantNamedEntities[0].picSrc
                                }
                            }
                            list_of_value.push({
                                'name': context.name,
                                'url': context.polysemantNamedEntities[0].entityUrl ? context.polysemantNamedEntities[0].entityUrl : '',
                                'pic': imgPic!="" ? context.polysemantNamedEntities[0].picSrc : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
                                'summary': context.polysemantNamedEntities[0].lemmaSummary,
                                'property': context.polysemantNamedEntities[0].dataProperties
                            })
                        }
                    }
                }
                if(list_of_value.length==0){
                    list_of_value.push({
                        'name': '没有搜索到有效信息，换个关键词搜索试试吧！',
                        'url': '',
                        'pic': 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
                        'summary': '',
                        'property': null
                    })
                }
                console.log(list_of_value)
                commit('set_semanticSearchAnswer', list_of_value)
                var content = "很抱歉，这个问题没有回答"
                if(res.content.queryResults[0].answers[0].content) {
                    content = res.content.queryResults[0].answers[0].content
                }
                commit('set_semanticAnswer', content)
            }).catch(err=>console.log(err))
            // await commit('set_semanticSearchAnswer', listData)
        },
        getRecommand: async ({commit}, data)=>{
            await getRecommandAPI(data).then(res => {
                commit('set_recommand', res.content)
            }).catch(err => console.log(err))
        }
    }
}

export default question

import {
    getAnswerAPI,
    semanticSearchAPI,
    getRecommandAPI
} from "../../api/question"

const question = {
    state: {
        answer: "",
        recommand_list:[
        ],
        semanticAnswer: []
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
        }
    },
    actions:{
        getAnswer: async ({commit}, data)=>{
            await semanticSearchAPI(data).then(res => {
                getAnswerAPI(res.content.smartQA).then(res1 => {
                    console.log(res1)
                    commit('set_answer', res1.content)
                }).catch(err => console.log(err))
                console.log(res.data)
            }).catch(err => console.log(err))
            // getAnswerAPI(data).then(res1 => {
            //     console.log(res1)
            //     commit('set_answer', res1.content)
            // }).catch(err => console.log(err))
        },
        getSemantics: async({commit}, data)=>{
            await semanticSearchAPI(data).then(res => {
                console.log(res)
                var list_of_value = []
                for(var item in res.content.semanticStatement[0]){
                    var context = res.content.semanticStatement[0][item]
                    if(context && "polysemantNamedEntities" in context && context.polysemantNamedEntities){
                        if(context.polysemantNamedEntities.length != 0){
                            list_of_value.push({
                                'name': context.name,
                                'url': context.polysemantNamedEntities[0].entityUrl ? context.polysemantNamedEntities[0].entityUrl : '',
                                'pic': context.polysemantNamedEntities[0].picSrc ? context.polysemantNamedEntities[0].picSrc : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
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

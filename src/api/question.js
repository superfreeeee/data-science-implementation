import http from '@/utils/http'

const api={
  QuestionPre:'/api/question'
}

export function getAnswerAPI(params) {
  return http.get(`${api.QuestionPre}/answerQuestion`,params)
}

export function semanticSearchAPI(params) {
  return http.get(`${api.QuestionPre}/semanticSearch`,params)
}
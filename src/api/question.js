import http from '@/utils/http'

const api={
  QuestionPre:'/api/question'
}

export function getAnswerAPI(params) {
  return http.get(`${api.QuestionPre}/getAnswer`,params)
}

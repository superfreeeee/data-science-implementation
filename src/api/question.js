import http from '@/utils/http'

const api={
  QuestionPre:'/api/question'
}

export function getAnswerAPI(params) {
  const pa = {
    'question': params
  }
  return http.get(`${api.QuestionPre}/answerQuestion`, pa)
}

export function getRecommandAPI(params) {
  const pa = {
    'question': params
  }
  return http.get(`${api.QuestionPre}/recommendQue`, pa)
}

export function semanticSearchAPI(params) {
  const pa = {
    'question': params
  }
  return http.get(`${api.QuestionPre}/semanticSearch`,pa)
}

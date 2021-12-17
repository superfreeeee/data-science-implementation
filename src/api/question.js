import http from '@/utils/http';
import { DEV_QA_SERVER_HOST } from '../common/config';

const api = {
  QuestionPre: '/api/question',
};

export function getAnswerAPI(params) {
  const pa = {
    question: params,
  };
  return http.get(`${DEV_QA_SERVER_HOST}${api.QuestionPre}/answerQuestion`, pa);
}

export function getRecommandAPI(params) {
  const pa = {
    question: params,
  };
  return http.get(`${api.QuestionPre}/recommendQue`, pa);
}

export function semanticSearchAPI(params) {
  const pa = {
    question: params,
  };
  return http.get(`${api.QuestionPre}/semanticSearch`, pa);
}

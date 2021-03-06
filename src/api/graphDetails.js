import http from '@/utils/http';

const api = {
  historyPre: '/api/graph',
};

export function getGraphDetailsAPI(params) {
  return http.get(`${api.historyPre}/getStatistics`, params);
}
export function getLabelsByGraphIdAPI(params) {
  return http.get(`${api.historyPre}/getLabelsByGraphId`, params);
}

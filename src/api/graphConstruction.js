import http from '../utils/http';

const api = {
  constructionPre: '/api/graph',
};

// params: { pageNum: number, startUrl: string }
export function constructGraphAPI(params) {
  return http.get(`${api.constructionPre}/constructGraph`, params);
}

// no params
export function getConstructionDetailAPI() {
  return http.get(`${api.constructionPre}/getConstructionDetail`);
}

export function stopConstructionAPI() {
  return http.get(`${api.constructionPre}/stopConstruction`);
}

// no params
export function getGraphByIdAPI() {
  return http.get(`${api.constructionPre}/getConstructionGraph`);
}

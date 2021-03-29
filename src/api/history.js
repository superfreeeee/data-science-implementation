import http from '@/utils/http'

const api={
  historyPre:'/api/history'
}

export function getHistoryAPI(params) {
  return http.get(`${api.historyPre}/getHistory`,params)
}

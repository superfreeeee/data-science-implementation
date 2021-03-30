import http from '@/utils/http'

const api={
  filePre:'/api/file'
}

export function uploadFileAPI(params){
  return http.post(`${api.filePre}/uploadFile`,params)
}

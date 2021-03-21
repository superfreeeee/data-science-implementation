import http from '../utils/http'

const request = '/coin/api'

export function getListAPI (params) {
  return http.get(`${request}/test`, params)
}

export function AddNodeAPI (params) {
  return http.post(`${request}/node/addNode`, params)
}

export function DeleteNodeAPI (params) {
  return http.post(`${request}/node/deleteNode`, params)
}

export function UpdataNodeAPI (params) {
  return http.post(`${request}/node/updateNode`, params)
}

export function DownloadXmlAPI (params) {
  return http.get(`${request}/graph/exportXml`, params)
}
export function DeleteEdgeAPI (params) {
  return http.post(`${request}/relation/deleteRelation`, params)
}
export function updateEdgeAPI (params) {
  return http.post(`${request}/relation/updateRelation`, params)
}
export function AddEdgeAPI (params) {
  return http.post(`${request}/relation/addRelation`, params)
}

export function getGraphAPI () {
  return http.get('/api/graph/getGraph')
}

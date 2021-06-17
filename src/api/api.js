import http from '../utils/http'

const request = '/api'

export function getListAPI (params) {
  return http.get(`${request}/test`, params)
}

export function AddNodeAPI (params) {
  return http.post(`${request}/node/addNode`, params)
}

export function DeleteNodeAPI (params) {
  return http.get(`${request}/node/deleteNode`, params)
}

export function UpdataNodeAPI (params) {
  return http.post(`${request}/node/updateNode`, params)
}

export function DownloadXmlAPI (params) {
  return http.get(`${request}/graph/exportXml`, params)
}
export function DeleteEdgeAPI (params) {
  return http.get(`${request}/relation/deleteRelation`,params)
}
export function updateEdgeAPI (params) {
  return http.post(`${request}/relation/updateRelation`, params)
}
export function AddEdgeAPI (id,params) {
  return http.post(`${request}/relation/addRelation?graph_id=${id}`, params)
}
export function getGraphListAPI () {
  return http.get(`${request}/graph/getGraphList`)
}
export function filterByNodeLabelsAPI(params){
  return http.post(`${request}/graph/filterByNodeLabels`,params)
}

export function uploadFileAPI(params){
  return http.post(`${request}/graph/uploadFile`,params)
}

export function getNodesListAPI(){
  return http.get(`${request}/getNodesList`)
}

export function removeGraphAPI(params){
  return http.get(`${request}/graph/removeGraph`,params)
}

export function getGraphByNodeAPI(params){
  return http.get(`${request}/graph/getGraphByNode`,params)
}
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

import http from '../utils/http'

const request = '/coin'

export function getListAPI (params) {
  return http.get(`${request}/test`, params)
}

export function AddNodeAPI (params) {
  return http.post(`${request}/addNode`, params)
}

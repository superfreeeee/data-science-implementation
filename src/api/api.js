import http from '../utils/http';

const request = '/api';

export function getListAPI(params) {
  return http.get(`${request}/test`, params);
}

export function AddNodeAPI(params) {
  return http.post(`${request}/node/addNode?graphId=${params.id}`, params.node);
}

export function DeleteNodeAPI(params) {
  return http.get(`${request}/node/deleteNode`, params);
}

export function UpdataNodeAPI(params) {
  return http.post(
    `${request}/node/updateNode?graphId=${params.id}`,
    params.node
  );
}

// no params
export function DownloadXmlAPI() {
  return http.get(`${request}/graph/exportXml`);
}

export function DeleteEdgeAPI(params) {
  return http.get(`${request}/relation/deleteRelation`, params);
}
export function updateEdgeAPI(params) {
  return http.post(
    `${request}/relation/updateRelation?graphId=${params.id}`,
    params.edge
  );
}
export function AddEdgeAPI(params) {
  return http.post(
    `${request}/relation/addRelation?graphId=${params.id}`,
    params.edge
  );
}
export function getGraphListAPI() {
  return http.get(`${request}/graph/getGraphList`);
}

// query: graphId: number
// data: labels
export function filterByNodeLabelsAPI(params) {
  return http.post(
    `${request}/graph/filterByNodeLabels?graphId=${params.id}`,
    params.labels
  );
}

export function uploadFileAPI(params) {
  return http.post(`${request}/graph/uploadFile`, params);
}

export function getNodesListAPI() {
  return http.get(`${request}/node/getNodesList`);
}

export function removeGraphAPI(params) {
  return http.get(`${request}/graph/removeGraph`, params);
}

export function getSearchNodeListAPI() {
  return http.get(`${request}/node/getSearchNodes`);
}

export function getGraphByNodeAPI(params) {
  return http.get(`${request}/graph/getGraphByNode`, params);
}

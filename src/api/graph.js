import http from '../utils/http';

const GRAPH_PREFIX = '/api/graph';

/**
 * 上传文件生成图谱
 */
export function fileToGraphAPI(file) {
  const formData = new FormData();
  formData.set('file', file);

  console.log('[fileToGraphAPI] file', file);

  return http.post(`${GRAPH_PREFIX}/fileToGraph`, formData, {
    'Content-Type': 'multipart/form-data; charset=UTF-8;',
  });
  // return Promise.resolve(fileToGraphMock);
}

/**
 * 上传文件获取推荐案例
 * @param {*} file
 * @returns
 */
export function recommendFromFileAPI(file) {
  const formData = new FormData();
  formData.set('file', file);

  console.log('[recommendFromFile] file', file);

  return http.post(`${GRAPH_PREFIX}/recommend`, formData, {
    'Content-Type': 'multipart/form-data; charset=UTF-8;',
  });
}

/**
 * 按名字获取图谱内容
 * @param {*} graphName
 * @returns
 */
export function getGraphByNameAPI(graphName) {
  return http.get(`${GRAPH_PREFIX}/getGraphByName`, { name: graphName });
}

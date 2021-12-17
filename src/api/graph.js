import http from '../utils/http';

import fileToGraphMock from '../mock/fileToGraph.json';

const GRAPH_PREFIX = '/api/graph';

/**
 * 上传文件生成图谱
 */
export function fileToGraphAPI(file) {
  const formData = new FormData();
  formData.set('file', file);

  console.log('[fileToGraphAPI] file', file);
  console.log('[fileToGraphAPI] formData', formData);

  return http.post(`${GRAPH_PREFIX}/fileToGraph`, formData, {
    'Content-Type': 'multipart/form-data; charset=UTF-8;',
  });
  // return Promise.resolve(fileToGraphMock);
}

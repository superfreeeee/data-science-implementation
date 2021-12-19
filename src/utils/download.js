/**
 * 下载 File 类型文件
 * @param {File} file
 */
export const downloadFile = (file) => {
  console.log('[downloadFile] file', file);

  const dataUrl = URL.createObjectURL(file);
  download(file.name, dataUrl);
  URL.revokeObjectURL(dataUrl);
};

/**
 * 下载指定字符串
 * @param {*} name 
 * @param {*} text 
 */
export const downloadText = (name, text) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const dataUrl = URL.createObjectURL(blob);
  download(name, dataUrl);
  URL.revokeObjectURL(dataUrl);
};

/**
 * 下载指定 dataUrl
 * @param {*} name
 * @param {*} url
 */
export const download = (name, url) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.download = name;
  a.href = url;

  document.body.appendChild(a);
  a.click();
  a.remove();
};

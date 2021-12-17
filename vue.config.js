module.exports = {
  devServer: {
    host: 'localhost',
    port: 8900,
    proxy: {
      //配置多个代理
      '/api': {
        target: 'http://101.132.133.10:7474/',
        // target: "http://42.192.9.211:9090/coin",
        changeOrigin: true,
        ws: true, //websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};

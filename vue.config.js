module.exports = {
  devServer: {
    host: "localhost",
    port: 80,
    proxy: { //配置多个代理
      "/api": {
        target: "http://42.192.9.211:9090/coin",
        changeOrigin: true,
        ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}

const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    proxy('/api1', {
      // 遇见 /api1 前缀的请求，就会触发该代理配置
      target: 'http://localhost:5000',
      // 控制服务器收到的请求头中Host的值，不加的话，服务器还是会获取到3000的端口
      // 加了的话，就会变成5000
      changeOrigin: true,
      // 重写请求路径
      pathRewrite: { '^/api1': '' },
    })
  );
};

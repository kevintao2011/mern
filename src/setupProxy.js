const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.EXPRESS_SERVER_IP,
      changeOrigin: true,
    })
  );
  app.use(
    '/storage',
    createProxyMiddleware({
      target: process.env.FIREBASE_STORAGE_SERVER_IP,
      changeOrigin: true,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: "https://asia-east2-website-10a80.cloudfunctions.net",
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/storage',
//     createProxyMiddleware({
//       target: "http://127.0.0.1:5001/website-10a80/us-central1",
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
  app.use(
    '/storage',
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
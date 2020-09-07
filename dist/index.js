const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
app.use(cors());

// proxy middleware options
const options = {
  target:
    "https://www.googleapis.com/drive/v3/files/1BMe8dz24vju_EF1gUNNes_W44kQ6KnQH?alt=media&key=AIzaSyBZPjQlDk4OxceFNheRf1gH1m1HgWM86-I", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    "^/api/old-path": "/api/new-path", // rewrite path
    "^/api/remove/path": "/path", // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "dev.localhost:3000": "http://localhost:8000",
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader(
      "Authorization",
      "Bearer ya29.a0AfH6SMBtfzx9H-qvfoJslooSZvBXDpUFMZ6FmfbCL6D0LZ5YckWTthlF6-SMfUKW2SScFK_gM8EezaRevwRuneorNPpxwmbVYRfSMx0IH99GjCvyHJ_i7OJ8vpgjM_fS5I_aeRKb1fXOfgn-THbxLOzXLGCESAXFcUEW"
    );
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);
app.use("/api", exampleProxy);
app.listen(3000);

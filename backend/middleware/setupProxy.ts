// setupProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

const target = 'http://localhost:5000'; 
export const proxy = createProxyMiddleware('/api', {
  target,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  headers: {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

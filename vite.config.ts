import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vite.dev/config/
export default defineConfig({ 
  base: "/future-commurtity-h5/",
  plugins: [vue()],
  resolve: {
    alias: { // 路径别名
      '@': path.resolve(__dirname, './src'),
      '~@': path.resolve(__dirname, './src')
    }
  },
  server: { // 服务器配置
    host: '127.0.0.1', // 监听所有地址
    port: 3000, // 端口号
    cors: true, // 允许跨域
    open: false, // 启动时自动打开浏览器
    proxy: { // 代理
      '/api': {
        // '/api/login'=> 'http://123.156.228.253:8097/api/login'
        target: 'http://123.156.228.253:8097', // 代理地址
        changeOrigin: true, // 是否改变源地址
        rewrite: (path) => path.replace(/^\/api/, '/api') // 重写路径
      }
    }
  }
})

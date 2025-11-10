import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

/**
 * 样式
 */
import '@/assets/scss/global.scss' // 全局公共样式
import '@/assets/scss/theme.scss' // 主题样式

/**
 * Vant组件库
 */
import Vant from 'vant'
import 'vant/lib/index.css'
/**
 * 路由
 */
import router from './router'
/**
 * 状态管理
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 持久化存储
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(Vant).use(router).use(pinia)

app.mount('#app')

import { acceptHMRUpdate, defineStore } from "pinia";

interface SytemState {
    token: string; // token
}
const STORE_KEY = 'system-store' // store的key
export const useSystemStore = defineStore(STORE_KEY, {
    state: (): SytemState => ({
        token: '' // token
    }),
    getters: {
         // 是否登录
        isLogin: (state) => !!state.token // !! 转换为布尔值
    },
    actions: {
        // 设置token
        setToken(tokenValue: string){
            this.$patch({
                token: tokenValue
            })
        }
    },
    // 开启数据持久化
    persist: {
        key: STORE_KEY, // 存储的key
        storage: localStorage, // 存储方式 localStorage/sessionStorage
    }
})
if(import.meta.hot){ // 热更新HMR
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
}
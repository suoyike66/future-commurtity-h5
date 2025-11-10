import { acceptHMRUpdate, defineStore } from 'pinia'

interface RequestStore {
	// 登录令牌
	cache: { [key: string]: string }
}

const STORE_KEY = 'request-store'

export const useRequestStore = defineStore(STORE_KEY, {
	state: (): RequestStore => ({
		cache: {}
	}),
	actions: {
		/**
		 * 保存缓存
		 * @param key 保存的key
		 * @param data 数据信息
		 */
		save(key: string, data: string) {
			this.$state.cache[key] = data
		}
	},
	// 开启数据缓存
	persist: {
		key: STORE_KEY,
		storage: sessionStorage
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot))
}

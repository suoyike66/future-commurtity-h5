/// <reference types="vite/client" />
/**
 * 如果在项目中引入了 *.vue 文件，则需要添加此声明文件
 * 否则会报错找不到模块
 * 将.vue文件作为一个vue组件来处理
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
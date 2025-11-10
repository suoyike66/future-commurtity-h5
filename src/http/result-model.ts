/**
 * api返回值的实体类
 */
export interface ResultModel<T> {
	code: string
	t: string
	message: string
	data: T
}

/**
 * 默认分页接收的对象模块
 */
export interface PageModel<T> {
	pageNum: number
	pageSize: number
	total: number
	isLastPage: boolean
	isLast: boolean
	list: Array<T>
}

interface ConfirmVoData {
	key: string
	token: string
}
// 确认弹窗返回值
export declare type ConfirmVo = ResultModel<ConfirmVoData>
// 空对象返回值
export declare type ResultObjectVo = ResultModel<object>

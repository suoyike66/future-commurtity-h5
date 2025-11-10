import type { BasePO, BussinessPO } from '@/entity/common/base'

export interface DictionaryManage extends BussinessPO {
	// 下级菜单
	children: Array<string>
	// 数据项页面显示名称，自动生成，去除根根字典的数据字典名称链接
	displayName: string
	// 数据字典分组名称
	fkDictionaryGroupName: string
	// 上级字典id
	fkParentId: string
	// 图标
	icon: string
	// 数据项唯一编号(名字英文，根字典必填)
	itemCode: string
	// 数据字典名称
	itemName: string
	// 数据项值
	itemValue: string
	// 字典ID集
	menuIds: string
	// 上级编号
	parentCode: string
	// 根字典编号/类别，子项必填
	rfRootCode: string
	// 排序
	sortCode: string
	// 状态 .
	state: number
	// 状态 0不可编辑 1 可编辑 2禁用
	stateStr: 0 | 1 | 2
}

/**
 * 数据字典下拉框
 */
export interface DictionaryList extends BussinessPO {
	// 数据项页面显示名称，自动生成，去除根根字典的数据字典名称链接
	displayName: string
	// 上级字典id
	fkParentId: string
	// 图标
	icon: string
	// 数据项唯一编号(名字英文，根字典必填)
	itemCode: string
	// 数据字典名称
	itemName: string
	// 数据项值
	itemValue: string
	// 上级编号
	parentCode: string
	// 根字典编号/类别，子项必填
	rfRootCode: string
	// 排序
	sortCode: string
	// 状态 0不可编辑 1 可编辑 2禁用
	state: 0 | 1 | 2
}

export interface DictionaryManageFormDTO extends BasePO {
	// 数据字典名称
	itemName: string
	// 根字典/类别编号
	rfRootCode: string
	// 上级字典id
	fkParentId?: string
	// 图标
	icon?: string
	// 数据项唯一编号
	itemCode?: string
	// 数据项值
	itemValue?: string
	// 备注
	memo?: string
	// 排序
	sortCode?: string
	// 状态
	state?: number
	// 上级编号
	parentCode?: string
}

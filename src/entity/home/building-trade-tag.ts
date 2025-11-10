import type { BussinessPO } from '@/entity/common/base'

export interface BuildingTradeTagVo extends BussinessPO {
	// 出租id
	tradeId: string

	// 字典id（building_trade_tag）
	dictionaryId: string

	// 字典id
	fkDictionaryId: string

	// 标签名称
	title: string

	// 标签名称
	name: string

	// 顺序，默认数字越小约在前面
	sortOrder: number
}

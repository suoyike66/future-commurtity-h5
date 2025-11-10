import type { BussinessPO } from '@/entity/common/base'

export interface BuildingTradeFurnitureVo extends BussinessPO {
	//出租id
	fkTradeId: string

	//字典id（building_trade_furniture）
	fkDictionaryId: string

	//家具名称
	name: string

	//家具图标
	icon: string
}

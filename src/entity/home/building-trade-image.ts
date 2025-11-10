import type { BussinessPO } from '@/entity/common/base'

export interface BuildingTradeImageVo extends BussinessPO {
	// 出租id
	tradeId: string

	// 图片id
	fileId: string

	// 图片路径
	filePath: string

	// 顺序，默认数字越小约在前面
	sortOrder: number
}

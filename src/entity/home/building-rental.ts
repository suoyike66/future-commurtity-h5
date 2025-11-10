import type { BuildingVo } from '@/entity/home/building'
import type { BuildingTradeImageVo } from '@/entity/home/building-trade-image'
import type { BuildingTradeTagVo } from '@/entity/home/building-trade-tag'
import type { BuildingTradeFurnitureVo } from '@/entity/home/building-trade-furniture'
import type { CarParkingPo } from '@/entity/home/car-parking'
import type { UnitVo } from '@/entity/home/unit'
import type { RoomVo } from '@/entity/home/room'
import type { CommunityVo } from '@/entity/home/community'
import type { BussinessPO } from '@/entity/common/base'

export interface BuildingRentalVo extends BussinessPO {
	// 出售类型 1=房屋 2=车位
	type: 1 | 2

	// 房间id/车位id
	targetId: string

	// 标题信息
	title: string

	// 封面id
	cover: string

	// 封面路径
	coverPath: string

	// 详情页封面回显用
	coverList: Array<string>

	// 房间id/车位id
	fkTargetId: string

	// 介绍
	introduction: string

	// 状态 1=进行中 2=已完成 3=取消
	status: 1 | 2 | 3

	// 租金
	rentalPrice: string

	// 租金单位id
	priceUnitId: string

	// 租金单位名称
	priceUnitName: string

	// // 租金支付方式id
	// pricePaymentId: string

	// 支付方式
	pricePayment: Array<BuildingTradeFurnitureVo>

	// 租金支付方式名称
	pricePaymentName: string

	// 起租期id
	leaseCommencementDateId: string

	// 起租期名称
	leaseCommencementDateName: string

	// 发布人id
	publishUserId: string

	//发布人头像
	publishUserHeadPath?: string

	// 联系人名称
	contactName: string

	// 联系人电话
	contactPhone: string

	// 楼栋信息
	building?: BuildingVo

	// 交易图片
	buildingTradeImages?: Array<BuildingTradeImageVo>

	// 详情页回显用
	buildingTradeImagesList?: Array<string>

	// 交易标签
	buildingTradeTags?: Array<BuildingTradeTagVo>

	//交易家具
	buildingTradeFurniture?: Array<BuildingTradeFurnitureVo>

	// 车位信息
	carParking?: CarParkingPo

	// 车位信息
	unit?: UnitVo

	// 房间信息
	room?: RoomVo

	//所属小区
	community?: CommunityVo

	[key: string]: unknown
}

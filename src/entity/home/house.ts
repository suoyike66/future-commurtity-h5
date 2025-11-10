import type { BuildingTradeTagVo } from "./building-trade-tag"

export interface HouseItem {
    // 主键id
    id: string
    // 封面
    cover: string
    // 简介
    introduction: string
    // 状态 1进行中 2已完成 3取消
    status: 1 | 2 | 3
    // 出售类型 1房屋 2车位
    type: 1 | 2
    // 联系人电话
    contactPhone: string
    // 房屋类型/车位类型
    roomType: string
    // 房屋面积
    roomArea: string
    // 房屋/车位地址
    address: string
    // 标签类型
    tagList: Array<BuildingTradeTagVo>
    // 价格
    price: string
    // 价格单位
    priceUnit: string
}
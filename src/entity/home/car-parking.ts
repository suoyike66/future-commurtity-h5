import type { BussinessPO } from "../common/base";

/**
 * 蓝卡云停车场区域vo对象
 */
export interface CarParkingVo extends BussinessPO {
    /**
     * 区域 Id
     */
    areaId?: number;
    /**
     * 区域名称
     */
    areaName?: string;
    /**
     * 区域在场预约数
     */
    bookInParkCount?: number;
    /**
     * 区域可预约车位数
     */
    bookSpaceCount?: number;
    /**
     * 停车场id
     */
    fkParkId?: string;
    /**
     * 区域空位数
     */
    lastSpaceCount?: number;
    /**
     * 场库编号
     */
    parkNumber?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 区域车位数
     */
    spaceCount?: number;
    [property: string]: any;
}
/**
 * 车位信息
 *
 * 车位po对象
 */
export interface CarParkingPo extends BussinessPO {
    /**
     * 车位地址
     */
    address?: string;
    /**
     * 面积
     */
    area?: string;
    /**
     * 车位图片id
     */
    carParkingImgId?: string;
    /**
     * 车位图片文件路径
     */
    carParkingImgUrl?: string;
    /**
     * 所属社区id
     */
    fkCommunityId?: string;
    /**
     * 空闲时间HH:mm:ss-HH:mm:ss;
     */
    freeTimetable?: string;
    /**
     * 是否共享中 1=是 0=不是
     */
    isShare?: number;
    /**
     * 车位编号
     */
    name?: string;
    /**
     * 持有人id（住户表的id）
     */
    proprietorId?: string;
    /**
     * 持有人电话
     */
    proprietorPhone?: string;
    /**
     * 持有人用户id
     */
    proprietorUserId?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 状态 0=正常 1=出售中 2=挂牌出租中 3=已出租
     */
    status?: number;
    /**
     * 车位类型id（数据字典car_parking_type）
     */
    typeId?: string;
    /**
     * 车位类型名称
     */
    typeName?: string;
    [property: string]: any;
}
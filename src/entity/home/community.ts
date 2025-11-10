import type { BussinessPO } from "../common/base";

/**
 * 小区vo对象
 */
export interface CommunityVo extends BussinessPO {
    /**
     * 详细地址
     */
    address?: string;
    /**
     * 小区面积
     */
    area?: string;
    /**
     * 区/县编号
     */
    areaCode?: string;
    /**
     * 市编号
     */
    cityCode?: string;
    /**
     * 封面
     */
    cover?: string;
    /**
     * 群组id（不参与服务业务）
     */
    groupId?: string;
    /**
     * 小区简介
     */
    introduction?: string;
    /**
     * 简介封面地址
     */
    introductionCover?: string;
    /**
     * 纬度
     */
    latitude?: string;
    /**
     * 经度
     */
    longitude?: string;
    /**
     * 小区名称
     */
    name?: string;
    /**
     * 负责人名称
     */
    principalName?: string;
    /**
     * 负责人电话
     */
    principalPhone?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 街道编号
     */
    streetCode?: string;
    thousekeeperId?: string;
    [property: string]: any;
}
/**
 * 小区mapVo对象
 */
export interface CommunityMapVo {
    /**
     * 主键id
     */
    id?: string;
    /**
     * 小区名称
     */
    name?: string;
    [property: string]: any;
}
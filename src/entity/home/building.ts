import type { BussinessPO } from "../common/base";
import type { HouseKeeper } from "./housekeeper";
import type { UnitVo } from "./unit";
/**
 * 楼栋vo对象
 */
export interface BuildingVo extends BussinessPO {
    /**
     * 建筑面积
     */
    area?: string;
    /**
     * 所属社区id
     */
    communityId?: string;
    /**
     * 群组id（不参与服务业务）
     */
    groupId?: string;
    /**
     * 管家信息
     */
    housekeeper?: HouseKeeper;
    /**
     * 管家id
     */
    housekeeperId?: string;
    /**
     * 楼栋名称
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
     * 是否在小程序上显示 1=显示 0=不显示
     */
    showApplet?: 0 | 1;
    /**
     * 是否显示单元信息 1=显示 0=不显示
     */
    showUnit?: 0 | 1;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    thousekeeperId?: string;
    /**
     * 单元信息
     */
    unit: UnitVo
    [property: string]: any;
}
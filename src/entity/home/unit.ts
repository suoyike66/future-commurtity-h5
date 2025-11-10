/**
 * 单元vo对象
 */
import type { BussinessPO } from "../common/base";
import type { HouseKeeper } from "./housekeeper";
export interface UnitVo extends BussinessPO {
    /**
     * 建筑面积
     */
    area?: string;
    /**
     * 楼栋id
     */
    buildingId?: string;
    /**
     * 所属社区id
     */
    communityId?: string;
    /**
     * 管家
     */
    housekeeper?: HouseKeeper;
    /**
     * 管家id
     */
    housekeeperId?: string;
    /**
     * 单元名称
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
    [property: string]: any;
}
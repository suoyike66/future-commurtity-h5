import type { BussinessPO } from "../common/base";
import type { ActivityEnrollsPO } from "./activity-enrolls";

/**
 * 活动vo对象
 */
export interface ActivityVO extends BussinessPO {
    /**
     * 活动报名人
     */
    activityEnrolls?: ActivityEnrollsPO[];
    /**
     * 封面
     */
    cover?: string;
    /**
     * 活动结束时间
     */
    endTime?: string;
    /**
     * 报名结束时间
     */
    enrollEndTime?: string;
    /**
     * 报名开始时间
     */
    enrollStartTime?: string;
    /**
     * 活动介绍
     */
    introduction?: string;
    /**
     * 活动最大人数（如果为0则表示不限制人数）
     */
    maxAmount?: number;
    /**
     * 负责人联系电话
     */
    mobile?: string;
    /**
     * 活动地点
     */
    place?: string;
    /**
     * 活动负责人
     */
    principal?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 活动开始时间
     */
    startTime?: string;
    /**
     * 活动标题
     */
    title?: string;
    /**
     * 活动类型id（activity_type）
     */
    typeId?: string;
    /**
     * 活动类型名称
     */
    typeName?: string;
    [property: string]: any;
}


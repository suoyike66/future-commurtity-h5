import type { BasePO } from "../common/base";

/**
 * 活动报名po对象
 */
export interface ActivityEnrollsPO extends BasePO {
    /**
     * 活动id
     */
    fkActivityId?: string;
    /**
     * 用户id
     */
    fkUserId?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    [property: string]: any;
}
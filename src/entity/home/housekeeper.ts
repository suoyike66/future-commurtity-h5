/**
 * 管家vo对象
 */
import type { BussinessPO } from "../common/base";
export interface HouseKeeper extends BussinessPO {
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 管家名称
     */
    name?: string;
    /**
     * 手机号
     */
    phone?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 管家用户id
     */
    userId?: string;
    [property: string]: any;
}
/**
 * 房屋认证记录po对象
 */
import type { BussinessPO } from "../common/base";
import type { IType } from "./resident";
export interface AuthenticationRecord extends BussinessPO {
    /**
     * 住户id
     */
    fkResidentId?: string;
    /**
     * 房屋id
     */
    fkRoomId?: string;
    /**
     * 用户id
     */
    fkUserId?: string;
    /**
     * 是否自动认证 0.不是 1.是
     */
    isAutomaticAuthenticate?: 0 | 1;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 审核状态 1=已提交（待审核） 2=审核通过 3=审核拒绝 4=已取消
     */
    status?: Status;
    /**
     * 关系 1=业主本人 2=亲属 3=租客 4=朋友 5=同事 6=装修人员 7=保姆 8=司机 9=其它
     */
    type?: IType;
    [property: string]: any;
}
/**
 * 审核状态 1=已提交（待审核） 2=审核通过 3=审核拒绝 4=已取消
 *
 * Status
 */
export interface Status {
    name?: string;
    value?: 1 | 2 | 3 | 4;
    [property: string]: any;
}
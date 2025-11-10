import type { BasePO, BussinessPO } from "../common/base";
import type { BaseAccountDept } from "./account-dept";
import type { BaseAccountOrg } from "./account-org";
import type { BaseAccountRole } from "./account-role";

/**
 * 用户详情
 */
export interface BaseAccountUser extends BussinessPO {
    /**
     * 激活状态（0禁用，1激活，2待审核，3锁定）
     */
    activeStatus?: 0 | 1 | 2 | 3;
    /**
     * 身份认证票据
     */
    authToken: string;
    /**
     * 所属部门信息
     */
    deptList?: Array<BaseAccountDept>;
    /**
     * 部门名称
     */
    deptNames?: string;
    /**
     * 头像路径
     */
    headPath?: string;
    /**
     * 所属单位信息
     */
    orgList?: Array<BaseAccountOrg>;
    /**
     * 所属单位名称
     */
    orgNames?: string;
    /**
     * 用户权限
     */
    permissionMap?: { [key: string]: string }; // record<string,string>
    /**
     * 注册ip
     */
    regIp?: string;
    /**
     * 所属角色信息
     */
    roleList?: BaseAccountRole;
    /**
     * 角色名称
     */
    roleNames?: string;
    /**
     * 站点/终端
     */
    siteCode?: string;
    /**
     * 第三方认证账户
     */
    thirdPartyAccountList?: Array<ThirdPartyAccount>;
    /**
     * 用户账户
     */
    userAccount?: string;
    /**
     * 用戶扩展信息
     */
    userInfo?: AccountUserInfo;
    /**
     * 用户姓名
     */
    userName?: string;
    /**
     * 用户密码
     */
    userPassword?: string;
    /**
     * 是否是超级管理员：0普通用户，1超级管理员
     */
    userType?: 0 | 1;
    [property: string]: any;
}

/**
 * 用戶扩展信息
 *
 * 用户信息扩展表
 */
export interface AccountUserInfo extends BasePO {
    /**
     * 地址，区域权限
     */
    address?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 图标/头像附件id
     */
    fkHeadId?: string;
    /**
     * 数据字典项id（前端配置数据字典编号选择）：职务id
     */
    fkPositionDictId?: string;
    /**
     * 用户id
     */
    fkUserId?: string;
    /**
     * 头像附件路径
     */
    headPath?: string;
    /**
     * 身份证号
     */
    idCard?: string;
    /**
     * 关联账户id
     */
    openId?: string;
    /**
     * 联系电话
     */
    phone?: string;
    /**
     * qq
     */
    qq?: string;
    /**
     * 数据字典项值：职务名称
     */
    rfPositionDictName?: string;
    /**
     * 性别：0默认，1男，2女
     */
    sex?: number;
    /**
     * 排序
     */
    sortCode?: number;
    /**
     * 用户信息编号
     */
    userInfoCode?: string;
    /**
     * 用户姓名（冗余）
     */
    userInfoName?: string;
    /**
     * 微信
     */
    wechat?: string;
    /**
     * 开始工作时间
     */
    workingDate?: Date;
    /**
     * 员工号
     */
    workNumber?: string;
    [property: string]: any;
}

/**
 * 第三方账户绑定表
 */
export interface ThirdPartyAccount extends BasePO {
    /**
     * 第三方账户openId
     */
    appOpenId?: string;
    /**
     * 第三方账户类型（qq/dingTalk/weChat等）
     */
    appType?: string;
    /**
     * 第三方账户用户id
     */
    appUserId?: string;
    /**
     * 第三方账户名称
     */
    appUserName?: string;
    /**
     * 用户id
     */
    fkUserId?: string;
    [property: string]: any;
}
/**
 * 住户信息vo对象
 */
import type { RoomVo } from "./room";
import type { AuthenticationRecord } from "./authentication-record";
import type { BussinessPO } from "../common/base";
import type { PersonalProperty } from "./personal-property"
export interface ResidentVo extends BussinessPO {
    /**
     * 年龄
     */
    age?: number;
    /**
     * 地区
     */
    area?: string;
    /**
     * 认证信息
     */
    authenticationRecord?: AuthenticationRecord[];
    /**
     * 工作单位
     */
    company?: string;
    /**
     * 学历 0=无 1=小学 2=初中 3=职高 4=普高 5=中专 6=大专 7=本科 8=硕士 9=博士
     */
    degree?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * 学历 0=无 1=小学 2=初中 3=职高 4=普高 5=中专 6=大专 7=本科 8=硕士 9=博士
     */
    degreeStr?: string;
    /**
     * 民族
     */
    ethnicity?: string;
    /**
     * 人脸照片
     */
    faceImageUrl?: string;
    /**
     * 用户id
     */
    fkUserId?: string;
    /**
     * 性别 0=保密 1=男 2=女
     */
    gender?: 0 | 1 | 2;
    /**
     * 性别 0=保密 1=男 2=女
     */
    genderStr?: string;
    /**
     * 健康信息
     */
    health?: string;
    /**
     * 身份证号
     */
    idNo?: string;
    /**
     * 婚姻情况 0=未婚 1=已婚 2=离异
     */
    marriage?: 0 | 1 | 2;
    /**
     * 婚姻情况 0=未婚 1=已婚 2=离异
     */
    marriageStr?: string;
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 住户名称
     */
    name?: string;
    /**
     * 国家
     */
    nationality?: string;
    /**
     * 政治面貌 0=群众 1=党员 2=预备党员 3=积极分子 4=入党申请人 5=民主党派
     */
    politics?: 0 | 1 | 2 | 3 | 4 | 5;
    /**
     * 政治面貌 0=群众 1=党员 2=预备党员 3=积极分子 4=入党申请人 5=民主党派
     */
    politicsStr?: string;
    /**
     * 个人资产信息
     */
    property?: PersonalProperty;
    /**
     * 籍贯
     */
    registry?: string;
    /**
     * 籍贯编码
     */
    registryCode?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 户籍所在地
     */
    residenceAddress?: string;
    /**
     * 户籍所在地编码
     */
    residenceAddressCode?: string;
    /**
     * 房间列表信息
     */
    roomList?: RoomVo[];
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    [property: string]: any;
}
/**
 * 关系 1=业主本人 2=亲属 3=租客 4=朋友 5=同事 6=装修人员 7=保姆 8=司机 9=其它
 */
export interface IType {
    name?: string;
    type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    [property: string]: any;
}
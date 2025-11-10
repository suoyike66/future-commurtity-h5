/**
 * 历史住户信息vo对象
 */
import type { BussinessPO } from "../common/base";
export interface HistoryResidentVo extends BussinessPO {
    /**
     * 年龄
     */
    age?: number;
    /**
     * 地区
     */
    area?: string;
    /**
     * 楼栋id
     */
    buildingId?: string;
    /**
     * 楼栋名称
     */
    buildingName?: string;
    /**
     * 取消认证时间
     */
    cancelCertificationTime?: string;
    /**
     * 认证时间
     */
    certificationTime?: string;
    /**
     * 所属社区id
     */
    communityId?: string;
    /**
     * 小区名称
     */
    communityName?: string;
    /**
     * 工作单位
     */
    company?: string;
    /**
     * 学历 0=无 1=小学 2=初中 3=职高 4=普高 5=中专 6=大专 7=本科 8=硕士 9=博士
     */
    degree?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * 民族
     */
    ethnicity?: string;
    /**
     * 人脸照片
     */
    faceImageUrl?: string;
    /**
     * 房间id
     */
    fkRoomId?: string;
    /**
     * 楼层
     */
    floor?: string;
    /**
     * 房屋取得年份
     */
    gainYear?: string;
    /**
     * 性别 0=保密 1=男 2=女
     */
    gender?: 0 | 1 | 2;
    /**
     * 健康状况
     */
    health?: string;
    /**
     * 历史住户图片
     */
    historyResidentPhotos?: HistoryResidentPhotos[];
    /**
     * 认证身份 1=业主本人 2=亲属 3=租客 4=朋友 5=同事 6=装修人员 7=保姆 8=司机 9=其它
     */
    identityAuthentication?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * 住户身份证号
     */
    idNo?: string;
    /**
     * 婚姻情况 0=未婚 1=已婚 2=离异
     */
    marriage?: 0 | 1 | 2;
    /**
     * 住户电话
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
     * 房产证日期
     */
    propertyOwnershipCertificateDate?: string;
    /**
     * 房屋用途
     */
    purpose?: string;
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
     * 住户类型 0=业主 1=租客 2=家属
     */
    residentResidentName?: 0 | 1 | 2;
    /**
     * 房间号
     */
    roomNumber?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 来源 0=一手购 1=二手购
     */
    sourceName?: string;
    /**
     * 认证状态 1=已提交（待审核） 2=审核通过 3=审核拒绝 4=已取消
     */
    state?: 1 | 2 | 3 | 4;
    /**
     * 单元id
     */
    unitId?: string;
    /**
     * 单元名称
     */
    unitName?: string;
    /**
     * 用户id
     */
    userId?: string;
    [property: string]: any;
}
/**
 * 历史住户照片po对象
 */
export interface HistoryResidentPhotos extends BussinessPO {
    /**
     * 图片id
     */
    fileId?: string;
    /**
     * 图片路径
     */
    filePath?: string;
    /**
     * 历史住户信息id
     */
    fkHistoryResidentId?: string;
    /**
     * 备注
     */
    remark?: string;
    [property: string]: any;
}
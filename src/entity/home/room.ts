/**
 * 房间vo对象
 */
import type { BussinessPO } from "../common/base";
import type { BuildingVo } from "./building";
import type { CommunityVo } from "./community";
import type { LogFile } from "../system-log/log-file";
import type { HistoryResidentVo } from "./history-resident";
import type { Property } from "./room-property";
import type { IType } from './resident'
import type { UnitVo } from "./unit";
import type { ResidentVo } from "./resident";
export interface RoomVo extends BussinessPO {
    /**
     * 建筑面积
     */
    area?: string;
    /**
     * 楼栋信息
     */
    building?: BuildingVo;
    /**
     * 楼栋id
     */
    buildingId?: string;
    /**
     * 小区信息
     */
    community?: CommunityVo;
    /**
     * 所属社区id
     */
    communityId?: string;
    /**
     * 装修状态 0=正常 1=审核中 2=进行中
     */
    decorationStatus?: 0 | 1 | 2;
    /**
     * 单元
     */
    dy?: string;
    /**
     * 成员家人数量
     */
    familyCount?: number;
    /**
     * 历史住户信息（最新）
     */
    historyResidentVo?: HistoryResidentVo;
    /**
     * 楼栋
     */
    ld?: string;
    /**
     * 房间名称
     */
    name?: string;
    /**
     * 房产证日期
     */
    premisesPermitDate?: string;
    /**
     * 房产证图片源文件列表数据
     */
    premisesPermitOriginFileList?: LogFile[];
    /**
     * 房产证图片源文件id
     */
    premisesPermitOriginId?: string;
    /**
     * 房产证图片水印文件id
     */
    premisesPermitWatermarkId?: string;
    /**
     * 房产证图片水印文件路径
     */
    premisesPermitWatermarkPath?: string;
    /**
     * 房间资产信息
     */
    property?: Property;
    /**
     * 业主id（住户表的id）
     */
    proprietorId?: string;
    /**
     * 业主电话
     */
    proprietorPhone?: string;
    /**
     * 业主用户id
     */
    proprietorUserId?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 业主信息
     */
    resident?: ResidentVo;
    /**
     * 房屋朝向
     */
    roomTowards?: string;
    /**
     * 房屋用途
     */
    roomUse?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 房间状态 0=正常 1=出售中 2=挂牌出租中 3=已出租
     */
    status?: 0 | 1 | 2 | 3;
    /**
     * 关系 1=业主本人 2=亲属 3=租客 4=朋友 5=同事 6=装修人员 7=保姆 8=司机 9=其它
     */
    type?: IType;
    /**
     * 房间类型id（数据字典room_type）
     */
    typeId?: string;
    /**
     * 房间类型名称
     */
    typeName?: string;
    /**
     * 单元信息
     */
    unit?: UnitVo;
    /**
     * 单元id
     */
    unitId?: string;
    /**
     * 小区
     */
    xq?: string;
    /**
     * 业主名称
     */
    yz?: string;
    [property: string]: any;
}
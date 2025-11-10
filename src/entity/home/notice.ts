import type { BussinessPO } from "../common/base";

/**
 * 公告vo对象
 */
export interface NoticeVo extends BussinessPO {
    /**
     * 已报名人数
     */
    amount?: number;
    /**
     * 公告详情信息
     */
    content?: string;
    /**
     * 报名结束时间
     */
    enrollEndTime?: string;
    /**
     * 报名开始时间
     */
    enrollStartTime?: string;
    /**
     * 是否外链
     */
    isLink?: number;
    /**
     * 是否立即发送 1=是 0=否
     */
    isNowPublish?: 0 | 1;
    /**
     * 是否发送 1=发送 0=不发送
     */
    isPublish?: 0 | 1;
    /**
     * 活动最大人数
     */
    maxAmount?: number;
    /**
     * 公告附件
     */
    noticeAttachments?: NoticeAttachmentsPo[];
    /**
     * 公告范围
     */
    noticeRange?: NoticeRangePo;
    /**
     * 公告阅读列表
     */
    noticeReads?: NoticeReadsPo[];
    /**
     * 公告类型(1=物业 2=公开 3=志愿者)
     */
    noticeType?: 1 | 2 | 3;
    /**
     * 活动地点
     */
    place?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 目标id
     */
    targetId?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 范围类型 1=房间 2=单元 3=楼栋 4=小区 5=全部
     */
    type?: 1 | 2 | 3 | 4 | 5;
    [property: string]: any;
}

/**
 * 公告附件po对象
 */
export interface NoticeAttachmentsPo extends BussinessPO {
    /**
     * 附件id
     */
    attachmentFileId?: string;
    /**
     * 附件路径
     */
    attachmentFilePath?: string;
    /**
     * 附件名称
     */
    attachmentName?: string;
    /**
     * 公告id
     */
    fkNoticeId?: string;
    /**
     * 备注
     */
    remark?: string;
    [property: string]: any;
}

/**
 * 公告范围
 *
 * 公告范围po对象
 */
export interface NoticeRangePo extends BussinessPO {
    /**
     * 公告id
     */
    fkNoticeId?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 目标id
     */
    targetId?: string;
    /**
     * 范围类型 1=房间 2=单元 3=楼栋 4=区域 5=全部
     */
    type?: 1 | 2 | 3 | 4 | 5;
    [property: string]: any;
}

/**
 * 公告阅读po对象
 */
export interface NoticeReadsPo extends BussinessPO {
    /**
     * 公告id
     */
    fkNoticeId?: string;
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
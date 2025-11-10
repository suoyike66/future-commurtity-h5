import type { BussinessPO } from "../common/base";

/**
 * 轮播图vo对象
 */
export interface BannerVo extends BussinessPO {
    /**
     * 轮播图详情
     */
    bannerDetail?: BannerDetailPo;
    /**
     * 点赞列表
     */
    bannerDetailPraises?: BannerDetailPraisesPo[];
    /**
     * 文件id
     */
    fileId?: string;
    /**
     * 文件路径
     */
    filePath?: string;
    /**
     * 连接地址
     */
    linkPath?: string;
    /**
     * 连接类型 1=路由 2=外部链接
     */
    linkType?: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 显示客户端 1=微信小程序 2=
     */
    showClient?: number;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 标题
     */
    title?: string;
    [property: string]: any;
}

/**
 * 轮播图详情po对象
 */
export interface BannerDetailPo extends BussinessPO {
    /**
     * 详细信息
     */
    content?: string;
    /**
     * 轮播图id
     */
    fkBannerId?: string;
    /**
     * 点赞数
     */
    praise?: number;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    [property: string]: any;
}

/**
 * 轮播图详情点赞流水po对象
 */
export interface BannerDetailPraisesPo extends BussinessPO {
    /**
     * 轮播图id
     */
    fkBannerId?: string;
    /**
     * 轮播图详情id
     */
    fkDetailId?: string;
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

import type { BussinessPO } from "../common/base";

/**
 * 功能导航vo对象
 */
export interface GuideVo extends BussinessPO {
    /**
     * 是否显示 1=显示 0=不显示
     */
    isShow?: 0 | 1;
    /**
     * 是否显示在全部应用中 1=显示 0=不显示
     */
    isShowAll?: 0 | 1;
    /**
     * 是否在首页显示 1=显示 0=不显示
     */
    isShowHome?: 0 | 1;
    /**
     * 导航项目列表
     */
    itemList?: GuideItemVo[];
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 标签（唯一名称key）
     */
    tag?: string;
    /**
     * 标题
     */
    title?: string;
    [property: string]: any;
}

/**
 * 功能导航详情vo对象
 */
export interface GuideItemVo extends BussinessPO {
    /**
     * 导航id列表
     */
    guideIdList?: string[];
    /**
     * 图标
     */
    icon?: string;
    /**
     * 动态图标
     */
    iconGif?: string;
    /**
     * 是否需要认证 1=需要 0=不需要
     */
    isAuthentication?: 0 | 1;
    /**
     * 是否显示 1=显示 0=不显示
     */
    isShow?: 0 | 1;
    /**
     * 连接地址
     */
    linkPath?: string;
    /**
     * 连接类型 1=路由 2=外部链接
     */
    linkType?: 1 | 2;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 顺序，默认数字越小约在前面
     */
    sortOrder?: number;
    /**
     * 标签（唯一名称key）
     */
    tag?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 是否使用动态图标 1=使用 0=不使用
     */
    useGif?: 0 | 1;
    [property: string]: any;
}
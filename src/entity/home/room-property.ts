/**
 * 房间资产信息
 */
export interface Property {
    /**
     * 同事
     */
    colleague?: number;
    /**
     * 装修人员
     */
    decorator?: number;
    /**
     * 我的司机数量
     */
    driver?: number;
    /**
     * 我的家人数量
     */
    family?: number;
    /**
     * 我的朋友数量
     */
    friend?: number;
    /**
     * 我的保姆数量
     */
    nanny?: number;
    /**
     * 亲属
     */
    relation?: number;
    /**
     * 我的租客数量
     */
    tenant?: number;
    /**
     * 待审核我的家人数量
     */
    waitFamily?: number;
    [property: string]: any;
}
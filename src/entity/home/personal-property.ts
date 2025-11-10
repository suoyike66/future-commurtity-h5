/**
 * 个人资产信息
 */
export interface PersonalProperty {
    /**
     * 我的车数量
     */
    car?: number;
    /**
     * 我的车位数量
     */
    carPark?: number;
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
     * 我的房产数量
     */
    realEstate?: number;
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
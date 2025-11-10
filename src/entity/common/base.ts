/**
 * 基础实体
 */
export interface BasePO {
    /**
     * 主键id
     */
    id: string;
     /**
     * 创建时间
     */
    gmtCreate?: string;
    /**
     * 修改时间
     */
    gmtModified?: string;
}
export interface BussinessPO extends BasePO {
    /**
     * 创建人
     */
    createUserName?: string;
    /**
     * 创建人id
     */
    createUserId?: string;
    /**
     * 修改人
     */
    updateUserName?: string;
    /**
     * 修改人id
     */
    updateUserId?: string
    /**
     * 删除状态 0| 1
     */
    isDeleted?: 0 | 1;
    /**
     * 乐观锁
     */
    version?: number;
    /**
     * 备注
     */
    memo?: string;
}
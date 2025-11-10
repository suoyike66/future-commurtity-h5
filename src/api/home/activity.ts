import { PostRequestModel, type QueryType } from "@/http/request-model"
import type { PageModel } from "@/http/result-model"
import type { ActivityVO } from "@/entity/home/activity"

const MODULE_PREFIX = '/h5/activity'
export default {
    /**
     * 分页查询活动列表
     * @param query 
     * @returns 
     */
    page: (query: QueryType) => 
        new PostRequestModel<PageModel<ActivityVO>>
    (`${MODULE_PREFIX}/list`, query)
    .request()
}
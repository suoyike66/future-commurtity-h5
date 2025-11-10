import type { NoticeVo } from "@/entity/home/notice"
import { PostRequestModel, type QueryType } from "@/http/request-model"
import type { PageModel } from "@/http/result-model"

const MODULE_PREFIX = '/h5/notice'
export default {
    /**
     * 分页查询公告列表
     * @param query 
     * @returns 
     */
    page: (query: QueryType) =>
        new PostRequestModel<PageModel<NoticeVo>>
    (`${MODULE_PREFIX}/list`, query).request()
}
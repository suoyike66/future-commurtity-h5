import type { BannerVo } from "@/entity/home/banner"
import { PostRequestModel, type QueryType } from "@/http/request-model"
import type { PageModel } from "@/http/result-model"

const MODULE_PREFIX = '/h5/banner'
export default {
    /**
     * 分页查询轮播图列表
     * @param query 
     * @returns 
     */
    bannerList: (query: QueryType) => 
        new PostRequestModel<PageModel<BannerVo>>
    (`${MODULE_PREFIX}/list`, query).request()
}
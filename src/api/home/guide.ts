import type { GuideVo } from "@/entity/home/guide"
import { PostRequestModel } from "@/http/request-model"

const MODULE_PREFIX = '/h5/guide'
export default {
    /**
     * 查询首页功能导航列表
     * @returns 
     */
    guideHome: () => 
        new PostRequestModel<GuideVo[]>
    (`${MODULE_PREFIX}/home`, {})
    .request()
}
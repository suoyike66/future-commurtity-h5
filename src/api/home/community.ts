import type { CommunityMapVo } from "@/entity/home/community";
import { PostRequestModel, type QueryType } from "@/http/request-model";

const MODULE_PERFIX = '/h5/community';
export default {
    /**
     * map分页查询小区列表
     * @param query 
     * @returns 
     */
    communityMap: (query?: QueryType) => 
        new PostRequestModel<CommunityMapVo[]>
    (`${MODULE_PERFIX}/map`, query).request()
}
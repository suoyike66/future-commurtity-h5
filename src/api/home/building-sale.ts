import { GetRequestModel, PostRequestModel, type QueryType } from '@/http/request-model.ts'
import type { PageModel } from '@/http/result-model.ts'
import type { BuildingSaleVo } from '@/entity/home/building-sale.ts'

const MODULE_PREFIX = '/h5/building_sale'

export default {
    /**
     * 分页查询出售信息
     * @param query
     */
    page: (query?: QueryType) => new PostRequestModel<PageModel<BuildingSaleVo>>
    (`${MODULE_PREFIX}/list`, query).request(),
    
    /**
     * 根据ID查询出售详情
     * @param id 
     */
    detail: (id: string) => new GetRequestModel<BuildingSaleVo>
    (`${MODULE_PREFIX}/${id}`).request()
}
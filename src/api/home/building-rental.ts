import { GetRequestModel, PostRequestModel, type QueryType } from '@/http/request-model.ts'
import type { PageModel } from '@/http/result-model.ts'
import type { BuildingRentalVo } from '@/entity/home/building-rental.ts'

const MODULE_PREFIX = '/h5/building_rental'

export default {
    /**
     * 分页查询出租信息
     * @param query
     */
    page: (query?: QueryType) => new PostRequestModel<PageModel<BuildingRentalVo>>
    (`${MODULE_PREFIX}/list`, query).request(),
    
    /**
     * 根据ID查询出租详情
     * @param id 
     */
    detail: (id: string) => new GetRequestModel<BuildingRentalVo>
    (`${MODULE_PREFIX}/${id}`).request()
}
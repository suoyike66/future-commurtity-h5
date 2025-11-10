import { PostRequestModel, type QueryType } from '@/http/request-model.ts'
import type { OnlineRepairVo } from '@/entity/service/repair/online-repair.ts'

const MODULE_PREFIX = '/h5/online_repair'
export default {
	/**
	 * 新增报修信息
	 * @param query
	 */
	add: (query?: QueryType) => new PostRequestModel<OnlineRepairVo>(`${MODULE_PREFIX}/`, query).request()
}

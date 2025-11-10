import type { ResidentVo } from "@/entity/home/resident"
import { GetRequestModel } from "@/http/request-model"
// 当前模块通用请求前缀
const MODULE_PERFIX = '/h5/resident'
export default {
    /**
     * 查询用户个人的住户信息
     * @returns 
     */
    my: () => new GetRequestModel<ResidentVo>(`${MODULE_PERFIX}/my`, {}).request()
}

import type { CarParkingVo } from "@/entity/home/car-parking"
import { GetRequestModel } from "@/http/request-model"
const MODULE_PREFIX = '/h5/car_parking'
export default {
    /**
     * 获取车位数量信息
     * @returns 
     */
    number: () => new GetRequestModel
    <Record<string, CarParkingVo>>
    (`${MODULE_PREFIX}/number`).request()
}
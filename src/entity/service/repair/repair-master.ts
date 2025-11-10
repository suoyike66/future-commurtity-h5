/**
 * RepairMasterVo
 *
 * @author 陈学礼
 * @date 2022-03-06 21:27:05
 */
import { BusinessPO } from '@/entity/common/base'

export interface RepairMasterVo extends BusinessPO {
	// 维修师傅id
	name: string

	// 维修师傅用户id
	userId: string

	// 手机号
	phone: string

	// 头像
	avatar: string
}

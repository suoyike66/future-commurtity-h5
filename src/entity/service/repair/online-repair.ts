import type { RepairMasterVo } from '@/entity/service/repair/repair-master'
import type { RoomVo } from '@/entity/home/room'
import type { BussinessPO } from '@/entity/common/base'
import type { LogFile } from '@/entity/system-log/log-file'

export interface OnlineRepairVo extends BussinessPO {
	// 场所类型id（数据字典 online_repair_type）
	typeId: string

	// 场所名称
	typeName: string

	// 房屋id
	roomId: string

	// 维修地点
	place: string

	// 描述信息
	content: string

	// 问题类型id（数据字典 online_repair_question_type）
	questionTypeId: string

	// 问题类型名称
	questionTypeName: string

	// 维修师傅id
	repairMasterId: string

	// 预约上门时间
	repairDate: string

	// 申报人id
	publishUserId: string

	// 联系人
	concatName: string

	// 联系电话
	concatPhone: string

	// 状态 1=已申报 2=已接单 3=已维修
	status: 1 | 2 | 3

	//维修师傅信息
	repairMasterVo: RepairMasterVo

	//房屋信息
	room: RoomVo

	// 报事图片
	imgList: Array<LogFile> | Array<string>

	// 报事图片(以逗号分割)
	imgListString: string

	// 接单详情
	ordersVo: OnlineSendOrdersVo

	// 处理进度
	processVo: Array<OnlineOrdersProcessVo>

	// 回单信息
	ordersReceiptVo: OnlineOrdersReceiptVo
	// 消息id
	msgId: string

	[key: string]: unknown
}
// 数量
export interface OnlineRepairNumVo {
	//全部数量
	all: number

	//待处理数量
	pending: number

	//处理中数量
	processed: number

	//已完成数量
	completed: number
}

// 进度
export interface OnlineOrdersProcessVo extends BussinessPO {
	// 派单id
	onlineSendOrdersId: string

	// 处理描述
	content: string

	// 状态 1=待处理 2=处理中 3=已完成
	status: 1 | 2 | 3
}

// 派单
export interface OnlineSendOrdersVo extends BussinessPO {
	// 维修师傅id
	repairMasterId: string

	// 报事/报修id
	targetId: string

	// 派单时间
	orderTime: string

	// 接单类型 1=报修 2=报事
	type: 1 | 2

	// 状态 1=待接单 2=已接单 3=处理中 4=已处理 5=已回单
	status: 1 | 2 | 3 | 4 | 5
}

// 回单
export interface OnlineOrdersReceiptVo extends BussinessPO {
	// 派单id
	onlineSendOrdersId: string

	// 回单拍照图片id
	photoFileId: string

	// 回单拍照图片路径
	photoFilePath: string

	// 回单内容
	content: string

	// 回单签字图片id
	signFileId: string

	signFilePath: string

	// 处理时间
	handleTime: string

	// 回单签字图片路径
	// 处理时间
	signFileList: Array<string>

	// 派单图片
	receiptPhotoVos: Array<LogFile> | Array<string>
}
// 表单
export interface OnlineRepairVoDTO extends BussinessPO {
	// 联系人
	concatName: string

	// 联系电话
	concatPhone: string

	// 描述信息
	content: string

	// 申报人id
	fkPublishUserId: string

	// 维修师傅id
	fkRepairMasterId: string

	// 房屋id
	fkRoomId: string

	// 维修地点
	place: string

	// 问题类型id（数据字典 online_repair_question_type）
	questionTypeId: string

	// 问题类型名称
	questionTypeName: string

	// 预约上门时间
	repairDate: string

	// 状态 1=已申报 2=已接单 3=已维修
	status: 1 | 2 | 3

	// 场所类型id（数据字典 online_repair_type）
	typeId: string

	// 场所名称
	typeName: string

	// 报事图片
	imgList: Array<LogFile>

	// 报事图片(以逗号分割)
	imgListString: string
}

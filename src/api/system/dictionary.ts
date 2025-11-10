import { GetRequestModel } from '../../http/request-model.ts'
import type { DictionaryManage } from '../../entity/system/dictionary-manage.ts'

const MODULE_PREFIX = '/systemDictionary'
export default {
	/**
	 * 根据数据字典组别key查询数据字典名称下拉框
	 * @param rootCode
	 */
	getListByRootCode: (rootCode: string) => new GetRequestModel<Array<DictionaryManage>>(`${MODULE_PREFIX}/listDictionaryByRootCode/${rootCode}`, {}).request()
}

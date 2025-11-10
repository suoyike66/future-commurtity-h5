import { PostRequestModel, type QueryType } from '../../http/request-model.ts'
import { getDefaultConfig } from '../../http/config/custom-config.ts'
import type { LogFile } from '../../entity/system-log/log-file.ts'

const MODULE_PREFIX = '/logFile'
export default {
	/**
	 * 新增文件上传记录信息
	 * @param query
	 */
	upload: (query?: QueryType) => {
		const defaultConfig = getDefaultConfig<LogFile>()
		defaultConfig.hasFile = true
		return new PostRequestModel<LogFile>(`${MODULE_PREFIX}/upload`, query, defaultConfig).request()
	}
}

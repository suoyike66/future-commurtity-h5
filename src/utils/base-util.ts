import { BASE_URL } from '../http/request-model'
import { fileConfig } from '../http/config/custom-config'
import type { LogFile } from '../entity/system-log/log-file.ts'

export const BaseUtil = {
	/**
	 * 获得文件大小
	 */
	getFileSize(size: number) {
		if (size < 1024) {
			return size + 'B'
		} else if (size / 1024 < 1024) {
			return Math.round((size / 1024) * 100) / 100.0 + 'KB'
		} else if (size / 1024 / 1024 < 1024) {
			return Math.round((size / 1024 / 1024) * 100) / 100.0 + 'MB'
		} else if (size / 1024 / 1024 / 1024 < 1024 * 100) {
			return Math.round((size / 1024 / 1024 / 1024) * 100) / 100.0 + 'GB'
		}
	},
	/**
	 * 下载文件
	 */
	downFile(downPath: string, fileName: string) {
		const link = document.createElement('a')
		link.style.display = 'none'
		if (downPath.indexOf(BASE_URL) !== 0) {
			link.href = BASE_URL + downPath
		} else {
			link.href = downPath
		}
		if (fileName != null) {
			link.setAttribute('download', fileName)
		}
		document.body.appendChild(link)
		link.click()
	},
	/**
	 * 下载上传文件
	 * @param fileLog 文件对象
	 */
	downUploadFile(fileLog: LogFile) {
		const downPath = BaseUtil.getUploadPath(fileLog.uploadPath)
		const fileName = fileLog.oldFileName ?? ''
		BaseUtil.downFile(downPath, fileName)
	},
	/**
	 * 下载临时文件
	 * @param path 文件路径
	 * @param fileName 新文件文件名
	 */
	downTempFile(path: string, fileName: string) {
		const downPath = BaseUtil.getTempPath(path)
		BaseUtil.downFile(downPath, fileName)
	},
	/**
	 * 下载备份文件
	 * @param path 文件路径
	 * @param fileName 新文件文件名
	 */
	downBackupFile(path: string, fileName: string) {
		const downPath = BaseUtil.getBackupPath(path)
		BaseUtil.downFile(downPath, fileName)
	},
	/**
	 * 打开、预览文件
	 */
	openUploadFile(path: string) {
		const downPath = BaseUtil.getUploadPath(path)
		window.open(downPath)
	},
	/**
	 * 获得备份文件路径
	 * @param path 文件路径
	 */
	getBackupPath(path: string) {
		// http开头或者前缀开头，不做处理
		if (path.indexOf('http') === 0 || path.indexOf(`${BASE_URL}${fileConfig.backupPrefix}`) === 0) {
			return path
		} else if (path.indexOf(`${fileConfig.backupPrefix}`) === 0) {
			return `${BASE_URL}${path.replace(/\\/g, '/')}`
		}
		return `${BASE_URL}${fileConfig.backupPrefix}${path.replace(/\\/g, '/')}`
	},
	/**
	 * 获得上传文件路径
	 * @param path 文件路径
	 */
	getUploadPath(path: string) {
		// http开头或者前缀开头，不做处理
		if (path.indexOf('http') === 0 || path.indexOf(`${BASE_URL}${fileConfig.uploadPrefix}`) === 0) {
			return path
		} else if (path.indexOf(`${fileConfig.uploadPrefix}`) === 0) {
			return `${BASE_URL}${path.replace(/\\/g, '/')}`
		}
		return `${BASE_URL}${fileConfig.uploadPrefix}${path.replace(/\\/g, '/')}`
	},
	/**
	 * 获得临时文件路径
	 * @param path 文件路径
	 */
	getTempPath(path: string) {
		if (path.indexOf('http') === 0 || path.indexOf(`${BASE_URL}${fileConfig.tempPrefix}`) === 0) {
			return path
		} else if (path.indexOf(`${fileConfig.tempPrefix}`) === 0) {
			return `${BASE_URL}${path.replace(/\\/g, '/')}`
		}
		return `${BASE_URL}${fileConfig.tempPrefix}${path.replace(/\\/g, '/')}`
	}
}

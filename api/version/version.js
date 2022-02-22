import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 获取最新的版本信息
	 */
	async getLatestVersion(userId) {
		let url = '/res/version/latest'
		return await http.get(url)
	},
	
}
	
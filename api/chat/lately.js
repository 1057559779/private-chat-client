import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 获得最新联系人消息列表
	 */
	async getLately() {
		let url = '/res/chat_lately/search'
		return await http.get(url)
	},
}
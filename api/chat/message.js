import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 获得点对点的消息列表
	 */
	async getSingleMessage(param) {
		let url = '/res/chat_message/single_search'
		return await http.get(url,param)
	},
}
import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 获得最新联系人消息列表
	 */
	async getLately() {
		let url = '/res/chat_lately/search'
		return await http.get(url)
	},
	
	/**
	 * 设置当前聊天室的标识 并且清空当前聊天室的未读消息
	 */
	async setRoomFlag(param) {
		let url = '/res/chat_lately/set_room_flag'
		return await http.post(url,param)
	},
	
	/**
	 * 移除当前聊天室的标识
	 */
	async removeRoomFlag(param) {
		let url = '/res/chat_lately/remove_room_flag'
		return await http.post(url,param)
	},
	
}
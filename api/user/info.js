import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 根据id 获取用户
	 * @param {Object} id
	 */
	async getUserInfoById(userId) {
		let url = '/res/user/get_userinfo_by_id'
		return await http.get(url,{userId: userId})
	},
	
	
	/**
	 * 根据用户名和昵称搜索用户
	 */
	async searchUser(param) {
		let url = '/res/user/search_user'
		return await http.get(url,param)
	},
}
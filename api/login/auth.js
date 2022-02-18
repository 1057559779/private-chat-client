import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 账号密码登录接口
	 */
	async login(params) {
		let url = '/authority/login'
		return await http.post(url, params)
	},
	
	/**
	 * 获得用户信息
	 */
	async getUserInfo() {
		let url = '/res/user/get_userinfo'
		return await http.get(url)
	},
	
	
	/**
	 * 登出
	 */
	async logout() {
		let url = '/res/token/logout'
		return await http.get(url)
	},
}
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
		let url = '/res/user/getUserInfo'
		return await http.get(url)
	},
}
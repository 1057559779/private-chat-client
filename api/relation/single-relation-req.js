import http from '@/common/js/util/http-interface.js'
export default {


	/**
	 * 别人发来的所有的好友请求
	 */
	async getSingleRelationByTargets(params) {
		let url = '/res/single_relation_req/search'
		return await http.get(url, params|| {})
	},
	
	/**
	 * 好友请求数量
	 */
	async getSingleRelationCountByTargets(params) {
		let url = '/res/single_relation_req/count_by_targets'
		return await http.get(url, params|| {})
	},
	
	/**
	 * 好友请求创建
	 */
	async addSingleRelationReq(params) {
		let url = '/res/single_relation_req/add'
		return await http.post(url, params|| {})
	},

	
}
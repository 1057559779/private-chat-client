import http from '@/common/js/util/http-interface.js'
export default {
	
	/**
	 * 好友请求查询
	 */
	async getSingleRelation(params) {
		let url = '/res/single_relation_req/search'
		return await http.get(url, params|| {})
	},
	
	
	/**
	 * 好友请求创建（）
	 */
	async addSingleRelationReq(params) {
		let url = '/res/single_relation_req/add'
		return await http.post(url, params|| {})
	},

	
}
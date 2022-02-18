import http from '@/common/js/util/http-interface.js'
export default {
	/**
	 * 查询全量联系人
	 */
	async getSingleRelationList(params) {
		let url = '/res/single_relation/search'
		return await http.get(url, params|| {})
	},
}
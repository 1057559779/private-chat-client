/**
 * 关联 store
 */
export default {
	namespaced: true,
	state: {
		singleRelationCountByTargets: 0, //好友请求的数量
	},
	mutations: {
		//登录者收到的好友请求数量
		SET_SINGLE_RELATION_COUNT_BY_TARGETS: (state,count) =>{
			state.singleRelationCountByTargets = count
		},
	}
	
}


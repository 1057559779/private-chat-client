/**
 * 关联 store
 */
export default {
	namespaced: true,
	state: {
		singleRelationCount: 0, //好友请求的数量
	},
	mutations: {
		//覆盖好友请求列表
		SET_SINGLE_RELATION_COUNT: (state,count) =>{
			state.onShsingleRelationListowFlag = count
		},
	}
	
}


/**
 * 关联 store
 */
export default {
	namespaced: true,
	state: {
		relationList: []//好友列表
	},
	mutations: {
		//设置好友列表
		SET_RELATION_LIST: (state,list) =>{
			state.relationList = list
		},
	}
	
}


/**
 * 关联 store
 */
export default {
	namespaced: true,
	state: {
		relationList: [],//好友列表
		nowRelationReq: {}, //最近的201好友请求变化标识，用于页面监听
	},
	getters: {
		//获得最新的好友请求的标识，可以被watch监听
		getNowRelationReq(state) {
			return state.nowRelationReq
		}
	},
	mutations: {
		//设置好友列表
		SET_RELATION_LIST: (state,list) =>{
			state.relationList = list
		},
		//添加好友列表
		CHANGE_RELATION_LIST: (state,item) =>{
			state.relationList.push(item)
		},
		//将收到的201消息变化标识，用于页面监听
		CHANGE_NOW_RELATION_REQ: (state,item) =>{
			state.nowRelationReq = item
		}
	}
	
}


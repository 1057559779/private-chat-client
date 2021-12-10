/**
 * chat store
 */
export default {
	namespaced: true,
	state: {
		//聊天室标识
		roomFlag: {
			type: null ,//默认为点对点通讯
			targetId: null,
		},
		//最新联系人列表（首页）
		latelyList: []
	},
	getters: {
		//获得聊天室标识
		getRoomFlag(state) {
			return state.roomFlag
		},
		//获得最新联系人整个列表
		getLatelyList(state) {
			return state.latelyList
		}
	},
	mutations: {
		//移除聊天室标识
		REMOVE_ROOM_FLAG: (state) =>{
			state.roomFlag = {
				type: null ,//默认为点对点通讯
				targetId: null,
			}
		},
		//添加聊天室标识
		SET_ROOM_FLAG: (state,flag) =>{
			state.roomFlag = flag
		},
		//将整个最新联系人list 存入
		SET_LATELY_LIST: (state,list) =>{
			state.latelyList = list
		},
	}
	
}

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
		latelyList: [],
		//当前最新的200状态的消息，用于其他 页面的监听
		nowMessage: {},
	},
	getters: {
		//获得聊天室标识
		getRoomFlag(state) {
			return state.roomFlag
		},
		//获得最新联系人整个列表
		getLatelyList(state) {
			return state.latelyList
		},
		getNowMessage(state) {
			return state.nowMessage
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
			//得到符合条件的那个index
			let index = state.latelyList.findIndex(e => e.targetId === flag.targetId)
			//该联系人未读数量清零
			state.latelyList[index].noRead = 0
		},
		//将整个最新联系人list 存入
		SET_LATELY_LIST: (state,list) =>{
			state.latelyList = list
		},
		//将收到的消息全放到这个属性中，用于监听
		CHANGE_NOW_MESSAGE: (state,item) =>{
			state.nowMessage = item
		}
	}
	
}

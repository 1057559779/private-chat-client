/**
 * 系统支持 store
 */
export default {
	namespaced: true,
	state: {
		//single单叶的 onShow标识
		onShowFlag: 0
	},
	mutations: {
		//移除聊天室标识
		SET_ONSHOWFLAG: (state) =>{
			state.onShowFlag +=1
		},
	}
	
}

/**
 * 系统支持 store
 */
export default {
	namespaced: true,
	state: {
		//single单页的 onShow标识
		onShowFlag: 0,
		//底部的tabbar
		tabbarList: [
				{
					title: "消息",
					name: "IndexPage",
					iconPath: "/static/tabbar/message.png",
					count: 0,
					selectedIconPath:"/static/tabbar/message-active.png",
				},
				{
					title: "联系人",
					name: "RelationPage",
					iconPath: "/static/tabbar/relation.png",
					count: 0,
					selectedIconPath:"/static/tabbar/relation-active.png",
				},
				{
					title: "我的",
					name: "MyCenterPage",
					iconPath: "/static/tabbar/mine.png",
					count: 0,
					selectedIconPath:"/static/tabbar/mine-active.png",
				}
		]
	},
	getters: {
		//获得tabbar
		getTabbarList(state) {
			return state.tabbarList
		},
		//获得好友关联请求的数量
		getRelationReqCount(state) {
			let index = state.tabbarList.findIndex(e =>e.name == "RelationPage")
			let count = state.tabbarList[index].count
			return count || 0
		}
	},
	mutations: {
		//移除聊天室标识
		SET_ONSHOWFLAG: (state) =>{
			state.onShowFlag +=1
		},
		//全量未读消息的设置
		SET_TABBAR_MESSAGE_COUNT: (state,valObj) =>{
			//根据name的值找到具体的tab
			let index = state.tabbarList.findIndex(e =>e.name == valObj.key)
			state.tabbarList[index].count = valObj.count
			
		},
		//全量未读消息的更改
		CHANGE_TABBAR_MESSAGE_COUNT: (state,valObj) =>{
			//根据name的值找到具体的tab
			let index = state.tabbarList.findIndex(e =>e.name == valObj.key)
			state.tabbarList[index].count += valObj.count
			
		},
	}
	
}

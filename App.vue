<script>
	import ToastUtil from "@/common/js/util/toast-util.js"
	import {mapGetters,mapMutations,mapState} from "vuex"
	import wsClient from "@/common/js/util/ws-client.js"
	import messagePush from "@/config/push"
	import latelyApi from "@/api/chat/lately.js"
	import userInfoApi from "@/api/user/info.js"
	export default {
		onLaunch: function() {
			//初始化
			this.init();
		},
		onShow: function() {
			//如果存在room标识，则在页面回来当时候再加进去
			if(this.roomFlag && this.roomFlag.targetId) {
				latelyApi.setRoomFlag(this.roomFlag)
			}
		},
		onHide: function() {
			//redis中标识删除
			if(this.roomFlag && this.roomFlag.targetId) {
				latelyApi.removeRoomFlag(this.roomFlag)
			}
		},
		computed: {
			...mapState({
			    latelyList: (state) => state.chat.latelyList,
			}),
			...mapGetters({
				isLoginFlagValid: "user/isLoginFlagValid",
				token: "user/getToken",
				roomFlag: "chat/getRoomFlag",
				userInfo: "user/getUserInfo"
			}),
			latelyListComp: {
				get() {
					return this.latelyList
				},
				set(list) {
					this.setLatelyList(list)
				}
			}
		},
		methods:{
			...mapMutations({
			    removeUserInfo(commit) {
			      commit("user/REMOVE_USER_INFO")
			    },
				removeToken(commit) {
			      commit("user/REMOVE_TOKEN")
			    },
				removeRoomFlag(commit) {
			      commit("chat/REMOVE_ROOM_FLAG")
			    },
				setRoomFlag(commit,flag) {
			      commit("chat/SET_ROOM_FLAG",flag)
			    },
				changeNowMessage(commit,item) {
			      commit("chat/CHANGE_NOW_MESSAGE",item)
			    },
				setLatelyList(commit,list) {
			      commit("chat/SET_LATELY_LIST",list)
			    },
			}),
			async handleSingle(message) {
				//得到所有符合条件的联系人的id
				let ids = this.latelyList.filter(e => {
					if(e.targetId === message.senderId || e.targetId === message.targetId) {
						return true;
					}
				}).map(i => i.targetId)
				//通过ids 在对应数据中进行最近联系人更新
				ids.forEach(i => {
					//降序排序
					let index = this.latelyList.findIndex( e => e.targetId === i)
					
					//数据更新 有room标识
					if(this.roomFlag && this.roomFlag.targetId) {
						//说明没在当前聊天室中，noRead数量不需要增加
						if(this.roomFlag.targetId !== this.latelyList[index].targetId) {
							this.latelyList[index].noRead +=1
						}
					}else {
						//没有room标识
						this.latelyList[index].noRead +=1
					}
					
					this.latelyList[index].message = message.message
					
					this.latelyList[index].updateTime = message.createdTime
					
					//将当前元素暂存起来
					let temp = this.latelyList[index]
					
					//删除当前位置的元素
					this.latelyList.splice(index,1)
					
					//从头部插入，实现新消息置顶
					this.latelyList.unshift(temp)
					
		
				})
				//说明消息有，但是不存在最近联系人
				if(ids.length === 0) {
					let targetId = null
					if(message.senderId !== this.userInfo.id) {
						targetId = message.senderId
					}else if(message.targetId !== this.userInfo.id) {
						targetId = message.targetId
					}
					//拿到用户信息
					const userInfo = await userInfoApi.getUserInfoById(targetId)
					//拼装联系人对象
					let obj = {
						show: false,
						type: 1,
						id: this.$getUUID(),//生成uuid
						message: message.message,
						noRead: 1,
						targetId : targetId,
						updateTime: message.createdTime,
						targetUserInfo: userInfo
					}
					this.latelyList.push(obj)
				}
				
				
			},
			init(){
				//websocket 客户端开始连接
				wsClient.open();
				
				wsClient.receiveMessage((res)=>{
					let obj = JSON.parse(res)
				
					//说明是无权限的
					if(obj.statusCode === 401) {
						ToastUtil.show(obj.content)
						// 删除一些用户标识
						this.removeUserInfo()
						this.removeToken()
						
						uni.reLaunch({
							url: "/pages/login/login"
						})
					}
					
					if(obj.statusCode === 200) {
						let message = obj.chatMessage
						//更改最新的消息，告诉其他页面新消息来了
						this.changeNowMessage(obj)
						if(message.targetType === 1) {
							this.handleSingle(message)
						}
					}
				})
			}
		},
		watch: {
			token(v) {
				//当token不存在当时候 手动关闭ws服务
				if(!v) {
					console.log(v)
					wsClient.close()
				}
			}
		},
	
	}
</script>

<style lang="scss">
	
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page {
		background-color: #ffffff;
	}
</style>

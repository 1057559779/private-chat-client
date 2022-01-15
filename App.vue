<script>
	import ToastUtil from "@/common/js/util/toast-util.js"
	import {mapGetters,mapMutations,mapState} from "vuex"
	import wsClient from "@/common/js/util/ws-client.js"
	import messagePush from "@/config/push"
	import latelyApi from "@/api/chat/lately.js"
	import userInfoApi from "@/api/user/info.js"
	import singleRelationReqApi from "@/api/relation/single-relation-req.js"
	import relationApi from "@/api/relation/single-relation.js"
	export default {
		onLaunch: function() {
			//ios下 切出应用就会断连 所以连接建立放在onShow中
		},
		onShow: function() {
			//初始化
			this.init();
			//如果存在room标识，则在页面回来当时候再加进去
			if(this.roomFlag && this.roomFlag.targetId) {
				latelyApi.setRoomFlag(this.roomFlag)
			}
		},
		onHide: function() {
			wsClient.close()
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
				//消息变化监听
				changeNowMessage(commit,item) {
			      commit("chat/CHANGE_NOW_MESSAGE",item)
			    },
				//添加最近联系人列表
				setLatelyList(commit,list) {
			      commit("chat/SET_LATELY_LIST",list)
			    },
				//设置未阅读数量
				setNoReadCount(commit, value) {
				  commit("support/SET_TABBAR_MESSAGE_COUNT",value)
				},
				//更改未阅读数量
				changeNoReadCount(commit, value) {
				  commit("support/CHANGE_TABBAR_MESSAGE_COUNT",value)
				},
				//设置好友列表
				setRelationList(commit,list) {
			      commit("relation/SET_RELATION_LIST",list)
			    },
			}),
			//初始化，ws与基础数据
			init(){
				
				//websocket 客户端开始连接
				wsClient.open( async ()=>{
					await this.getLatelyList()
					await this.getSingleReqCount()
					await this.getRelationList()
					//接受消息
					this.receiveMessage()
				});
			},
			//ws消息接受监听
			receiveMessage() {
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
			},
			//点对点消息接受处理函数
			async handleSingle(message) {
				
				//得到所有符合条件的联系人的id
				let ids = this.latelyList.filter(e => {
					if(e.targetId == message.senderId || e.targetId == message.targetId) {
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
						//设置首页tabbar的值 未读+1
						this.changeNoReadCount({
							key: "IndexPage",
							count: 1
						})
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
				if(ids.length == 0) {
					let targetId = null
					if(message.senderId !== this.userInfo.id) {
						targetId = message.senderId
					}else if(message.targetId !== this.userInfo.id) {
						targetId = message.targetId
					}
					//拿到用户信息
					const userInfo = await userInfoApi.getUserInfoById(targetId)
					let noRead = 0 
					
					//数据更新 有room标识
					if(this.roomFlag && this.roomFlag.targetId) {
						//说明没在当前聊天室中，noRead数量不需要增加
						if(this.roomFlag.targetId !== targetId) {
							noRead=1
						}
					}else {
						//没有room标识
						noRead = 1
						//设置首页tabbar的值 未读+1
						this.changeNoReadCount({
							key: "IndexPage",
							count: 1
						})
					}
					
					//拼装联系人对象
					let obj = {
						type: 1,
						id: this.$getUUID(),//生成uuid
						message: message.message,
						noRead: noRead,
						targetId : targetId,
						updateTime: message.createdTime,
						targetUserInfo: userInfo
					}
					this.latelyList.unshift(obj)
				}
			},
			//获得别人向登录者发来的好友请求数量
			async getSingleReqCount() {
			  let param = {
				  targetId: this.userInfo.id
			  }	
			  const res = await singleRelationReqApi.getSingleRelationCountByTargets(param)
			  //设置Tabbar的红点
			  this.setNoReadCount({
			  	key: "RelationPage",
			  	count: res
			  })
			},
		
			//加载最新联系人
			async getLatelyList() {
				let res = await latelyApi.getLately()
			
				//得到的最近联系人数据纳入vuex中
				this.setLatelyList(res)
				//得到的当前联系人所有的未阅读数量纳入vuex中
				let allNoRead = 0
				let noReadArr = res.map(e => e.noRead)
				//计算 未阅读数量数组
				if(noReadArr.length > 0) {
					allNoRead = noReadArr.reduce((prev, curr)=>{
						return prev + curr;
					})
				}
				this.setNoReadCount({
					key: "IndexPage",
					count: allNoRead
				})
			},
			//加载好友列表，全量无分页
			async getRelationList() {
				let res = await relationApi.getSingleRelationList()
				this.setRelationList(res)
			}
			
		},
		watch: {
			token(v) {
				//当token不存在当时候 手动关闭ws服务
				if(!v) {
					wsClient.close()
				}
				//不然说明是登录进来的
				else if(v){
					//websocket 客户端开始连接 login也属于app.vue的子页，所以login登录后需要app页面watch一下
					this.init()
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

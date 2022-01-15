<template>
	<view>
		<UserDetailTopbar @back="back"></UserDetailTopbar>
		<view class="user-detail-box safe">
			<view class="detail-box">
				详细内容
			</view>
			<view class="bottom-box" v-if="userDetail">
				<!-- existSingleRelation == true 待验证 -->
				<view class="simple-btn disable" v-if="userDetail.existSingleRelation == true">
					待验证
				</view>
				<!-- existSingleRelation false && friendList 不存在该人 需要加好友 -->
				<view class="simple-btn" 
					v-else-if="userDetail.existSingleRelation == false 
						&& relationList.findIndex(e => e.targetId == userDetail.id ) < 0">
					加好友
				</view>
				<!-- 剩余情况 可以发消息 -->
				<view class="simple-btn"
					@click="goSingleRoom(userDetail.id)"
					v-else-if="relationList.findIndex(e => e.targetId == userDetail.id ) > -1">
					发消息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserDetailTopbar from "./user-detail-topbar.vue"
	import userApi from "@/api/user/info.js"
	import latelyApi from "@/api/chat/lately.js";
	import {mapGetters,mapMutations,mapState} from "vuex"
	export default {
		components: {
			UserDetailTopbar
		},
		computed:{
			...mapState({
				//好友列表
			    relationList: (state) => state.relation.relationList,
				//最近联系人列表，为了得到未阅读数量
				latelyList: (state) => state.chat.latelyList,
			}),
		},
		data() {
			return {
				userDetail: null
			}
		},
		onLoad(param) {
			let userId = param.userId
			//得到用户详情  在这个详情页面发起聊天以及好友请求
			
			this.getUserDetail(userId)
		},
		methods: {
			...mapMutations({
			    setRoomFlag(commit, flag) {
			      commit("chat/SET_ROOM_FLAG", flag)
			    },
				changeNoReadCount(commit, value) {
			      commit("support/CHANGE_TABBAR_MESSAGE_COUNT",value)
			    },
			}),
			//发送请求
			async addRequest(userId) {
				this.btnLoading = true
				
				//用于http请求的参数
				let param = {
					targetId: userId,
					status: 0
				}
			
				//入库
				try {
					const returnId = await relationReqApi.addSingleRelationReq(param)
					
					//用户ws 201状态传输的参数
					param.id = returnId
					
					let messageObj = {
						statusCode: 201,
						singleRelationReq: param
					}
					//对象json字符串化
					let str = JSON.stringify(messageObj)
					
					//实时通讯通知目标用户
					wsClient.send(str)
					
					this.btnLoading = false
				}catch {
					this.btnLoading = false
				}	
			},
			//获得用户详情
			async getUserDetail(userId) {
				const userDetail = await userApi.getUserDetailInfoById(userId)
				this.userDetail = userDetail
			},
			back() {
				uni.navigateBack()
			},
			//前往目标用户的聊天室
			async goSingleRoom(targetId) {
				let noRead = 0
				let targetIndex = this.latelyList.findIndex(e => e.targetId == targetId)
				//说明最近联系人存在这个用户
				if(targetIndex > -1) {
					noRead = this.latelyList[targetIndex].noRead
					//根据item的未读数量 减去相应tabbar的未读数量
					this.changeNoReadCount({
						key: "IndexPage",
						count: -noRead
					})
				}
				let param = {
					type: 1,
					targetId: targetId
				}
				
				//这个接口中，同时会清空noRead  库中
				await latelyApi.setRoomFlag(param)
				//设置flag同时 noRead清空  静态的
				this.setRoomFlag(param)
				
				uni.navigateTo({
					url: `/pages/chat-room/single-room?userId=${targetId}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-detail-box {
		//去掉topbar
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: height .2s;
		height: calc(100vh - 85rpx - var(--status-bar-height));
		&.safe {
			background-color: $global-general;
			//底部安全局 padding
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.detail-box {
			min-height: 0;
			background-color: $global-general;
			flex: 1;
		}
		.bottom-box {
			padding: 0 10rpx;
			.simple-btn {
				border-radius: 14rpx;
				padding: 15rpx 0;
				text-align: center;
				background-color: $global-primary;
				color: #ffffff;
				&.disable {
					background-color: lighten($global-primary, 40%);
				}
			}
			
		}
	}
</style>

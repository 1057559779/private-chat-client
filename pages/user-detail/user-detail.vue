<template>
	<view>
		<UserDetailTopbar @back="back"></UserDetailTopbar>
		<view class="user-detail-box safe">
			<view class="detail-box">
				详细内容
			</view>
			<view class="bottom-box" v-if="userDetail">
				<!-- existSingleRelation == true 待验证 -->
				<view class="simple-btn" >
					待验证
				</view>
				<!-- existSingleRelation false && friendList 不存在该人 需要加好友 -->
				<!-- 剩余情况 可以发消息 -->
			</view>
		</view>
	</view>
</template>

<script>
	import UserDetailTopbar from "./user-detail-topbar.vue"
	import userApi from "@/api/user/info.js"
	export default {
		components: {
			UserDetailTopbar
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
			async getUserDetail(userId) {
				const userDetail = await userApi.getUserDetailInfoById(userId)
				this.userDetail = userDetail
			},
			back() {
				uni.navigateBack()
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
			}
			
		}
	}
</style>

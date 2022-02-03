<template>
	<view>
		<UserDetailTopbar @back="back"></UserDetailTopbar>
		<view class="user-detail-box safe">
			<view class="detail-box"  v-if="userDetail">
				<!-- userDetail是后续加载出来的，所以需要v-if去判断 -->
				<view class="base-info">
					<view class="avatar-area">
						<u-avatar :size="150" class="avatar-box"
						:src="userDetail.avatar" mode="circle"></u-avatar>
					</view>
					<view class="info-area">
						<view class="nick-area">
							<view class="nick-text">{{userDetail.showName}}</view>
							<view v-if="userDetail.sex" :class="userDetail.sex == 1?'man':'woman'">
								<u-icon :name="userDetail.sex == 1?'man':'woman'"></u-icon>
							</view>
						</view>
						<view class="username-area">
							<text class="area-title">用户名:</text>
							{{userDetail.userName}}
						</view>
					</view>
				</view>
				<view class="generate-box">
					<!-- 个性签名 -->
					<view class="comment-area">
						<u-icon name="edit-pen-fill" class="area-title"></u-icon>
						{{userDetail.selfComment}}
					</view>
				</view>
				
			</view>
			<view class="bottom-box" v-if="userDetail">
				<!-- existSingleRelation == true 待验证 -->
				<view class="simple-btn disable" v-if="userDetail.existSingleRelation == true
						&& relationList.findIndex(e => e.targetId == userDetail.id ) < 0">
					待验证
				</view>
				<!-- existSingleRelation false && friendList 不存在该人 需要加好友 -->
				<view class="simple-btn click-active" 
					@click="addRequest(userDetail.id)"
					v-else-if="userDetail.existSingleRelation == false 
						&& relationList.findIndex(e => e.targetId == userDetail.id ) < 0">
					加好友
				</view>
				<!-- 剩余情况 可以发消息 -->
				<view class="simple-btn click-active"
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
	import relationReqApi from "@/api/relation/single-relation-req.js";
	import relationApi from "@/api/relation/single-relation.js";
	import {mapGetters,mapMutations,mapState} from "vuex"
	import wsClient from "@/common/js/util/ws-client.js"
	import ToastUtil from "@/common/js/util/toast-util.js"
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
				//更改好友列表
				changeRelationList(commit,item) {
					commit("relation/CHANGE_RELATION_LIST",item)
				}
			}),
			//发送请求
			async addRequest(userId) {
				this.btnLoading = true
				
				//用于http请求的参数
				let param = {
					targetId: userId,
				}
			
				//入库
				try {
					const messageCode = await relationReqApi.addSingleRelationReq(param)
					
					//静态的更改状态
					this.userDetail.existSingleRelation = true
					
					//201 请求添加
					if(messageCode == 201) {
						//用户ws 201状态传输的参数
						param.id = this.$getUUID()
						
						let messageObj = {
							statusCode: messageCode,
							singleRelationReq: param
						}
						
						//对象json字符串化
						let str = JSON.stringify(messageObj)
						
						//实时通讯通知目标用户
						wsClient.send(str)
					}
					//202 好友添加
					else if(messageCode == 202) {
						//自己的vuex 好友列表加一套 param 其中已经有了targetId
						let newRelation = await relationApi.getSingleRelationList(param);
						//有targetId的情况下，得到的list只有一条数据
						if(newRelation[0] && newRelation.length == 1){
							this.changeRelationList(newRelation[0])
							//实时通讯目标用户列表加一套
							let messageObj = {
								statusCode: messageCode,
								singleRelation: param
							}
							//对象json字符串化
							let str = JSON.stringify(messageObj)
							
							//实时通讯通知目标用户
							wsClient.send(str)
						}else {
							//进入这个地方，说明返回的数据为空或者多余一条
							ToastUtil.show("异常操作")
						}	
					}
					
					
					
					
					
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
		.area-title {
			margin-right: 10rpx;
			color: #999999;
		}
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
			.base-info {
				display: flex;
				.avatar-area {
					padding: 10rpx 25rpx;
					.avatar-box {
						width: 150rpx;
						height: 150rpx;
						border-radius: 100%;
					}
				}
				.info-area {
					padding: 20rpx 0;
					flex: 1;
					.nick-area {
						font-size: 38rpx;
						display: flex;
						.nick-text {
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							max-width: 350rpx;
						}
						.woman {
							color: #FF0080;
						}
						.man {
							color: $global-primary;
						}
					}
					.username-area {
						font-size: 28rpx;
					}
				}
			}
			.generate-box {
				padding: 25rpx;
				.comment-area {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
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
					background-color: lighten($global-primary, 70%);
				}
			}
			.click-active {
				&:active {
					background-color: darken($global-primary, 10%);
				}
			}
		}
	}
</style>

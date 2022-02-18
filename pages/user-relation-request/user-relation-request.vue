<template>
	<view>
		<UserRelationReqTopbar @back="back"></UserRelationReqTopbar>
		<view class="req-list">
			<view class="req-item" v-for="item in reqList" :key="item.id">
				<u-avatar :size="100" class="item-avatar"
				:src="item.userInfo.avatar" mode="circle" @click="runToDetail(item)"></u-avatar>
				<view class="content">
					<view class="show-name">
						{{`${item.userInfo.showName}(${item.userInfo.userName})`}}
					</view>
					<view class="sex">
						<view v-if="item.userInfo.sex" :class="item.userInfo.sex == 1?'man':'woman'">
							<u-icon :name="item.userInfo.sex == 1?'man':'woman'"></u-icon>
						</view>
					</view>
					<view class="comment">
						{{item.userInfo.selfComment}}
					</view>
				</view>
				<view class="action">
					<template v-if="item.status == 0">
						<u-button :loading="clickItem == item.id && btnLoad"
						size="mini" @click="agree(item)">同意</u-button>
						<u-icon name="close" class="reject"></u-icon>
					</template>
					<template v-else-if="item.status == 1">
						<text class="is-agree">已同意</text>
					</template>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserRelationReqTopbar from "./user-relation-req-topbar.vue"
	import singleRelationReqApi from "@/api/relation/single-relation-req.js"
	import singleRelationApi from "@/api/relation/single-relation.js";
	import userApi from "@/api/user/info.js"
	import {mapGetters,mapMutations,mapState} from "vuex"
	import wsClient from "@/common/js/util/ws-client.js"
	import ToastUtil from "@/common/js/util/toast-util.js"
	export default {
		components: {
			UserRelationReqTopbar
		},
		computed: {
			...mapGetters({
				//如果有新请求来，可以监听得到
				nowRelationReq: "relation/getNowRelationReq",
			}),	
		},
		data() {
			return {
				reqList: [],
				btnLoad: false,
				clickItem: "",
			}
		},
		methods: {
			...mapMutations({
				changeNoReadCount(commit, value) {
				  commit("support/CHANGE_TABBAR_MESSAGE_COUNT",value)
				},
				//更改好友列表
				changeRelationList(commit,item) {
					commit("relation/CHANGE_RELATION_LIST",item)
				}
			}),
			back() {
				uni.navigateBack()
			},
			//前往用户详情页
			runToDetail(item) {
				let id = item.userInfo.id
				uni.navigateTo({
					url: `/pages/user-detail/user-detail?userId=${id}`
				})
			},
			async getReqList() {
				let param = {
					current: 1,
					size:10
				}
				const res = await singleRelationReqApi.getSingleRelationByTargets(param)
				//让所有res加上未添加的固定状态
				res.forEach(e => e.status = 0)
				this.reqList = res
			},
			async agree(item) {
				this.clickItem = item.id
				this.btnLoad = true
				//目标用户
				let targetId = item.userInfo.id
				let param = {
					targetId: targetId,
				}
				
				try {
					//复用请求发送的接口
					const messageCode = await singleRelationReqApi.addSingleRelationReq(param)
							
					//201 请求添加 不过一般情况来将这个条件在这个页面中是不可能会执行到的
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
						let newRelation = await singleRelationApi.getSingleRelationList(param);
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
							
							//tabar联系人角标-1
							this.changeNoReadCount({
								key: "RelationPage",
								count: -1
							})
						}else {
							//进入这个地方，说明返回的数据为空或者多余一条
							ToastUtil.show("异常操作")
						}
						let itemIndex = this.reqList.findIndex(e => e.id ==  item.id)
						//点击状态变更 已发送
						this.reqList[itemIndex].status = 1
						this.btnLoad = false		
					}
				}catch {
					this.btnLoading = false
				}
				
				
				
			}
		},
		watch: {
			//监听请求的变化
			async nowRelationReq(v) {
				let senderId = v.senderId
				//判断请求列表中是否已经存在这个发送者
				let noExist = this.reqList.findIndex(e => e.userInfo.id ==  senderId) < 0
				//如果不存在 则加入
				if(noExist) {
					let obj = v
					const userInfo = await userApi.getUserInfoById(senderId)
					obj.userInfo = userInfo
					//加入固定未添加状态
					obj.status = 0
					//将查出来的用户加入到请求列表头中
					this.reqList.unshift(obj)
					
				}
			}
		},
		onLoad() {
			this.getReqList()
		}
		
	}
</script>

<style scoped lang="scss">
	.req-list {
		.req-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			.item-avatar {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				transition: transform .15s;
				&:active {
					transform: scale(0.9)
				}
			}
			.content {
				flex: 1;
				min-width: 0;
				height: 120rpx;
				.show-name {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 32rpx;
				}
				.sex {
					font-size: 24rpx;
					display: inline-block;
					font-size: 24rpx;
					padding: 2rpx 18rpx;
					background-color: $global-general;
					border-radius: 4rpx;
					color: #999999;
					.woman {
						color: #FF0080;
					}
					.man {
						color: $global-primary;
					}
				}
				.comment {
					font-size: 26rpx;
					color: #999999;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
			.action {
				display: flex;
				align-items: center;
				.reject {
					margin-left: 15rpx;
					font-size: 25rpx;
				}
				.is-agree {
					cursor: not-allowed;
					color: #999999;
				}
			}
		}
	}
</style>

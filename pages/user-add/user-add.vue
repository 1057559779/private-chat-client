<template>
	<view class="user-add-page">
		<view>
			<UserAddTopbar v-model="searchVal" @search="getList"></UserAddTopbar>
		</view>
		<view class="user-add-box">
			<view class="user-list">
				<view class="user-item" v-for="(item,index) in userList" :key="index">
					<u-avatar :size="100" class="item-avatar" 
					:src="item.avatar" mode="square"></u-avatar>
					<view class="content">
						<view class="show-name">
							{{`${item.showName}(${item.userName})`}}
						</view>
						<view class="sex">
							<view v-if="item.sex" :class="item.sex == 1?'man':'woman'">
								<u-icon :name="item.sex == 1?'man':'woman'"></u-icon>
							</view>
						</view>
						<view class="comment">
							{{item.selfComment}}
						</view>
					</view>
					<view class="action">
						<text v-if="getAddReqByuserId(item.id).status == 0">待验证</text>
						<!-- 只要请求list中不存在 或者 状态是拒绝的，才可以添加 （如果状态拒绝，则添加其实是更新操作） -->
						<template v-else-if="getAddReqByuserId(item.id) == false || getAddReqByuserId(item.id).status == 2">
							<u-button plain size="mini"  @click="addRequest(item.id)">
								<u-loading mode="flower" v-if="btnLoading && nowClickId == item.id"></u-loading>
								<text v-else>添加</text>
							</u-button>
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import UserAddTopbar from "./user-add-topbar.vue"
	import ToastUtil from "@/common/js/util/toast-util.js"
	import userApi from "@/api/user/info.js"
	import wsClient from "@/common/js/util/ws-client.js"
	import relationReqApi from "@/api/relation/single-relation-req.js"
	import {mapGetters} from "vuex";
	
	export default {
		components: {
			UserAddTopbar
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo",
			}),
			getAddReqByuserId() {
				return (id)=> {
					let index = this.isAddList.findIndex(e => e.targetId == id)
					//说明不存在
					if(index < 0) {
						return false
					}
					let obj =  this.isAddList[index]
					return obj
				}
			}
		},
		data() {
			return {
				searchVal: "",
				current: 1,
				size: 30,
				userList: [],
				nowClickId: "", //当前点击的用户id
				btnLoading: false,
				isAddList: "" //已经发送出去的列表
			}
		},
		methods: {
			async getList() {
				if(!this.searchVal) {
					ToastUtil.show("搜索内容不能为空")
					return;
				}
				let param = {
					searchVal: this.searchVal,
					current: 1,
					size: 30
				}
				const res = await userApi.searchUser(param)
				this.userList = res
			},
			//发送请求
			async addRequest(userId) {
				this.btnLoading = true
				this.nowClickId = userId
				
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
			}
		},
		async onLoad() {
			let param = {
				senderId: this.userInfo.id
			}
			//将已经发送出申请数据获取到，用于判断当前列表的状态
			const res = await relationReqApi.getSingleRelation(param)
			this.isAddList = res
		},
		onReachBottom() {
			this.current+=1
			this.getList()
		},
	}
</script>

<style scoped lang="scss">
	.user-add-page {
		background-color: #ffffff;
		height: 100%;
	
		.user-add-box {
			.user-list {
				.user-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					.item-avatar {
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
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
						text-align: center;
						width: 120rpx;
						.add-btn {
							display: inline-block;
							border: 1px solid #999999;
							padding: 5rpx 15rpx;
							border-radius: 5rpx;
							&:active {
								background-color: #dee2e2;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<view class="user-add-page">
		<view>
			<UserAddTopbar v-model="searchVal" @search="getList"></UserAddTopbar>
		</view>
		<view class="user-add-box">
			<view class="user-list">
				<view class="user-item" v-for="(item,index) in userList" :key="index" @click="goDetail(item)">
					<u-avatar :size="100" class="item-avatar" 
					:src="item.avatar" mode="circle"></u-avatar>
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
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import UserAddTopbar from "./user-add-topbar.vue"
	import ToastUtil from "@/common/js/util/toast-util.js"
	import userApi from "@/api/user/info.js"
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
		},
		data() {
			return {
				searchVal: "",
				current: 1,
				size: 30,
				userList: [],
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
				//查询出有值的时候才set进去
				if(res.length > 0) {
					this.userList = res
					return
				}
				ToastUtil.show("查询结果为空")
			},
			goDetail(item) {
				let id = item.id
				uni.navigateTo({
					url: `/pages/user-detail/user-detail?userId=${id}`
				})
			}
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

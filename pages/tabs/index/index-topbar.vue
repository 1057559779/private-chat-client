<!-- 首页-自定义topbar -->
<template>
	<view>
		<MyTopBar>
			<view class="index-topbar">
				<u-avatar :size="55" class="avatar"
				 :src="userInfo.avatar"></u-avatar>
				
				<view class="center">
					{{userInfo.showName}}
				</view>
				<view class="right">
					<MyDropDown>
						<template #title>
							<u-icon name="plus"></u-icon>
						</template>
						<template #list>
							<view class="choise-box">
								<view class="choise-drop-down-item" @click="runToUserAddPage">
									加好友
								</view>
								<view class="choise-drop-down-item">暂未开发</view>
								<view class="choise-drop-down-item">暂未开发</view>
							</view>
						</template>
					</MyDropDown>
				</view>
			</view>
		</MyTopBar>
	</view>
</template>

<script>
	import MyDropDown from "@/components/my-drop-down.vue"
	import MyTopBar from "@/components/my-topbar.vue";
	import {mapGetters} from "vuex";
	
	export default {
		components: {
			MyTopBar,
			MyDropDown
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			})	
		},
		methods: {
			//跳转到用户添加页
			runToUserAddPage() {
				uni.navigateTo({
					url: "/pages/user-add/user-add"
				})
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.index-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 35rpx;
		height: 100%;
		.right {
			font-size: 48rpx;
			color: $global-primary;
		}
		.center {
			//flex: 1;
			//padding: 0 20rpx;
			text-align: center;
			font-size: 32rpx;
		}
		.choise-box {
			background-color: #ffffff;
			border-radius: 20rpx;
			.choise-drop-down-item {
				color: #000000;
				padding: 24rpx 0;
				text-align: center;
				font-size: 28rpx;
			}
		}
	}
</style>

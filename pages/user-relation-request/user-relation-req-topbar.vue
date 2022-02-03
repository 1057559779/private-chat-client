<template>
	<view>
		<MyTopBar>
			<view class="user-relation-req-topbar">
				<view class="left" @click="back">
					<u-icon name="arrow-left"></u-icon>
				</view>	
				
				<view class="center">
					好友请求
				</view>
				<view class="action">
					添加
				</view>
			</view>
		</MyTopBar>
	</view>
</template>

<script>
	import MyTopBar from "@/components/my-topbar.vue";
	export default {
		components: {
			MyTopBar,
		},
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				this.$emit('back')
			}
		},
	
	}
</script>

<style scoped lang="scss">
	.user-relation-req-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 15rpx;
		.left {
			font-size: 48rpx;
			color: $global-primary;
		}
		.center {
			font-size: 32rpx;
		}
		.action {
			font-size: 32rpx;
			color: $global-primary;
			padding-right: 15rpx;
		}
	}
</style>

<template>
	<view>
		<view>
			<MyTopBar>
				<view class="user-detail-topbar">
					<view class="left" @click="back">
						<u-icon name="arrow-left"></u-icon>
					</view>	
					<view class="action">
						<u-icon name="more-dot-fill"></u-icon>
					</view>
				</view>
			</MyTopBar>
		</view>
	</view>
</template>

<script>
	import MyTopBar from "@/components/my-topbar.vue"
	
	export default {
		components: {
			MyTopBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				this.$emit('back')
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-detail-topbar {
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
			font-size: 48rpx;
			color: $global-primary;
			padding-right: 15rpx;
		}
	}
</style>

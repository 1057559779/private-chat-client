<template>
	<view>
		<view>
			<MyTopBar>
				<view class="single-room-topbar">
					<view class="left" @click="back">
						<u-icon name="arrow-left"></u-icon>
					</view>
					<view class="center">
						{{targetInfo.showName}}
					</view>		
					<view class="action">
						<u-icon name="list"></u-icon>
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
		props: {
			targetInfo: {
				type: Object,
				default: ()=>{}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.single-room-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 15rpx;
		.left {
			font-size: 48rpx;
			color: $global-primary;
		}
		.action {
			font-size: 48rpx;
			color: $global-primary;
			padding-right: 15rpx;
		}
	}
</style>

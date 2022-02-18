<!-- 自定义的topbar -->
<template>
	<view class="my-topbar" :style="{'height':`calc(${85+outHeight}rpx + ${statusBarHeight})`}">
		<view class="my-topbar-content">
			<!--80高度的话 不知道为啥会多算出一部分 -->
			<view class="my-topbar-box" :style="{'padding-top':statusBarHeight,'height':`calc(${85+outHeight}rpx + ${statusBarHeight})`}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//额外的高度
			outHeight: {
				type: Number,
				default: 0
			}
		},
		computed: {
			statusBarHeight() {
				return "var(--status-bar-height)"
			}
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.my-topbar {
		.my-topbar-content {
			background-color: $global-general;
			width: 100%;
			position: fixed;
			// z-index 不可以太高，容易遮挡住 loading
			z-index: 100;
			top: 0;
			.my-topbar-box {
				//overflow: hidden;
			}
		}
	}
	
</style>

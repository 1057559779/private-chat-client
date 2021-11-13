<template>
	<view class="title-bar">
		<view class="bar-left">
			<text class="bar-text">
				{{ title }}
			</text>
		</view>
		<view class="bar-right">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.title-bar {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		.bar-left {
			border-left: 8rpx solid #60baff;
			.bar-text {
				margin-left: 10rpx;
			}
		}
		.bar-right {
			color: gray;
		}
	}
</style>

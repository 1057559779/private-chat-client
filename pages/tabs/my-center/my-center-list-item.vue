<template>
	<view class="my-center-list-item" @click="clickItem">
		<view class="left">
			<view class="left-icon">
				<u-icon :name="icon" :color="iconColor"></u-icon>
			</view>
			<text>{{ title }}</text>
		</view>
		<view class="right">
			<text class="right-text">{{ itemDes }}</text>
			<view class="right-icon">
				<u-icon name="arrow-right" color="#b4b4b4"></u-icon>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 某一项的标题
			title: {
				type: String,
				default: ""
			},
			// icon 图标
			icon: {
				type: String,
				default: ""
			},
			iconColor: {
				type: String,
				default: ""
			},
			// 某一项的描述
			itemDes: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			clickItem() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-center-list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 25rpx;
		font-size: 32rpx;
		border-bottom: 1px solid $global-general;
		.left {
			display: flex;
			.left-icon {
				margin-right: 20rpx;
			}
		}
		.right {
			display: flex;
			.right-text {
				color: #b1b1b1;
			}
			.right-icon {
				padding-left: 15rpx;
			}
		}
	}
</style>

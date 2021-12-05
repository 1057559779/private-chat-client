<template>
	<view class="group-item" v-if="item" @click="click">
		<u-avatar :size="100" class="item-avatar" :src="item.targetGroupInfo.avatar" mode="square"></u-avatar>
		<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
		<view class="title-wrap">
			<view class="item-top">
				<text class="nick-name">{{ item.targetGroupInfo.name }}</text>
				<text class="last-time">{{ new Date(item.updateTime).format("MM/dd") }}</text>
			</view>
			<view class="item-bottom">
				<view class="message">
					{{item.message}}
				</view>
				<view class="no-read">
					{{item.noRead>99?"99+":item.noRead}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "group-item",
		props: {
			item: {
				type: Object,
				default: ()=>{}
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped lang="scss">
	.group-item {
		display: flex;
		padding: 20rpx;
		&:active {
			background-color: #dee2e2;
		}
		.item-avatar {
			width: 100rpx;
			flex: 0 0 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
		
		.title-wrap {
			width: 100%;
			.item-top {
				display: flex;
				justify-content: space-between;
				.nick-name {
					font-size: 32rpx;
				}
			}
			.item-bottom {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				.message {
					width: 550rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.no-read {
					display: flex;
					height: 32rpx;
					min-width: 32rpx;
					font-size: 22rpx;
					font-weight: bold;
					justify-content: center;
					color: #ffffff;
					align-items: center;
					padding: 2rpx 4rpx;
					border-radius: 100rpx;
					background-color: #f56c6c;
				}
			}
		}
		
	}


</style>

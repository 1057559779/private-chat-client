<template>
	<view class="user-item" v-if="item" @click="click">
		<u-avatar :size="100" class="item-avatar" :src="item.targetUserInfo.avatar" mode="circle"></u-avatar>
		<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
		<view class="title-wrap">
			<view class="item-top">
				<text class="nick-name">{{ item.targetUserInfo.showName }}</text>
				<text class="last-time">{{ new Date(item.updateTime).format("hh:mm:ss") }}</text>
			</view>
			<view class="item-bottom">
				<view class="message">
					{{item.message}}
				</view>
				<view class="no-read" v-if="item.noRead > 0">
					{{item.noRead>99?"99+":item.noRead}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user-item",
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
	.user-item {
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
				.last-time {
					color: #999999;
				}
			}
			.item-bottom {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				.message {
					color: #999999;
					width: 550rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.no-read {
					@include no-read-css;
				}
			}
		}
		
	}


</style>

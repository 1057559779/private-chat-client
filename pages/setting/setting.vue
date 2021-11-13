<template>
	<view class="setting-page">
		<view class="setting-list">
			<view class="setting-item">
				<view class="setting-item-box">
					<view>账号</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>新消息通知</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>隐私</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>通用</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>



<style lang="scss">
	page {
		background-color: #ffffff;
	}	
</style>
<style scoped lang="scss">
	.setting-page {
		.setting-list {
			padding: 0 35rpx;
			.setting-item {
				padding: 30rpx 20rpx;
				border-bottom: 1px solid #f5f5f5;
				.setting-item-box {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>

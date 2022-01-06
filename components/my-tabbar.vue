<!-- 我自定义的tabbar -->
<template>
	<!-- 使用该组件之前，必须 在 onload组件中 隐藏原生tabbar -->
	<view>
		<view class="custom-tabbar-box">
			<view class="custom-tabbar-fixed">
				<view class="tabbar-list">
					<view class="tabbar-item" v-for="(item,index) in getTabbarList" :key="index" @click="runPage(index)">
						
						<view class="image-box">
							<!-- 未阅读数量 -->
							<view class="hint-count" v-if="item.count && item.count > 0">
								{{item.count>99?"99+":item.count}}
							</view>
							<image v-if="current === index" class="image-area" :src="item.selectedIconPath"></image>
							<image v-else class="image-area" :src="item.iconPath"></image>
						</view>
					
						<view class="title">
							{{ item.title }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapGetters({
				getTabbarList: "support/GET_TABBAR_LIST"
			})
		},
		methods: {
			runPage(index) {
				this.$emit('click',index)
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.custom-tabbar-box {
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));	
		.custom-tabbar-fixed {
			//box-shadow:4px 4px 8px #999999;
			background-color: $global-general;
			width: 100%;
			position: fixed;
			bottom: 0;
			padding-bottom: 0;  
			padding-bottom: constant(safe-area-inset-bottom);  
			padding-bottom: env(safe-area-inset-bottom);  
			height: 100rpx;
			height: calc(100rpx + constant(safe-area-inset-bottom));
			height: calc(100rpx + env(safe-area-inset-bottom));	
			.tabbar-list {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				.tabbar-item {
				
					padding-top: 18rpx;
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					
					.image-box {
						position: relative;
						.hint-count {
							position: absolute;
							top: 0;
							right: 0;
							transform: translate(100%,-50%);
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
					.image-area {
						width: 44rpx;
						height: 44rpx;
					}
					.title {
						padding-top: 5rpx;
						font-size: 22rpx;
					}
				}
			}
		}
	}
</style>

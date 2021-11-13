<!-- 我自定义的tabbar -->
<template>
	<!-- 使用该组件之前，必须 在 onload组件中 隐藏原生tabbar -->
	<view>
		<view class="custom-tabbar-box">
			<view class="custom-tabbar-fixed">
				<view class="tabbar-list">
					<view class="tabbar-item" v-for="(item,index) in tabList" :key="index" @click="runPage(index)">
						<image v-if="current === index" class="image-area" :src="item.selectedIconPath"></image>
						<image v-else class="image-area" :src="item.iconPath"></image>
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
	import tabbarList from "@/config/base/tabbar-list.js"
	
	export default {
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: tabbarList,
			}
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
			box-shadow:4px 4px 8px #60baff;
			background-color: #ffffff;
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
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: center;
					justify-content: center;
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

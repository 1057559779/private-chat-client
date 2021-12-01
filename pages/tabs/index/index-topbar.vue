<!-- 首页-自定义topbar -->
<template>
	<view>
		<MyTopBar>
			<view class="index-topbar">
				<view class="avatar"></view>
				
				<view class="center">
					首页
				</view>
				<view class="right">
					<!-- 空标签占位 -->
					<view class="just-empty"></view>
				</view>
			</view>
		</MyTopBar>
	</view>
</template>

<script>
	import MyTopBar from "@/components/my-topbar.vue"
	export default {
		components: {
			MyTopBar,
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
		
	}
</script>

<style scoped lang="scss">
	.index-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 35rpx;
		height: 100%;
		background-color: #ffffff;
		vertical-align: middle;
		.right {
			.just-empty {
				width: 55rpx;
				height: 55rpx;
			}
		}
		.center {
			flex: 1;
			padding: 0 20rpx;
			text-align: center;
		}
		.avatar {
			width: 55rpx;
			height: 55rpx;
			border-radius: 100%;
			background-color: #60baff;
		}
	}
</style>

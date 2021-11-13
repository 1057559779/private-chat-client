<!-- 个人信息 -->
<template>
	<view class="self-info-page">
		<view class="self-info-content">
			
			<view class="self-infot-item">
				<view class="title">头像</view>
				<view class="content">
					<view class="avatar">
						
					</view>
				</view>
			</view>
			
			<view class="self-infot-item">
				<view class="title">姓名</view>
				<view class="content">张三</view>
			</view>
			
			<view class="self-infot-item">
				<view class="title">性别</view>
				<view class="content">男</view>
			</view>
			
			<view class="self-infot-item">
				<view class="title">账号</view>
				<view class="content">sanzhang</view>
			</view>
			
			<view class="self-infot-item">
				<view class="title">手机</view>
				<view class="content">18888888888</view>
			</view>
			
			<view class="self-infot-item">
				<view class="title">部门</view>
				<view class="content">信息技术部</view>
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

<style>
	page {
		background-color: #ffffff;
	}
</style>
<style scoped lang="scss">
	.self-info-page {
		background-color: #ffffff;
		.self-info-content {
			padding: 40rpx 40rpx 0;
			.self-infot-item {
				padding: 30rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #f8f8f8;
				align-items: center;
				.title {
					color: #333333;
				}
				.content {
					color: #999999;
					font-size: 22rpx;
					.avatar {
						border-radius: 50%;
						width: 130rpx;
						height: 130rpx;
						background-color: #60baff;
					}
				}
			}
		}
	}
</style>

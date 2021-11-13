<!-- 自行封装的 消息条 -->
<template>
	<view class="my-notice-bar">
		<view class="my-notice-bar-line">
			<view class="my-notice-icon">
				<image class="image-area" src="/static/index/index-bell.png"></image>
			</view>
			<view class="my-notice-bar-pathway">
				<view class="my-notice-bar-run">
					<text class="text-area">
						<slot></slot>
					</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "my-notice-bar",
		data() {
			return {
			};
		},

		//实例被挂载后调用
		mounted() {
		}

	}
</script>

<style lang="scss">
	.my-notice-bar {

		.my-notice-bar-line {
			display: flex;
			align-items: center;

			.my-notice-icon {
				font-size: 0;
				padding-right: 10rpx;

				.image-area {
					width: 35rpx;
					height: 35rpx;
				}
			}

			.my-notice-bar-pathway {
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;

				.my-notice-bar-run {
					white-space: nowrap;
					animation: u-loop-animation 10s linear infinite both;
					animation-duration: 15s;
					text-align: right;
					// 这一句很重要，为了能让滚动左右连接起来
					padding-left: 100%;
					// 这一句也很重要，本来 当前content width是基于 父框width的。现在是本身的100%
					display: inline-block;
				}
			}

		}
	}


	@keyframes u-loop-animation {
		0% {
			transform: translate3d(0, 0, 0);
		}

		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>

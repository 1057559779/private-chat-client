<template>
	<view class="content">
		<view>
			<IndexTopBar></IndexTopBar>
		</view>
		<scroll-view :scroll-y="true" @scrolltolower="reachBottom" class="index-box">
			<div class="demo-class">我是首页</div>
		</scroll-view>
	</view>
</template>

<script>
	//封装页面	
	import IndexTopBar from "@/pages/tabs/index/index-topbar.vue";
	import {mapGetters} from "vuex";
	export default {
		components: {
			IndexTopBar,
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			})
		},
		data() {
			return {

			}
		},
		methods: {
			reachBottom() {
				console.log("hi")
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		height: 100%;

		.index-box {
			//以首页举例，底部tabbar 的宽度 single已经帮咱算好了， 咱只需要算topbar的距离
			height: calc(100% - 85rpx - var(--status-bar-height));
			.demo-class {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 38rpx;
				color: #999999;
			}
			.notice-area {
				background-color: #f2f8fe;
				color: #6f8aa9;
				margin: 10rpx 35rpx;
				border-radius: 15rpx;
				padding: 10rpx 20rpx;
			}

			.dynamic {
				color: #ffffff;
				margin: 35rpx;

				.dynamic-box {
					padding: 20rpx;
					background-color: #60baff;
					border-radius: 25rpx;
					height: 150rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="content">
		<view>
			<IndexTopBar></IndexTopBar>
		</view>
		<scroll-view :scroll-y="true" @scrolltolower="reachBottom" class="index-box">
			<view class="lately-list">
					<u-swipe-action :show="item.show" :index="index" 
						v-for="(item, index) in latelyList" :key="item.id" 
						@click="click" @open="open"
						:options="options"
					>
						<view class="item">
							<u-avatar :size="100" class="item-avatar" :src="item.targetUserInfo.avatar" mode="square"></u-avatar>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<view class="item-top">
									<text class="nick-name">{{ item.targetUserInfo.showName }}</text>
									<text class="last-time">{{ new Date(item.updateTime).format("MM/dd") }}</text>
								</view>
								<view class="item-bottom">
									<view class="message">
										{{item.message}}{{item.message}}{{item.message}}
									</view>
									<view class="no-read">
										{{item.noRead>99?"99+":item.noRead}}
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//封装页面	
	import IndexTopBar from "@/pages/tabs/index/index-topbar.vue";
	import {mapGetters} from "vuex";
	import latelyApi from "@/api/chat/lately.js"
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
				latelyList: [],
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		methods: {
			reachBottom() {
				console.log("hi")
				
			},
			async getLatelyList() {
				let res = await latelyApi.getLately()
				res.forEach(e => e.show = false)
				this.latelyList = res
			},
			click(row, action) {
				console.log(action)
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.latelyList[index].show = true;
				this.latelyList.map((val, idx) => {
					if(index != idx) this.latelyList[idx].show = false;
				})
			}
		},
		mounted() {
			this.getLatelyList()
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
		}
	}
	.lately-list {
			.item {
				display: flex;
				padding: 20rpx;
				&:active {
					background-color: #dee2e2;
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
							font-size: 22rpx;
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
			
			.item-avatar {
				width: 100rpx;
				flex: 0 0 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border-radius: 12rpx;
			}
			
			.title {
				text-align: left;
				font-size: 28rpx;
				color: $u-content-color;
			}
	}
</style>

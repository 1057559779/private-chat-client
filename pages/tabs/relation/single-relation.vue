<template>
	<scroll-view scroll-y class="single-relation">
		<view class="new-request">
			<view class="request-item">
				<view class="req-title">好友请求</view>
				<view class="req-count" v-if="getRelationReqCount > 0">
					{{getRelationReqCount>99?"99+":getRelationReqCount}}
				</view>
			</view>
		</view>
		<view class="relation-list">
			<view class="relation-item" v-for="(item,index) in relationList" :key="index" @click="goDetail(item)">
				<u-avatar :size="100" class="item-avatar" :src="item.targetUserInfo.avatar" mode="square"></u-avatar>
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<view class="item-top">
						<text class="nick-name">{{ item.targetUserInfo.showName }}</text>
					</view>
					<view class="item-bottom">
						<view class="interview">
							{{item.targetUserInfo.selfComment}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from "vuex"
	import relationApi from "@/api/relation/single-relation.js"
	export default {
		computed:{
			...mapState({
			    relationList: (state) => state.relation.relationList,
			}),
			...mapGetters({
				getRelationReqCount: "support/getRelationReqCount",
			})
		},
		data() {
			return {
				
			}
		},
		methods: {
			goDetail(item) {
				let id = item.targetId
				uni.navigateTo({
					url: `/pages/user-detail/user-detail?userId=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.single-relation {
		height: 100%;
		.new-request {
			.request-item {
				padding: 25rpx;
				background-color: #ffffff;
				display: flex;
				justify-content: space-between;
				.req-title {
					
				}
				.req-count {
					@include no-read-css;
				}
			}
			padding-bottom: 20rpx;
			background-color: #edf2f1;
		}
		.relation-list {
			.relation-item {
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
						.interview {
							color: #999999;
							width: 550rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					
					}
				}	
			}
		}
	}
</style>

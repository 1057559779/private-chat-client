<template>
	<view class="content">
		<view>
			<RelationTopbar></RelationTopbar>
		</view>
		<view class="relation-box">
			<view class="tabs-box">
				<u-tabs-swiper ref="uTabs" :list="list" 
				:current="current" @change="tabsChange" :is-scroll="false"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<SingleRelation></SingleRelation>
				</swiper-item>
				<swiper-item class="swiper-item">
					<GroupRelation></GroupRelation>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import RelationTopbar from "./relation-topbar.vue"
	import SingleRelation from "./single-relation.vue"
	import GroupRelation from "./group-relation.vue"
	export default {
		components: {
			RelationTopbar,
			SingleRelation,
			GroupRelation
		},
		data() {
			return {
				list: [
					{
						name: '联系人'
					},
					{
						name: '群聊'
					},
				],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		height: 100%;

		.relation-box {
			display: flex;
			flex-direction: column;
			//以首页举例，底部tabbar 的宽度 single已经帮咱算好了， 咱只需要算topbar的距离
			height: calc(100% - 85rpx - var(--status-bar-height));
			.swiper-box {
				flex: 1;
				min-height: 0;
			}
		}
	}
</style>

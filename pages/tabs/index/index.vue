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
						:options="options">
						<UserItem @click="openChatRoom(item)" :item="item" v-if="item.type === 1"></UserItem>
						<GroupItem @click="openChatRoom(item)" :item="item" v-if="item.type === 2"></GroupItem>
					</u-swipe-action>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//封装页面	
	import IndexTopBar from "@/pages/tabs/index/index-topbar.vue";
	import {mapGetters} from "vuex";
	import latelyApi from "@/api/chat/lately.js";
	import UserItem from "./user-item.vue"
	import GroupItem from "./group-item.vue"
	export default {
		components: {
			IndexTopBar,
			UserItem,
			GroupItem
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
			},
			//打开聊天室
			openChatRoom(item) {
				let targetId = item.targetId;
				let type = item.type
				if(type === 1) {
					uni.navigateTo({
						url: `/pages/chat-room/single-room?target_id=${targetId}`
					})
				}else if(type === 2) {
					uni.navigateTo({
						url: `/pages/chat-room/group-room?target_id=${targetId}`
					})
				}
				
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
			
			.title {
				text-align: left;
				font-size: 28rpx;
				color: $u-content-color;
			}
	}
</style>

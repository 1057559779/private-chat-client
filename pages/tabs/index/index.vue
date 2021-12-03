<template>
	<view class="content">
		<view>
			<IndexTopBar></IndexTopBar>
		</view>
		<MyPullRefresh @refresh="isOk">
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
		</MyPullRefresh>
	</view>
</template>

<script>
	//封装页面	
	import IndexTopBar from "@/pages/tabs/index/index-topbar.vue";
	import MyPullRefresh from "@/components/my-pull-refresh.vue";
	import {mapGetters} from "vuex";
	import latelyApi from "@/api/chat/lately.js";
	import UserItem from "./user-item.vue"
	import GroupItem from "./group-item.vue"
	export default {
		components: {
			IndexTopBar,
			UserItem,
			GroupItem,
			MyPullRefresh
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
			async isOk(call) {
				await this.getLatelyList()
				//call 一下，释放下拉加载
				call()
			},
			//打开聊天室
			openChatRoom(item) {
				
				let type = item.type
				//类型1 点对点
				if(type === 1) {
					//为了节省传输大小，selfComment不传递过去了
					delete item.targetUserInfo['selfComment']
					let targetInfo = JSON.stringify(item.targetUserInfo)
					uni.navigateTo({
						url: `/pages/chat-room/single-room?target_info=${targetInfo}`
					})
				}
				//类型2 多对多
				else if(type === 2) {
					let targetInfo = JSON.stringify(item.targetGroupInfo)
					uni.navigateTo({
						url: `/pages/chat-room/group-room?target_info=${targetInfo}`
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

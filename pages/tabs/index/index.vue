<template>
	<view class="content">
		<view>
			<IndexTopBar></IndexTopBar>
		</view>
		<scroll-view :scroll-y="true" @scrolltolower="reachBottom" class="index-box">
			<view class="lately-list">
					<u-swipe-action :show="item.show" :index="item.targetId" 
						v-for="(item, index) in latelyList" :key="item.targetId" 
						@click="click" @open="(index)=>open(index,item.targetId)"
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
	import IndexTopBar from "./index-topbar.vue";
	import {mapMutations,mapGetters,mapState} from "vuex"
	import latelyApi from "@/api/chat/lately.js";
	import UserItem from "./user-item.vue";
	import GroupItem from "./group-item.vue";
	export default {
		components: {
			IndexTopBar,
			UserItem,
			GroupItem,
		},
		computed: {
			...mapState({
			    latelyList: (state) => state.chat.latelyList,
				onShowFlag: (state) => state.support.onShowFlag
			}),
			...mapGetters({
				userInfo: "user/getUserInfo",
			})
		},
		data() {
			return {
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
			...mapMutations({
			    setRoomFlag(commit, flag) {
			      commit("chat/SET_ROOM_FLAG", flag)
			    },
				changeNoReadCount(commit, value) {
			      commit("support/CHANGE_TABBAR_MESSAGE_COUNT",value)
			    },
				setLatelyList(commit, list) {
			      commit("chat/SET_LATELY_LIST", list)
			    },
			}),
			//当页面拉动到底部到时候，回调
			reachBottom() {
				console.log("hi")
			},
			//并不是item的点击，而是action
			click(row, action) {
				console.log(action)
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index,id) {
				let indexReal = this.latelyList.findIndex(e => e.targetId === id)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.latelyList[indexReal].show = true
			
				this.latelyList.map((val, idx) => {
					if(indexReal != idx) this.latelyList[idx].show = false;
				})
			},
			//打开聊天室
			async openChatRoom(item) {
				
				let type = item.type
				//类型1 点对点
				if(type === 1) {
					
					let param = {
						type: type,
						targetId: item.targetUserInfo['id']
					}
					
					//根据item的未读数量 减去相应tabbar的未读数量
					this.changeNoReadCount({
						key: "IndexPage",
						count: -item.noRead
					})
					//这个接口中，同时会清空noRead  库中
					await latelyApi.setRoomFlag(param)
					//设置flag同时 noRead清空  静态的
					this.setRoomFlag(param)
					
					let userId = item.targetUserInfo.id
					
					uni.navigateTo({
						url: `/pages/chat-room/single-room?userId=${userId}`
					})
				}
				//类型2 多对多
				else if(type === 2) {
					let targetInfo = JSON.stringify(item.targetGroupInfo)
					uni.navigateTo({
						url: `/pages/chat-room/group-room?target_info=${targetInfo}`
					})
				}
			},
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

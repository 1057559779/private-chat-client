<template>
	<!-- 
		@touchmove.stop.prevent 让根节点不要再拖动
		onKeyboardHeightChange 软键盘出现监听事件
		transform 消息内容和输入框根据软键盘出现的高度上移
		adjust-position=false 输入框设置这个属性，在触发焦点的时候不上移窗体，因为这种方式上移窗体会导致topbar也上移
	 -->
	<view class="single-room-page" @touchmove.stop.prevent>
		<SingleRoomTopbar :target-info="targetInfo"></SingleRoomTopbar>
		<!-- 
			当软键盘上升的时候 取消安全域 
		-->
		<view class="chat-box" 
			:class="{'safe':!height}" 
			:style="{'height': elasticHeight}">
			<scroll-view 
				:scroll-with-animation="true"
				:scroll-y="true"
				:scroll-top="scrollTop"
				@scroll="scroll"
				class="message-box">
				<!-- 必须要有 message-list这个class 因为我是用这个class来计算scroll-view的高度的-->
				<view id="messageList" class="message-list">
					<view class="message-item" :class="{'left':item.senderId !== userInfo.id }" v-for="(item,index) in messageList" :key="index">
						<view class="avatar">
							<u-avatar :size="55" class="avatar"
							 :src="targetInfo.avatar?targetInfo.avatar:''"></u-avatar>
						</view>
						<view class="message"  :class="{'left':item.senderId !== userInfo.id }">
							<view class="content" :class="{'left':item.senderId !== userInfo.id }">
								{{item.message}}
							</view>					
						</view>
					</view>
				</view>
				
			</scroll-view>
			<view class="bottom-box">
				<textarea placeholder="请输入" class="input-box"
				@focus="rearchDown" :adjust-position="false" auto-height />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import SingleRoomTopbar from "./topbar/single-room-topbar.vue";
	import messageApi from "@/api/chat/message.js";
	export default {
		components: {
			SingleRoomTopbar
		},
		data() {
			return {
				targetInfo: null, //聊天室目标对象
				height: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				messageList: []
			}
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			}),
			//弹性高度
			elasticHeight() {
				//85rpx 为topbar的高度
				//status-bar-height 是uniapp 内置css全局变量，代表状态栏高度
				//当软键盘升起当时候，高度适当缩小
				let height = `calc(100vh - 85rpx - ${this.height}px  - var(--status-bar-height))`
				return height;
			},
		},
		async onLoad(param) {
			let targetInfo = param.target_info
			this.targetInfo = JSON.parse(targetInfo)
			//软键盘升起降落的时候，软键盘高度监控
			uni.onKeyboardHeightChange(res =>{
			    //获取键盘高度
				this.height = res.height
			})
			//获得最新的十条记录 后续新记录则unshift到头部
			await this.getMessageList()
		},
		methods: {
			scroll(e) {
			    this.old.scrollTop = e.detail.scrollTop
			},
			//到达scroll-view 最底端
			rearchDown() {
				setTimeout(()=>{
					this.scrollTop = this.old.scrollTop
					this.$nextTick(function(){
						 
						let info = uni.createSelectorQuery().select("#messageList");
						　　　  　info.boundingClientRect((data) => { //data - 各种参数
						　　　  　this.scrollTop = data.height
						}).exec()
					})
				},300)
			},
			//获得消息列表
			async getMessageList() {
				//获得目标人的id
				let param = {
					targetId: this.targetInfo.id
				}
				const res = await messageApi.getSingleMessage(param)
				this.messageList = res
			}
		}
	}
</script>

<style scoped lang="scss">

	.chat-box {
		//去掉topbar
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: height .2s;
		&.safe {
			background-color: $global-general;
			//底部安全局 padding
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.message-box {
			min-height: 0;
			background-color: $global-general;
			flex: 1;
			.message-list {
				padding: 0 20rpx;
				.message-item {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					flex-direction: row-reverse;
					&.left {
						flex-direction: row;
					}	
					.avatar {
						width: 55rpx;
						height: 55rpx;
					}
					.message {
						padding-left: 55rpx ;
						&.left {
							padding-left: 0;
							padding-right: 55rpx;
						}
						.content {
							background-color: #ffffff;
							background-color: $global-primary;
							color: #ffffff;
							padding: 18rpx;
							border-radius: 15rpx;
							margin-right: 10rpx;
							&.left {
								color: #000000;
								background-color: #ffffff;
								margin-right: 0;
								margin-left: 10rpx;
							}
						}
					}			
				}
			}
		}
		.bottom-box {
			padding: 15rpx;
			box-sizing: border-box;
			background-color: $global-general;
			.input-box {
				width: 100%;
				box-sizing: border-box;
				background-color: #ffffff;
				padding: 18rpx;
				border-radius: 32rpx;
			}	
		}
	}
</style>

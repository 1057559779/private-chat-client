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
							 :src="item.senderId !== userInfo.id?targetInfo.avatar:userInfo.avatar"></u-avatar>
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
				<textarea placeholder="请输入" v-model="param.message" class="input-box"
				@focus="rearchDown" :adjust-position="false" auto-height />
				<view class="send-btn" :class="{'disable': !param.message}" @click="sendMessage">
					发送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import SingleRoomTopbar from "./topbar/single-room-topbar.vue";
	import messageApi from "@/api/chat/message.js";
	import wsClient from "@/common/js/util/ws-client.js"
	
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
				param: {
					file: null ,
					message: "", //消息内容
					msgType: 0, //消息类型
					senderId: null, //发送者
					targetId: null, //目标id
					targetType: 1 //目前为点对点页面，强制定为1
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
			//消息参数
			messageParam() {
				let param = this.param
				param.senderId = this.userInfo.id
				param.targetId = this.targetInfo.id
				//封装消息体
				let messageObj = {
					statusCode: 200,
					chatMessage: param
				}
				return messageObj
			},
		},
		async onLoad(param) {
			let targetInfo = param.target_info
			this.targetInfo = JSON.parse(targetInfo)
			this.receiveMessage()
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
			},
			//参数初始化
			dataClear() {
				this.param = this.$opation.data().param
			},
			//发送消息
			sendMessage() {
				if(this.param.message) {
					//只有文字会通过这个发送出去 文字中包含表情
					this.param.msgType = 1
					let str = JSON.stringify(this.messageParam)
					wsClient.send(str)
				}
				
			},
			//接受消息
			receiveMessage() {
				wsClient.receiveMessage((res)=>{
					let obj = JSON.parse(res)
					let message = obj.chatMessage
					//只有是200消息体 且发送者与接受者对应的上才允许接受消息
					if(obj.statusCode === 200 && (
						this.targetInfo.id === message.senderId && this.userInfo.id === message.targetId
						||
						this.userInfo.id === message.senderId && this.targetInfo.id === message.targetId
					)) {
						this.messageList.push(message)
					}
				})
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
				padding: 20rpx;
				.message-item {
					display: flex;
					align-items: center;
					flex-direction: row-reverse;
					margin-bottom: 25rpx;
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
			display: flex;
			padding: 15rpx;
			box-sizing: border-box;
			background-color: $global-general;
			.input-box {
				width: 100%;
				box-sizing: border-box;
				background-color: #ffffff;
				padding: 18rpx;
				border-top-left-radius: 32rpx;
				border-bottom-left-radius: 32rpx;
				margin-right: 20rpx;
			}	
			.send-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
				width: 125rpx;
				background-color: $global-primary;
				border-top-right-radius: 32rpx;
				border-bottom-right-radius: 32rpx;
				transition: background-color .2s;
				&.disable {
					background-color: lighten($global-primary, 40%);
				}
			}
		}
	}
</style>

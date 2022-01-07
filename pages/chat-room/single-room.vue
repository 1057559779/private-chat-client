<template>
	<!-- 
		@touchmove.stop.prevent 让根节点不要再拖动
		onKeyboardHeightChange 软键盘出现监听事件
		transform 消息内容和输入框根据软键盘出现的高度上移
		adjust-position=false 输入框设置这个属性，在触发焦点的时候不上移窗体，因为这种方式上移窗体会导致topbar也上移
	 -->
	<view class="single-room-page" @touchmove.stop.prevent>
		<SingleRoomTopbar @back="back" :target-info="targetInfo"></SingleRoomTopbar>
		<!-- 
			当软键盘上升的时候 取消安全域 
		-->
		<view class="chat-box" 
			:class="{'safe':!height}" 
			:style="{'height': elasticHeight}">
			<scroll-view 
				:scroll-with-animation="true"
				:scroll-y="true"
				@scrolltoupper="upLoadMessage"
				:scroll-top="scrollTop"
				@scroll="scroll"
				class="message-box"
				id="messageBox">
				<!-- 必须要有 message-list这个class 因为我是用这个class来计算scroll-view的高度的-->
				<view id="messageList" class="message-list">
					<view class="message-loading" v-if="messageLoading">加载...</view>
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
				<!-- 使用 @touchend.prevent而不是@click 是为了点击发送后不让焦点消失-->
				<view class="send-btn" @touchend.prevent="sendMessage" :class="{'disable': !param.message}">
					发送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapGetters,mapState} from "vuex";
	import SingleRoomTopbar from "./topbar/single-room-topbar.vue";
	import messageApi from "@/api/chat/message.js";
	import latelyApi from "@/api/chat/lately.js";
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
					targetType: 1, //目前为点对点页面，强制定为1
					createdTime: null
				},
				page: {
					current: 1,
					size: 20
				},
				messageLoading: false,
				messageList: [],
				isBottom: false
			}
		},
		computed: {
			...mapState({
			    latelyList: (state) => state.chat.latelyList,
			}),
			...mapGetters({
				userInfo: "user/getUserInfo",
				roomFlag: "chat/getRoomFlag",
				nowMessage: "chat/getNowMessage"
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
				//param.senderId = this.userInfo.id
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
			//软键盘升起降落的时候，软键盘高度监控
			uni.onKeyboardHeightChange(res =>{
			    //获取键盘高度
				this.height = res.height
			})
			
			let targetInfo = param.target_info
			this.targetInfo = JSON.parse(targetInfo)
			
		},
		async onShow() {
			this.messageList = []
			
			//获得最新的十条记录 后续新记录则unshift到头部
			await this.getMessageList()
			
			this.rearchDown()
		},
		methods: {
			...mapMutations({
			    removeRoomFlagVX(commit) {
			       commit("chat/REMOVE_ROOM_FLAG")
			    },
			}),
			scroll(e) {
				let detail = e.detail
			    this.old.scrollTop = detail.scrollTop
				
				//判断是否已经到达底部
				this.getBoxDom(box => {
					this.getMessageDom(list => {
						if(box.height + detail.scrollTop === list.height) {
							this.isBottom = true
						}else {
							this.isBottom = false
						}
					})
				})
			},
			getBoxDom(call) {
				this.$nextTick(function(){
					const query = uni.createSelectorQuery().in(this);
					let info = query.select("#messageBox");
					　　　  　info.boundingClientRect((data) => { //data - 各种参数
							 call(data)
					}).exec()
				})
			},
			//获得消息列表的高度
			getMessageDom(call) {
				this.$nextTick(function(){
					let info = uni.createSelectorQuery().select("#messageList");
					　　　  　info.boundingClientRect((data) => { //data - 各种参数
							 call(data)
					}).exec()
				})
			},
			//到达scroll-view 最底端
			rearchDown() {
				setTimeout(()=>{
					this.scrollTop = this.old.scrollTop
					this.$nextTick(function(){
						 this.getMessageDom(data =>{
							 this.scrollTop = data.height
						 })
					})
				},300)
			},
			//获得消息列表
			async getMessageList() {
				this.messageLoading = true
				//获得目标人的id
				let param = {
					targetId: this.targetInfo.id,
					current: this.page.current,
					size: 15
				}
				const res = await messageApi.getSingleMessage(param)
				this.messageList.unshift(...res) 
				this.messageLoading = false
			},
			upLoadMessage() {
				this.page.current+=1
				this.getMessageList()
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
					//输入框中的内容清空
					this.param.message = ""
					//输完一个消息，到达底部
					this.rearchDown()
				}
			},
			async removeRoomFlag() {
				let param = {
					type: 1,
					targetId: this.targetInfo.id
				}
				await latelyApi.removeRoomFlag(param)
			},
			back() {
				uni.navigateBack()
				//页面退出的时候，删除room标识，
				this.removeRoomFlag()
				//删除vuex中的标识
				this.removeRoomFlagVX()
			}
		},
		watch: {
			//监听新消息
			nowMessage(res){
				let obj = res
				let message = obj.chatMessage
				//只有是200消息体 且发送者与接受者对应的上才允许接受消息
				if(obj.statusCode === 200 && (
					this.targetInfo.id === message.senderId && this.userInfo.id === message.targetId
					||
					this.userInfo.id === message.senderId && this.targetInfo.id === message.targetId
				)) {
					this.messageList.push(message)
					//消息是自己发到，或者已经处于底端了，新发到消息会到达底端
					if(message.senderId === this.userInfo.id || this.isBottom) {
						this.rearchDown()
					} 
					
				}
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
				.message-loading {
					text-align: center;
					color: #999999;
				}
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

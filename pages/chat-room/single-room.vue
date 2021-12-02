<template>
	<!-- 
		@touchmove.stop.prevent 让根节点不要再拖动
		onKeyboardHeightChange 软键盘出现监听事件
		transform 消息内容和输入框根据软键盘出现的高度上移
		adjust-position=false 输入框设置这个属性，在触发焦点的时候不上移窗体，因为这种方式上移窗体会导致topbar也上移
	 -->
	<view class="single-room-page" @touchmove.stop.prevent>
		<SingleRoomTopbar></SingleRoomTopbar>
		<!-- 
			当软键盘上升的时候 取消安全域 
		-->
		<view class="chat-box" 
			:class="{'safe':!height}" 
			:style="{'height': elasticHeight}">
			<scroll-view 
				:scroll-with-animation="true"
				:scroll-y="true" class="message-box">
				<view class="message-item">{{targetInfo}}</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item"></view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">hi</view>
				<view class="message-item">bottom</view>
			</scroll-view>
			<view class="input-box">
				<textarea placeholder="请输入" :adjust-position="false" auto-height />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import SingleRoomTopbar from "./topbar/single-room-topbar.vue"
	export default {
		components: {
			SingleRoomTopbar
		},
		data() {
			return {
				targetInfo: null, //聊天室目标对象
				height: 0,
				scrollTop: 0,
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
			}
		},
		onLoad(param) {
			let targetInfo = param.target_info
			this.targetInfo = targetInfo
			//键盘高度监控
			uni.onKeyboardHeightChange(res =>{
			    //获取键盘高度
				this.height = res.height
			})
		},
		methods: {
			
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
			//底部安全局 padding
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.message-box {
			min-height: 0;
			background-color: #DCDFE6;
			flex: 1;
		}
		.input-box {
			background-color: #F1F1F1;
				
		}
	}
</style>

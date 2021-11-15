<template>
	<view>
		webscoket 测试
		<button @click="sendMsg">send</button>
	</view>
</template>

<script>
	import wsServer from "@/config/ws/index.js"
	
	export default {
		data() {
			return {

			}
		},
		methods: {
			sendMsg() {
			
				wsServer.send("firechildren")
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scope lang="scss">
	.date-choice {
		display: flex;
		.date-pathway {
			
			flex: 1;
			overflow: auto;
			white-space: nowrap;
			background-color: #ffffff;
			.pathway-item {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx;
				width: 150rpx;
				height: 100%;
				display: inline-flex;
				
			}
		}
		.date-btn {
			margin-left: 10rpx;
			width: 150rpx;
			height: 150rpx;
			background-color: #ffffff;
		}
	}
</style>

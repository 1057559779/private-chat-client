<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//发送请求
			async addRequest(userId) {
				this.btnLoading = true
				
				//用于http请求的参数
				let param = {
					targetId: userId,
					status: 0
				}
			
				//入库
				try {
					const returnId = await relationReqApi.addSingleRelationReq(param)
					
					//用户ws 201状态传输的参数
					param.id = returnId
					
					let messageObj = {
						statusCode: 201,
						singleRelationReq: param
					}
					//对象json字符串化
					let str = JSON.stringify(messageObj)
					
					//实时通讯通知目标用户
					wsClient.send(str)
					
					this.btnLoading = false
				}catch {
					this.btnLoading = false
				}	
			},
		}
	}
</script>

<style>

</style>

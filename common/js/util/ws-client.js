import ToastUtil from "@/common/js/util/toast-util.js"
import configInfo from "@/config/base/config-info.js"
import store from "@/store/index.js"
/**
 * webscoket 客户端连接
 */
const wsClient = {
	
	//开启连接	
	open(callback) {		
		let token = store.getters['user/getToken']
		if(token) {
			console.log("正在连接")
			ToastUtil.showLoading("正在连接")
			//存在token才让他连接
			uni.connectSocket({
			    url: `${configInfo.wsUrl}/${token}`,
			    complete(res) {
					wsClient.onOpen()
					wsClient.onError()
					//调用关闭监听事件
					wsClient.onClose()
					
					//当连接创建时，加载一些数据
					callback()
			    }
			});
		}else {
			//退出到登录页面
			uni.reLaunch({
				url: "/pages/login/login"
			})
		}
		
	},
	//接受消息
	receiveMessage(callback) {
		uni.onSocketMessage((res)=>{
			callback(res.data)
		});
	},
	send(msg) {
		uni.sendSocketMessage({
		      data: msg
		});
	},
	//关闭连接 其实不用管他，反正这次连接是全局的 最多在推出的时候close
	close() {
		uni.closeSocket();
	},
	//当关闭当时候
	onClose(){
		uni.onSocketClose( (res)=> {
			console.log("WebSocket 已关闭!")
			//ToastUtil.show("WebSocket 已关闭!")
		});
	},
	onOpen() {
		uni.onSocketOpen(function (res) {
		  ToastUtil.hideLoading()
		  ToastUtil.show("连接成功")
		});
	},
	onError() {
		uni.onSocketError(function (res) {
			ToastUtil.hideLoading()
			ToastUtil.show("WebSocket连接打开失败，请检查！")
		});
	}
	
}


export default wsClient;
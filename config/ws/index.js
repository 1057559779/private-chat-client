import ToastUtil from "@/common/js/util/toast-util.js"
import configInfo from "@/config/base/config-info.js"
import store from "@/store/index.js"
const wsServer = {
	

	//开启连接	
	open() {		
		let token = store.getters['user/getToken']
		uni.connectSocket({
		    url: `${configInfo.wsUrl}/${token}`,
		    complete(res) {
		    	
				wsServer.onOpen()
				wsServer.onError()
		    }
		});
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
			//ToastUtil.show("WebSocket 已关闭!")
		});
	},
	onOpen() {
		uni.onSocketOpen(function (res) {
		  ToastUtil.show("连接成功")
		  //调用关闭监听事件
		  wsServer.onClose()
		});
	},
	onError() {
		uni.onSocketError(function (res) {
			ToastUtil.show("WebSocket连接打开失败，请检查！")
		});
	}
	
}


export default wsServer;
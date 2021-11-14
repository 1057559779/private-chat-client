import ToastUtil from "@/common/js/util/toast-util.js"

const wsServer = {
	

	//开启连接	
	open() {
		uni.connectSocket({
		    url: 'ws://127.0.0.1:9090/websocket/forGroup',
		    success(res) {
		    	ToastUtil.show("连接成功")
				//调用关闭监听事件
				wsServer.onClose()
		    }
		});
	},
	//接受消息
	receiveMessage(callback) {
		uni.onSocketMessage((res)=>{
			callback(res)
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
		  console.log('WebSocket 已关闭！');
		});
	}
	
}


export default wsServer;
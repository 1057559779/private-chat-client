// 消息推送配置
const messagePush = ()=> {
	//获得设备信息
	const info = plus.push.getClientInfo();
	console.log( JSON.stringify( info ) );
			
	//下述api 必须要使用 打包出的apk 或者 自定义基座才可以运行
	plus.push.addEventListener("click", function(msg) {  
		//该点击事件 点击弹出来的手机消息框 进行的事件
		console.log("click:"+JSON.stringify(msg));  
		console.log(msg.payload);  
		console.log(JSON.stringify(msg));  
		//这里可以写跳转业务代码
	}, false);  
	// 监听在线消息事件    
	plus.push.addEventListener("receive", function(msg) {  
					// plus.ui.alert(2);  
						//这里可以写跳转业务代码
		console.log("recevice:"+JSON.stringify(msg))  
	}, false); 
}
export default messagePush;
	
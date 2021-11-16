
/**
 * 一些基础信息的配置
 */
const configInfo = {
	//基础url
	//#ifdef APP-PLUS
		//app端绝对不可以是localhost或者127.0.0.1
		baseUrl: 'http://192.168.137.97:9090',
	//#endif
	//#ifdef H5
		baseUrl: "/api",
	//#endif
	
	//websocket的url
	wsUrl: "ws://192.168.137.97:9090/websocket/forGroup",
	
	//需要token的接口前缀
	authorityPrefix: "/res/",
	
	
	//是否打印日志
	openLog: false
}


export default configInfo;
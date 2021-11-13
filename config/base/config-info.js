


/**
 * 一些基础信息的配置
 */
const configInfo = {
	//基础url
	//#ifdef APP-PLUS
		//app端绝对不可以是localhost或者127.0.0.1
		baseUrl: 'http://192.168.0.103:9090',
	//#endif
	//#ifdef H5
		baseUrl: "/api",
	//#endif
	

	
	//http 请求不需要请求头的路径  一个是普通登录，一个是企业微信掌上长龙自动登录
	anonymityUrl: [`/author/login`],
	
	
	//不需要showLoading的路径
	notshowLoadingUrl:['/webapi/AccountExt/v1/KeepOnline'],
	
	//是否打印日志
	openLog: false
}


export default configInfo;
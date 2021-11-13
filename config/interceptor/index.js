import routerInterceptor from "@/config/interceptor/router-interceptor.js"
/**
 * 拦截器函数集合
 */
const interceptorCollection = ()=>{
	
	//路由拦截器
	routerInterceptor();
	

}

export default interceptorCollection
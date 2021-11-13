import store from "@/store/index.js";
import configInfo from "@/config/base/config-info.js"
/**
 * 路由拦截 
 * 拦截navigateTo以及switchTab这两个函数  
 * 所以今后路由跳转只能用 navigateTo和switchTab 不然拦截不到
 */
const routerInterceptor = ()=>{
	
	uni.addInterceptor('navigateTo', {
		invoke(params) {
			const url = params.url
			urlRedirect(url)
		}
	})

}

/**
 * url 拿到以后可以做白名单
 * white-list.indexOf(url)
 */
const urlRedirect =(url)=>{
	const flag = store.getters['user/isLoginFlagValid']

	//如果有登录标识 或者该url是白名单中的url
	if(!flag){
		//必须延时开来，不然就是不执行跳转
		setTimeout(()=>{
			uni.reLaunch({
				url: "/pages/login/login",
				complete: () => {
					//如果用success 热刷新的时候会导致失败，很奇怪是吧。。
					// #ifdef APP-PLUS
						//app端口 login 跳转后主动关闭加载页面
						plus.navigator.closeSplashscreen()
					// #endif
				}
			})
		})
	}else {
		//让 有登录标识，然后再打开app的情况也调用关闭加载页的方法
		// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen()
		// #endif
	}
}
export default routerInterceptor
	



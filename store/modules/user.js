/**
 * 用户 store
 */
export default {
	namespaced: true,
	state: {
		//本身传进来的就是一个json 所以需要转换
		userInfo: uni.getStorageSync("userInfo"),
		
		token: uni.getStorageSync("token"),
	},
	getters: {
		//判断登录标识是否存在
		isLoginFlagValid(state) {
			
			//缺一个都不行
			if(!state.userInfo || !state.token) {
				return false;
			}
			return true //没有过期这个概念了 直接return true
		},
		//直接获取这个userInfo
		getUserInfo(state) {
			//我将会把token 以及 userInfo 全放这个里
			return state.userInfo
		},
		
		//token信息
		getToken(state) {
			return state.token
		},
		
	},
	mutations: {
		//登录成功后，设置用户信息
		SET_USER_INFO: (state,userInfo) => {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo',userInfo);
		},
		//登录成功后 ,设置token
		SET_TOKEN: (state,token) => {
			state.token = token
			uni.setStorageSync('token',token);
		},
		//清空用户信息
		REMOVE_USER_INFO: (state) =>{
			state.loginFlag = null
			uni.removeStorageSync("userInfo");
		},
		//清空token
		REMOVE_TOKEN: (state) =>{
			state.token = null
			uni.removeStorageSync("token");
		},
	}
	
}

<script>
	import {mapGetters} from "vuex"
	import interceptorCollection from "@/config/interceptor"
	import messagePush from "@/config/push"
	export default {
		onLaunch: function() {
			//初始化
			this.init();
		},
		onShow: function() {
		
			console.log("show")
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapGetters({
				isLoginFlagValid: "user/isLoginFlagValid",
				token: "user/getToken"
			})
		},
		methods:{
			//初始化 h5端 拦截器必须先行拦截一次，不然会出现诡异的漏拦截
			init(){
				// #ifdef H5
					//true 代表已经过期 过期的要跳走
					const flag = this.isLoginFlagValid
					if(!flag){
						uni.reLaunch({
							url: "/pages/login/login"
						})
					}
				// #endif
			
				//拦截函数
				interceptorCollection();
				// #ifdef APP-PLUS
					//消息推送
					//messagePush();
				// #endif
			}
		},
		watch: {
			token(v) {
				console.log(v)
			}
		}
	}
</script>

<style lang="scss">
	
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page {
		background-color: #f7f7f8;
	}
</style>

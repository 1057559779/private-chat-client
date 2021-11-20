<script>
	import ToastUtil from "@/common/js/util/toast-util.js"
	import {mapGetters,mapMutations} from "vuex"
	import wsClient from "@/common/js/util/ws-client.js"
	import messagePush from "@/config/push"
	export default {
		onLaunch: function() {
			//初始化
			this.init();
		},
		onShow: function() {
			
		
		},
		onHide: function() {
		
		},
		computed: {
			...mapGetters({
				isLoginFlagValid: "user/isLoginFlagValid",
				token: "user/getToken"
			})
		},
		methods:{
			...mapMutations({
			    removeUserInfo(commit) {
			      commit("user/REMOVE_USER_INFO")
			    },
				removeToken(commit) {
			      commit("user/REMOVE_TOKEN")
			    },
			}),
			init(){
				//websocket 客户端开始连接
				wsClient.open();
				
				wsClient.receiveMessage((res)=>{
					let obj = JSON.parse(res)
				
					//说明是无权限到
					if(obj.statusCode === 401) {
						ToastUtil.show(obj.content)
						// 删除一些用户标识
						this.removeUserInfo()
						this.removeToken()
						
						uni.reLaunch({
							url: "/pages/login/login"
						})
					}
				})
			}
		},
		watch: {
			token(v) {
				//当token不存在当时候 手动关闭ws服务
				if(!v) {
					console.log(v)
					wsClient.close()
				}
			}
		},
	
	}
</script>

<style lang="scss">
	
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page {
		background-color: #f7f7f8;
	}
</style>

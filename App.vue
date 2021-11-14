<script>
	import {mapGetters} from "vuex"
	import wsServer from "@/config/ws/index.js"
	import messagePush from "@/config/push"
	export default {
		onLaunch: function() {
			//初始化
			this.init();
		},
		onShow: function() {
			
		
		},
		onHide: function() {
			wsServer.close()
		
		},
		computed: {
			...mapGetters({
				isLoginFlagValid: "user/isLoginFlagValid",
				token: "user/getToken"
			})
		},
		methods:{
			init(){
				//如果存在登录标识自动连接websocket 如果标识是过期当，自动401关闭 退回登录页面
				if(this.isLoginFlagValid) {
					//websocket 服务启动
					wsServer.open()
				}
				
				
			}
		},
		watch: {
			token(v) {
				//当token不存在当时候 手动关闭ws服务
				if(!v) {
					console.log(v)
					wsServer.close()
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

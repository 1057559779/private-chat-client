<template>
	<view>
		一对一 {{userInfo}}
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	
	export default {
		data() {
			return {
				targetId: null, //聊天室目标对象
			}
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			})
		},
		onLoad(param) {
			let targetId = param.target_id
			this.targetId = targetId
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

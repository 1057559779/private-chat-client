<template>
	<view>
		群聊 {{userInfo}}
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		data() {
			return {
				
			}
		},
		onLoad(param) {
			let targetId = param.target_id
			this.targetId = targetId
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			})
		},
		methods: {
			
		},
	}
</script>

<style>

</style>

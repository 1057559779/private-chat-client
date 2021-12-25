<template>
	<view>
		hi
	</view>
</template>
<script>
	import userApi from "@/api/user/info.js"
	export default {
	
		data() {
			return {
				
			}
		},
		methods: {
			async getList() {
				let param = {
					searchVal: "管理员",
					current: 1,
					size: 30
				}
				const res = await userApi.searchUser(param)
				console.log(res)
			}
		},
		onLoad() {
			this.getList()
		}
	}
</script>

<style>

</style>

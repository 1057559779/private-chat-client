<template>
	<view class="content">
		<view>
			<UserAddTopbar v-model="searchVal" @search="getList"></UserAddTopbar>
		</view>
		<view class="user-add-box">
			{{userList}}
		</view>
	</view>
</template>
<script>
	import UserAddTopbar from "./user-add-topbar.vue"
	import ToastUtil from "@/common/js/util/toast-util.js"
	import userApi from "@/api/user/info.js"
	export default {
		components: {
			UserAddTopbar
		},
		data() {
			return {
				searchVal: "",
				current: 1,
				size: 30,
				userList: []
			}
		},
		methods: {
			async getList() {
				if(!this.searchVal) {
					//ToastUtil.show("搜索内容不能为空")
					return;
				}
				let param = {
					searchVal: this.searchVal,
					current: 1,
					size: 30
				}
				const res = await userApi.searchUser(param)
				this.userList = res
			}
		},
		onReachBottom() {
			this.current+=1
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		height: 100%;
	
		.user-add-box {
			
		}
	}
</style>

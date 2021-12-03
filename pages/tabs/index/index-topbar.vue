<!-- 首页-自定义topbar -->
<template>
	<view>
		<MyTopBar>
			<view class="index-topbar">
				<u-avatar :size="55" class="avatar"
				 :src="userInfo.avatar?userInfo.avatar:''"></u-avatar>
				
				<view class="center">
					{{userInfo.showName}}
				</view>
				<view class="right">
					<u-icon name="plus"></u-icon>
				</view>
			</view>
		</MyTopBar>
	</view>
</template>

<script>
	import MyTopBar from "@/components/my-topbar.vue";
	import {mapGetters} from "vuex";
	
	export default {
		components: {
			MyTopBar,
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters({
				userInfo: "user/getUserInfo"
			})	
		},
		methods: {
			
		}
		
	}
</script>

<style scoped lang="scss">
	.index-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 35rpx;
		height: 100%;
		.right {
			font-size: 48rpx;
			color: $global-primary;
		}
		.center {
			flex: 1;
			padding: 0 20rpx;
			text-align: center;
		}
	}
</style>

<template>
	<view>
		<view>
			<MyTopBar>
				<view class="single-room-topbar">
					<view class="left" @click="back">
						back
					</view>
					<view class="center">
						聊天者
					</view>				
				</view>
			</MyTopBar>
		</view>
	</view>
</template>

<script>
	import MyTopBar from "@/components/my-topbar.vue"
	
	export default {
		components: {
			MyTopBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.single-room-topbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		height: 100%;
		
		.left {
			
		}
	}
</style>

<template>
	<view class="my-cener-list">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-cener-list {
		border-radius: 15rpx;
		background-color: #ffffff;
		margin-bottom: 35rpx;
		border-top: 1px solid $global-general;
	}
</style>

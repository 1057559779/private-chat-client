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
		box-shadow:0px 1px 5px #ebeef8;
		margin-bottom: 35rpx;
	}
</style>

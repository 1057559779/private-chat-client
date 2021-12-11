<template>
	<view class="content">
		<view>
			<RelationTopbar></RelationTopbar>
		</view>
		<scroll-view :scroll-y="true" class="relation-box">
			hi
		</scroll-view>
	</view>
</template>

<script>
	import RelationTopbar from "./relation-topbar.vue"
	export default {
		components: {
			RelationTopbar
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #ffffff;
		height: 100%;

		.relation-box {
			//以首页举例，底部tabbar 的宽度 single已经帮咱算好了， 咱只需要算topbar的距离
			height: calc(100% - 85rpx - var(--status-bar-height));
		}
	}
</style>

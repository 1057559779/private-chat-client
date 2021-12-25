<template>
	<view>
		<MyTopBar>
			<view class="relation-topbar">
				<view class="left" @click="back">
					<u-icon name="arrow-left"></u-icon>
				</view>
				<view class="search">
					<MySearch :value="value" 
						@input="handleInput"
						@search="handleSearch" placeholder="搜索功能与通知">
						<view class="search-icon">
							<u-icon name="search" color="#60baff" :size="30"></u-icon>
						</view>
					</MySearch>
				</view>
			</view>
		</MyTopBar>
	</view>
</template>

<script>
	import MySearch from "@/components/my-search.vue"
	import MyTopBar from "@/components/my-topbar.vue";
	export default {
		components: {
			MyTopBar,
			MySearch
		},
		props:{
			value: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleInput(v) {
				this.$emit('input',v)
			},
			handleSearch() {
				this.$emit('search')
			}
		}
	}
</script>

<style lang="scss" scoped>
.relation-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 35rpx;
		height: 100%;
		.left {
			
		}
		.search {
			flex: 1;
			padding: 0 20rpx;
			.search-icon {
				padding: 0 10rpx;
			}
		}
	}
</style>

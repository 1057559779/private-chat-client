<template>
	<view class="my-search-box">
		<slot>
			
		</slot>
		<view class="search-input" @click="handleClick">
			<input class="my-search" 
				:placeholder="placeholder" 
				:value="value" 
				:disabled="disabled"
				@focus="handleFocus"
				@input="inputHandle" 
				@confirm="clickEnter"/>
			<!-- 输入内容后 清空按钮 -->
			<u-icon v-if="showClearIcon" class="my-icon" color="#999999" @click="clearIcon" name="close"></u-icon>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: {
			value: {
			   type: String,
			   default: ""
			},
			disabled: { //让你直接不可用 无法触发焦点
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: "输入文字"
			}
		},
		data() {
			return {
				showClearIcon: false
			}
		},
		methods: {
			inputHandle(e) {
				//输入的值 v-model = emit(input) + value
				this.$emit('input', e.target.value)
				this.$emit('handleChange', e.target.value)
				if (e.detail.value.length > 0) {
				    this.showClearIcon = true;
				} else {
				    this.showClearIcon = false;
				}
			},
			clearIcon() {
				this.$emit('input','')
				this.$emit('handleClear')
				this.showClearIcon = false;
			},
			//获得焦点
			handleFocus() {
				this.$emit('focus')
			},
			//按下回车
			clickEnter() {
				this.$emit("search")
			},
			handleClick() {
				this.$emit("click")
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-search-box {
		display: flex;
		border-radius: 25rpx;
		padding: 10rpx;
		background-color: #f2f2f2;
		.search-input {
			align-items: center;
			display: flex;
			flex: 1;
			.my-search {
				flex: 1;
				color: #676767;
				font-size: 28rpx;
				line-height: 1;
				margin: 0 10rpx;
			}
		}
	}
</style>

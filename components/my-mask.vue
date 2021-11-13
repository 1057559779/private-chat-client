<!-- 自定义遮罩层 -->
<template>
	<view class="my-mask" hover-stop-propagation 
		:style="[maskStyle]" 
		@tap="click"
		@touchmove.stop.prevent="() => {}" 
		:class="{'my-mask-show': show}">
			<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"my-mask",
		props:{
			// 是否显示遮罩
			show: {
				type: Boolean,
				default: false
			},
			// 层级z-index
			zIndex: {
				type: [Number, String],
				default: '10074'
			},
			//背景色 遮罩层颜色
			backgroundColor: {
				type: String,
				default: 'rgba(0, 0, 0, 0.6)'
			},
			// 是否可以通过点击遮罩进行回调触发
			maskClickAble: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			maskStyle() {
				let style = {};
				style.backgroundColor = this.backgroundColor;
				//如果自己给予的zindex没有值 则zindex
				if(this.show) {
					style.zIndex = this.zIndex
				}else {
					style.zIndex = -1;
				}
				return style;
			}
		},
		methods: {
			click() {
				if (!this.maskClickAble) {
					return;
				} 
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}

	.my-mask-show {
		opacity: 1;
	}
</style>

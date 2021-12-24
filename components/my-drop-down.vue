<template>
	<view>
		<view class="search-left" @click="dropDown">
			<view>
				<slot name="title"></slot>
			</view>
			<view class="search-icon">
				<view class="choise-drop-down" @click.stop="hideShadow" :style="{'height':dropDownHeight+'px'}">
					<view id="dropDown" class="drop-down-box">
						<view class="choise-triangle"></view>
						<slot name="list"></slot>
					</view>
				</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<MyMask backgroundColor="rgba(0, 0, 0, 0.1)" :show="shadowShow" @click="hideShadow"></MyMask>
	</view>
</template>
<script>
	import MyMask from "@/components/my-mask.vue"
	export default {
		components: {
			MyMask
		},
		data() {
			return {
				searchVal: "", //搜索的值
				dropDownHeight: 0, //下拉框的高度
				shadowShow: false //控制遮罩层的出现
			}
		},
		methods: {
			//需要下拉的时候
			dropDown() {
				this.shadowShow = true
				this.getDropDownHeight()
			},
			//获得下拉框的高度
			getDropDownHeight() {
				uni.createSelectorQuery().select("#dropDown").boundingClientRect(data => {
					this.dropDownHeight = data.height
				}).exec();
			},
			//点击遮罩层触发
			hideShadow() {
				setTimeout(()=>{
					this.shadowShow = false
				},0.15 * 1000)
				this.dropDownHeight = 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-left {
		display: flex;
		.search-icon {
			position: relative;
			.choise-drop-down {
				z-index: 20071; //因为遮罩层的zindex是10070
				transition: height .15s;
				overflow: hidden;
				width: 320rpx;
				position: absolute;
				right: -10px;
				top: 65rpx;
				.drop-down-box {
					.choise-triangle {
						width: 0;
						margin: 0 24rpx 0 auto;
						border-left: 20rpx solid transparent;
						border-right: 20rpx solid transparent;
						border-bottom: 20rpx solid #ffffff;
					}
				}
				
			}
		}

	}
</style>

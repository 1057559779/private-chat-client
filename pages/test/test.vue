<template>
	<view>
		<view class="date-choice">
			<view class="date-pathway">
				<view class="pathway-item" v-for="(item,index) in diffDays" :key="index">
					<view>
						<view>{{dateItem(index).format('MM-dd')}}</view>
						<view>{{transWeek(dateItem(index).getDay())}}</view>
					</view>
				
				</view>
			</view>
			<view class="date-btn">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//时间区间	//今天       未来一个月后的今天
				dateRange: [new Date(),new Date(new Date().setMonth(new Date().getMonth() + 1))]
			}
		},
		computed: {
			//时间区间相差的天数  +1是为了 日期增加的时候避免加的最后是29的情况，其实应该是30 因为第一个元素是0 代表第一天
			diffDays() {
				let days = (this.dateRange[1].getTime() - this.dateRange[0].getTime())/1000/60/60/24
				return days + 1
			},
			//根据index 计算时间偏移量
			dateItem() {
				return (index)=> {
					return new Date(new Date().setDate(new Date().getDate() + index))
				}
			},
			transWeek() {
				return (week)=> {
					
					switch(week) {
						case 0:
							return "星期日";
						case 1: 
							return "星期一";
						case 2:
							return "星期二";
						case 3:
							return "星期三";
						case 4:
							return "星期四";
						case 5:
							return "星期五";	
						case 6:
							return "星期六";				
					}
				
				}
			}
		},
		methods: {
			
		},
	}
</script>

<style scope lang="scss">
	.date-choice {
		display: flex;
		.date-pathway {
			
			flex: 1;
			overflow: auto;
			white-space: nowrap;
			background-color: #ffffff;
			.pathway-item {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx;
				width: 150rpx;
				height: 100%;
				display: inline-flex;
				
			}
		}
		.date-btn {
			margin-left: 10rpx;
			width: 150rpx;
			height: 150rpx;
			background-color: #ffffff;
		}
	}
</style>

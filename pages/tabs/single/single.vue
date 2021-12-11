<!-- 单页面  为了适配自定义tabbar index等页面将作为子组件的方式-->
<template>
	<view class="single-page">
		<!-- 多个component + v-show 来模拟页面缓存 以及 初次运行app 只运行首页 -->
		<component v-for="(item,index) in allPageList" :key="index" 
			v-show="current === index" :ref="item.name" :is="activePageList[index]">
		</component>
		<!-- 自定义的tabbar -->
		<MyTabbar :current="current" @click="clickTabbar"></MyTabbar>
	</view>
</template>

<script>
	import tabbarList from "@/config/base/tabbar-list.js"
	import IndexPage from "@/pages/tabs/index/index.vue"
	import MyCenterPage from "@/pages/tabs/my-center/my-center.vue"
	import Relation from "@/pages/tabs/relation/relation.vue"
	import MyTabbar from "@/components/my-tabbar.vue"
	export default {
		components: {
			MyTabbar,
			IndexPage,
			MyCenterPage,
			Relation
		},
		computed: {
			//激活的tabbar页，搭配component组件 is为空的，则不挂载组件 美其名曰懒加载
			activePageList() {
				//定义一个根据tabbarList有多长数组就有多长的数组[null,null]
				let arr = Array(tabbarList.length)
				//如果第一个元素有值
				if(tabbarList[0]) {
					//将tabbar第一个元素赋值给激活数组元素中
					arr[0] = tabbarList[0]
				}
				return arr.map(e => e.name)
			},
			//总共所有的tabbar页
			allPageList() {
				let arr = tabbarList
				return arr.map(e => e.name)
			}
		},
		data() {
			return {
				current: 0, //当前是显示哪个页面
			}
		},
		methods: {
			//点击tabbar的某个item的时候
			clickTabbar(index) {
				this.activePageList[index] = this.allPageList[index]
				this.current = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.single-page {
		//普通的手机 没有底部安全区 100为tabbar
		height: calc(100vh - 100rpx);
		
		//下述两个height 都是对应于具有 底部安全局的
		height: calc(100vh - 100rpx - constant(safe-area-inset-bottom));
		height: calc(100vh - 100rpx - env(safe-area-inset-bottom));	
	}
</style>

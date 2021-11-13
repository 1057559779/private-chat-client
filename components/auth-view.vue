<!-- 
		 在传统h5开发中 一个v-auth 就够了，但是uni-app 的app环境中无法删除节点  所以只能采用隐藏 
		 为了开发便捷，单独的v-auth 指令来控制该元素是否有权限显示已经不够了，所以引入了组件的方式
		 通过组件的 class的双向绑定变化来做到样式变化（app端无法用.style 无法用.classList 也无法使用 .setAttribute 必须要用绑定的方式）
		 自定义指令 v-auth 定义 存在于 order/order-auth.js 文件中
		 
		 该firechildren 权限不存在于角色列表中 所以 该标签将不被显示
		 <AuthView :auth="['firechildren']">我是v-auth 自定义组件</AuthView>
	-->
<template>
	<view v-auth="auth" :class="classStyle">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"auth-view",
		data() {
			return {
				classStyle: ""
			}
		},
		props:{
			auth: {
				type: Array,
				default: ()=>[]
			}
		}
	}
</script>

<style scoped lang="scss">

.dom-hidden {
	display: none;
}
</style>

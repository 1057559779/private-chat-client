import {sameValSet} from "@/common/js/util/arr-action.js"

//假定该roleList 是后端查询得到的用户的权限列表
let roleList = ['admin',"general-member"]

export default {

   install(Vue) {
    // 注册一个全局自定义指令 `v-auth`
     Vue.directive('auth', {
       // 当被绑定的元素插入到 DOM 中时……
       inserted: function (el, binding, vnode) {
		  
		  let flag = sameValSet(roleList,binding.value).size >0
			
		  // < 0 代表该角色不存在 元素删除（app端其实是隐藏，因为编译成app的时候原生js将会失效）
		  if(flag === false){
			 
			 // #ifdef H5
				//移除元素,防止浏览器端 有人用f12强制修改
				el.remove()
			 // #endif
			 
			
			// #ifdef APP-PLUS
				//反正app端打不开抓包工具，直接修改class 该class 不能直接用原生js改，必须用vue的class绑定方式去修改
				vnode.context.classStyle = "dom-hidden"
			// #endif
			
		  }
       }
     })
   },
}
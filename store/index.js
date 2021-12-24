import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user.js"
import chat from "./modules/chat.js"
import support from "./modules/support.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	
	modules: {
		user,
		chat,
		support
	}
})

export default store
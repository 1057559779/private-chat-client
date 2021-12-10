import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user.js"
import chat from "./modules/chat.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	
	modules: {
		user,
		chat
	}
})

export default store
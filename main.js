import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from "uview-ui";
import vAuth from "@/config/order/order-auth.js";
import dateFormate from "@/common/js/prototype/date-format.js"
import generateUUID from "@/common/js/util/get-uuid.js"


Vue.prototype.$getUUID = generateUUID;
Vue.config.productionTip = false
Vue.use(dateFormate)
Vue.use(vAuth)
Vue.use(uView);

App.mpType = 'app'


const app = new Vue({
	store,
    ...App
})
app.$mount()

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './router/router.js'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token")
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers["Authorization"] = token;
        console.log('interceptors config=',config)
    }
    return config
}, error => {
    return Promise.reject(error)
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

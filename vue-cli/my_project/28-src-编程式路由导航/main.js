import Vue from 'vue'

import App from './App'

// 引入vue-router
import vueRouter from 'vue-router'

// 引入路由器
import router from './router'

Vue.config.productionTip = false

// 应用vue-router
Vue.use(vueRouter)

new Vue({
    render:c => c(App),  
    router:router
}).$mount('#app')

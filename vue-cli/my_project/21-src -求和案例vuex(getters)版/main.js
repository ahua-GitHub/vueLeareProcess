import Vue from 'vue'

import App from './App'

// 引入store
import Store from './store'

Vue.config.productionTip = false


const vm = new Vue({
    render:c => c(App),  
    store:Store
}).$mount('#app')

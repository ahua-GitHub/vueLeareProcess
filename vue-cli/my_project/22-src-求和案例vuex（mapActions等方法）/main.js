import Vue from 'vue'

import App from './App'

// 引入store
import Store from './store'

Vue.config.productionTip = false


new Vue({
    render:c => c(App),  
    store:Store
}).$mount('#app')

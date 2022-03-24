import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

new Vue({
    
    render:c => c(App)
}).$mount('#app')
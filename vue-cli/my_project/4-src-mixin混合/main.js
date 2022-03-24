import Vue from 'vue'
import { mixin } from 'vue/types/umd'

import App from './App'

Vue.config.productionTip = false

// 全局混入
// Vue.mixin(mixin)

new Vue({
    render:c => c(App)
}).$mount('#app')
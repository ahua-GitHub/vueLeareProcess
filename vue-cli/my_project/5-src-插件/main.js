import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

// 引入插件
import plugins from './plugins'
// 应用插件（调用plugins.js中的install方法）
Vue.use(plugins)
new Vue({
    render:c => c(App)
}).$mount('#app')
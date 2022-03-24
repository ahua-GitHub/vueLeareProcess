import Vue from 'vue'

import App from './App'

// 引入插件
// import vueResource from 'vue-resource'

Vue.config.productionTip = false
// 使用插件
// Vue.use(vueResource)


new Vue({
    render:c => c(App),
    beforeCreate(){
        Vue.prototype.$bus = this
    },
    beforeDestroy(){
        this.$bus.$off('getGithubUsers')
    }
   
}).$mount('#app')

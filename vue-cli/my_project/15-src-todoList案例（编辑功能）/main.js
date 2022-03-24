import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false


new Vue({
    render:c => c(App),
    //通过全局事件总线MyItem组件给App传递数据
    beforeCreate(){
        Vue.prototype.$bus = this
    },
    beforeDestroy(){
        this.$bus.$off('ahuaAdd')
        this.$bus.$off('ahuaDelete')
    }
}).$mount('#app')

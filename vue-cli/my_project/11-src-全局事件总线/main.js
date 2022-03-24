import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

// 1.将组件实例对象放在Vue原型上
// 组件实例对象或者Vue实例对象上才能访问到$on $off $emit这些属性或者方法
// const demo = Vue.extend({}) //demo这里相当于VueComponent
// // 创建一个组件实例对象
// const d = new demo()
// 将组件实例对象绑定的vue原型上
// Vue.prototype.x = d

new Vue({
    
    render:c => c(App),

    // 2.将Vue实例对象上放在Vue原型上，在beforeCreate钩子中将Vue实例对象放在Vue原型上，因为此时模板还未解析，数据监测和数据代理也未完成
        // 写在new Vue前面：此时Vue实例还未定义
        // 写在new Vue后面：此时app已经解析解析完成，放在页面上了，再向原型上放数据已经完了

    beforeCreate() {
        // 安装全局事件总线,'$'是为了迎合Vue的设计，'bus'有总线的意思，你叫'ahua'也行
        // beforeCreate中的this就是new Vue，也就是Vue的实例对象vm（在Vue原型上放一个$bus，值就是Vue的实例对象，这样所有的组件实例对象和Vue实例对象都能找到$bus）
        Vue.prototype.$bus = this
    },
    // 如果组件不在使用，将绑定的事件关闭
    beforeDestroy(){

        this.$bus.$off('hello')
    }
}).$mount('#app')
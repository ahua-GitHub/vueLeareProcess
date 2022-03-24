// 引入Vue,这里引入的版本，vue.js是完整版的vue，包含vue核心功能和模板解析器，而vue.runtime.xxx.js是运行版的只包含核心功能
import Vue from 'vue'
// 引入app组件，是所有组件的父组件
import App from './App.vue'
// 关闭vue的生产提示
Vue.config.productionTip = false

// 创建vue的实例对象
new Vue({
// 因为vue.runtime.xxx.js中没用模板解析器，所有不能使用template配置项，需要使用render函数收到createElement函数去指定具体内容
// 完整版写法
// render(createElement){
//   return createElement(App)
// },
  render: h => h(App),
}).$mount('#app')



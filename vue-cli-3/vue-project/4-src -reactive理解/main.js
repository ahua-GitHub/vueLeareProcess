//不再是引用vue构造函数了,而是一个名为creatApp的工厂函数 
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象 类似vue 2中的vm，但app比vm更轻量
// 然后将模板挂载到app上
createApp(App).mount('#app')

// 用于创建整个应用的路由器
import vueRouter from 'vue-router'
// 引入组件
import About from '../component/about'
import Home from '../component/home'
import News from '../component/news'
import Message from '../component/message'

// 创建并暴露一个路由器
export default new vueRouter({
    routes:[
        // 一级路由
        {
            // 如果路径是'/about'，展示About组件
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            // 二级路由  二级路由匹配路径时不需要'/'
            children:[
                {
                    path:'news',
                    component:News,
                },
                {
                    path:'message',
                    component:Message,   
                }
            ]
        }
    ]
})
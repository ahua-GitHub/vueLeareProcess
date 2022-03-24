// 用于创建整个应用的路由器
import vueRouter from 'vue-router'
// 引入组件
import About from '../page/about'
import Home from '../page/home'
import News from '../page/news'
import Message from '../page/message'
import Detail from '../page/detail'

// 创建并暴露一个路由器
export default new vueRouter({
    routes:[
        // 一级路由
        {
            // 组件命名
            name:'guanyu',
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
                    // 三级路由
                    children:[
                        {
                            // 路由命名，可以在切换组件时使用路由name属性来跳转
                            name:'messageDetail',
                            component:Detail,


                            // props的第一种写法，值为对象，该对象中所有的key-value都会以props的形式传递给detail组件
                            // props:{
                            //     a:1,
                            //     b:'ahua'
                            // }

                            // porps的第二种写法，值为布尔值，若为真，就会把路由组件收到的所有params参数以props的形式传递给detail组件
                            // props:true
                            // 携带params参数，路由写法:占位符
                            // path:'detail/:id/:title',

                            // props的第三种写法，值为函数
                            path:'detail',
                            props($router){
                                return {id:$router.query.id,title:$router.query.title}
                            }
                        }
                    ] 
                }
            ]
        }
    ]
})
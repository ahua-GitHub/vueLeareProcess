// 用于创建整个应用的路由器
import vueRouter from 'vue-router'
// 引入组件
import About from '../page/about'
import Home from '../page/home'
import News from '../page/news'
import Message from '../page/message'
import Detail from '../page/detail'

// 创建并暴露一个路由器
const router =  new vueRouter({
    routes:[
        // 一级路由
        {
            // 组件命名
            name:'guanyu',
            meta:{title:'关于'},
            // 如果路径是'/about'，展示About组件
            path:'/about',
            component:About,
        },
        {
            name:'shouye',
            path:'/home',
            meta:{title:'首页'},
            component:Home,
            // 二级路由  二级路由匹配路径时不需要'/'
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    // 路由源信息
                    meta:{isAuth:true,title:'新闻'}
                },
                {
                    // 路由源信息
                    meta:{isAuth:true,title:'信息'},
                    path:'message',
                    component:Message,  
                    // 三级路由
                    children:[
                        {
                            // 路由命名，可以在切换组件时使用路由name属性来跳转
                            name:'messageDetail',
                            component:Detail,

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

// 全局前置路由守卫--初始化的时候被调用，每次切换路由之前被调用
// 参数 to：目标路由信息  from：初始路由信息  next：放行路由
router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from,next)

    // to.path === '/home/news' ==> to.name === 'xinwen'
    // 判断是否需要拦截路由，可以在路由器的配置项meta中设置，然后统一进行判断  
    // if(to.meta.isAuth)
    if(to.path === '/home/news' || to.path === '/home/message'){
        if(localStorage.getItem('name') === 'ahua'){
            next()
        }else{
            alert('用户名错误')
        }
    }else{
        next()
    }
})

// 全局后置路由守卫--初始化的时候被调用，每次路由切换之后被调用
router.afterEach((to,from)=>{
    console.log('后置路由守卫',to,from)
    document.title = to.meta.title  || '管理系统'
})
export default router
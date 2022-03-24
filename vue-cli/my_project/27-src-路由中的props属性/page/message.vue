<template>
<div>
    <ul>
        <li v-for="m in messageList" :key="m.id">

            <!-- 跳转路由并携带query参数，to的对象写法 -->
            <router-link :to="{
                // 路由命名后可以使用路由的名字代替路径实现跳转
                // name:'messageDetail',
                path:'/home/message/detail',
                query:{
                    id:m.id,
                    title:m.title
                }
            }"> 
            {{m.title}}
            </router-link>
           

            <!-- 跳转路由并携带params参数，to的对象写法 -->
            <!-- <router-link :to="{
                //params参数时只能使用路由name来进行跳转，不能使用path
                name:'messageDetail',
                params:{
                    id:m.id,
                    title:m.title
                }
            }">
            {{m.title}}
            </router-link> -->
        </li>
    </ul>
    <hr>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name:'Message',
    data() {
        return {
            messageList:[
                {id:'001',title:'消息001'},
                {id:'002',title:'消息002'},
                {id:'003',title:'消息003'}
            ]
        }
    }
}
</script>

<style>

</style>

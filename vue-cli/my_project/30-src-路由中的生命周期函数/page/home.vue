<template>
    <div>
        <h2>Home组件内容</h2>
        <div>
        <ul class="nav nav-tabs">
            <li>
                <!-- 二级路由需要带上父级路径 -->
                <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
            </li>
            <li>
                <router-link class="list-group-item" active-class="active"  to="/home/message">Message</router-link>
            </li>
        </ul>
        <!-- 切换显示组件时，原组件不销毁   include="组件名"时只有定义的组件不会被销毁-->
        <keep-alive include="News">
            <router-view></router-view>
        </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    name:'Home',
    // beforeDestroy() {
    //      console.log('home组件即将被销毁',this)
    // },
    // mounted() {
    //     console.log('home组件挂载完毕',this)
    // },
}
</script>

<style>

</style>
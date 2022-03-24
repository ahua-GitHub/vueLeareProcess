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
        <router-view></router-view>
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
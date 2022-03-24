<template>
    <h2>我是About的内容</h2>
</template>

<script>
export default {
    name:'About',
    // 切换之后的组件（未展示）都会被销毁
    // beforeDestroy() {
    //     console.log('about组件即将被销毁')
    // },
    // mounted() {
    //     console.log('about组件挂载完毕',this)
    // },

    // 通过路由规则，进入该组件时被调用
    beforeRouteEnter (to, from, next) {
        console.log('app---beforRouterEnter',to,from)
        next()
    },
    // 通过路由规则，离开该组件时被调用
    beforeRouteLeave(to, from, next){
        console.log('app---afterRouterLeave',to,from)
        next()
    }
}
</script>

<style>

</style>
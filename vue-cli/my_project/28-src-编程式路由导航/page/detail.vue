<template>
  <ul>

      <li>消息序号是:{{id}}</li>
      <li>消息内容是:{{title}}</li>       


  </ul>
</template>

<script>
export default {
    name:'Detail',
    props:['id','title'],
    mounted() {
        // 得到这个组件相关的路由配置信息
        console.log(this.$route)
    },
}
</script>

<style>

</style>
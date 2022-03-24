<template>
  <ul>
    <!--组件中的props写法一-->
      <!-- <li>{{a}}</li>
      <li>{{b}}</li> -->

      <!-- 组件中的props写法二 -->
      <!-- <li>消息序号是:{{id}}</li>
      <li>消息内容是:{{title}}</li> -->

      <!-- 组件中的props写法二 -->
      <li>消息序号是:{{id}}</li>
      <li>消息内容是:{{title}}</li>   

  </ul>
</template>

<script>
export default {
    name:'Detail',
    // props:['a','b'],

    props:['id','title'],
    mounted() {
        // 得到这个组件相关的路由配置信息
        // console.log(this.$route)
    },
}
</script>

<style>

</style>
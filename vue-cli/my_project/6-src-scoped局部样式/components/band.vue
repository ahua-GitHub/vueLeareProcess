<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>乐队名称:{{name }}</h2>
      <h2>乐队人数:{{singerNum}}</h2>

  </div>
</template>

<script>
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个乐队',
            name:'早晚一颗回春丹',
            singerNum:3
        }
    }
}
</script>

<style scoped>
    .band{
        color: aqua;
    }
</style>


<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>组合名称:{{name}}</h2>
      <h2>组合人数:{{singerNum}}</h2>
  </div>
</template>

<script>
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个组合',
            name:'四驱兄弟',
            singerNum:2
        }
    }
}
</script>
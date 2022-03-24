<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>乐队名称:{{name | sliceString}}</h2>
      <input type="text" v-fbind:value="name"><br><br>
      <button @click="say">点我测试hello方法</button>
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
    },
    methods: {
      say(){
            this.sayHello()
        }  
    }
}
</script>
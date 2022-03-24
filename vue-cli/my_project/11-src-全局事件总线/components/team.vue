<template>
  <div class="team">
      <h1>{{message}}</h1>
      <h2>组合名称:{{name}}</h2>
      <h2>组合人数:{{singerNum}}</h2>    
      <button @click="sendTeamName">给band组件传递名字</button>
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
    },
    methods: {
        sendTeamName(){ 
            // 方法一：将组件实例对象上放在Vue原型上
            // this.x.$emit('hello',this.name)

            // 方法二：全局事件总线，将Vue实例对象上放在Vue原型上
            this.$bus.$emit('hello',this.name)
        }
    },
}
</script>
<style scoped>
.team{
    background-color: cadetblue;
    padding: 10px;
}
</style>
<template>
  <div class="band">
    <h1>{{message}} </h1>
    <h2>乐队名称:{{name }}</h2>
    <h2>乐队人数:{{singerNum}}</h2>

  </div>
</template>

<script>
export default {
    name:'Band',
    props:['getBandName'],
    data() {
        return {
            message:'我是一个乐队',
            name:'回春丹',
            singerNum:3
        }
    },
mounted() {
        // 方法一：将组件实例对象上放在Vue原型上
        // this.x.$on('hello',(data)=>{
        //     console.log('我是band组件,收到了team组件的名字',data)
        // })

        // 方法二：全局事件总线，将Vue实例对象上放在Vue原型上
        this.$bus.$on('hello',(data)=>{
            console.log('我是band组件,收到了team组件的名字',data)
        })
    },
}
</script>

<style scoped>
    .band{
        background-color: aqua;
        padding: 10px;
    }
</style>


<template>
  <div class="band">
    <h1>{{message}} </h1>
    <h2>乐队名称:{{name }}</h2>
    <h2>乐队人数:{{singerNum}}</h2>
    <button @click="sendBandName">把乐队name传给App</button>
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
    methods: {
        sendBandName(){
            this.getBandName(this.name)
        }
    },
}
</script>

<style scoped>
    .band{
        background-color: aqua;
        padding: 10px;
    }
</style>


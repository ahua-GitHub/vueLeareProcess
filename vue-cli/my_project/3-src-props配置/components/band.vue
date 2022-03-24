<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>乐队名称:{{bandName}}</h2>
      <h2>乐队人数:{{singerNum}}</h2>
  </div>
</template>

<script>
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个乐队',
        }
    },
    props:{
        bandName:String,
        singerNum:Number
    }
}
</script>

<style>
.band{
    background-color:plum;
}
</style>
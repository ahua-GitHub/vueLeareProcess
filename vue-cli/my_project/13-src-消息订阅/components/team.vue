<template>
  <div class="team">
      <h1>{{message}}</h1>
      <h2>组合名称:{{name}}</h2>
      <h2>组合人数:{{singerNum}}</h2>    
      <button @click="sendTeamName">给band组件传递名字</button>
  </div>
</template>

<script>
// 引入实现消息订阅的第三方库，这里的pubsub是一个对象，身上有很多实用的方法
import pubsub from 'pubsub-js'
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
            // 发布一条消息
            pubsub.publish('ahua',this.name)
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
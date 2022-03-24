<template>
  <div class="band">
    <h1>{{message}} </h1>
    <h2>乐队名称:{{name }}</h2>
    <h2>乐队人数:{{singerNum}}</h2>

  </div>
</template>

<script>
// 引入实现消息订阅的第三方库，这里的pubsub是一个对象，身上有很多实用的方法
import pubsub from 'pubsub-js'
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
        receiveTeamName(msgName,data){
            console.log('我收到了来自team组件的数据:',data)
        }
    },
    mounted() {

        //band组件挂载完毕后订阅一个消息,第一个参数：订阅的消息名，第二个参数：有人发布该订阅消息后执行的回调;
        // 回调中接受两个参数，第一个是消息名，第二个是发布消息时传递过来的参数
        this.pubId =  pubsub.subscribe('ahua',this.receiveTeamName)
    },
    beforeDestroy() {
        pubsub.unsubcribe(this.pubId)
    },
}
</script>

<style scoped>
    .band{
        background-color: aqua;
        padding: 10px;
    }
</style>


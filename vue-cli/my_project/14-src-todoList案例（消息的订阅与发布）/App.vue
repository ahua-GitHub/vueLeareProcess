<template>
    <div id="app">
        <div class="MyApp">
            <div class="MyContent">
                <MyHeader :addTodo='addTodo'/>
                <MyList :todos='todos' :deleteTodo="deleteTodo" />
                <MyFooter :todos='todos' :checkedAllTodo='checkedAllTodo' :clearTodo='clearTodo' />
            </div>
        </div>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
import MyHeader from "./components/MyHeader.vue"
import MyFooter from "./components/MyFooter.vue"
import MyList from "./components/MyList.vue"
export default {
    name:'App',
      components:{
        MyHeader,
        MyFooter,
        MyList,
    },
    data() {
        return { 
            todos:[
                {id:'001',title:'吃饭',completed:true},
                {id:'002',title:'睡觉',completed:false},
                {id:'003',title:'打豆豆',completed:true},
            ]
        }
    },
    methods: {
        // 添加一个todo
        addTodo(todoObj){
            this.todos.unshift(todoObj)
        },
        //删除todo对象
        // 这里pubsub库中订阅消息的回调有两个参数，消息名和发布消息传递过来的数据，这里不使用消息名所以使用下划线占位
        deleteTodo(_,id){
            // 过滤器，返回一个新数组
            this.todos = this.todos.filter((todo)=>{
                return todo.id !== id
            })
        },
        // 勾选或者取消一个todo
        checkTodo(id){
            this.todos.forEach((todo) => {
                if(todo.id === id) todo.completed = !todo.completed
            })
        },
        // 全选或者取消全选
        checkedAllTodo(check){
            this.todos.forEach((todo)=>{
                todo.completed = check
            })
        },
        // 清除选中的todo
        clearTodo(){
            this.todos = this.todos.filter((todo)=>{
                return !todo.completed
            })
        }
    },
    mounted() {
        // 绑定自定义事件（全局事件总线）
        this.$bus.$on('ahuaAdd',this.checkTodo)

        // 绑定自定义事件（消息订阅） 
        this.pubId = pubsub.subscribe('ahuaDelete',this.deleteTodo)

    },
    // 解除消息订阅
    beforeDestroy() {
        pubsub.unsubcribe(this.pubId)
    },
  
}
</script>
<style>
    .MyApp{
        width: 400px;
        border: 1px solid grey;
        border-radius: 10px;
        justify-content: center;
        padding: 20px;
    }
    button{
        color: aliceblue;
        background-color: red;
        border: none;
        border-radius: 3px;
    }


</style>


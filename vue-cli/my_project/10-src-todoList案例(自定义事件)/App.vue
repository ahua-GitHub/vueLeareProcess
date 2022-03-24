<template>
    <div id="app">
        <div class="MyApp">
            <div class="MyContent">
                <MyHeader @addTodo='addTodo'/>
                <MyList :todos='todos' :checkTodo='checkTodo' :deleteTodo="deleteTodo" />
                <MyFooter :todos='todos' @checkedAllTodo='checkedAllTodo' @clearTodo='clearTodo' />
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue"
import MyFooter from "./components/MyFooter.vue"
import MyList from "./components/MyList.vue"
export default {
    name:'App',
    data() {
        return {
            todos:[
                {id:'001',title:'吃饭',completed:true},
                {id:'002',title:'睡觉',completed:false},
                {id:'003',title:'喝酒',completed:true},
            ]
        }
    },
    methods: {
        // 自定义事件，添加一个todo
        addTodo(todoObj){
            this.todos.unshift(todoObj)
        },
        // 勾选或者取消一个todo
        checkTodo(id){
            this.todos.forEach((todo) => {
                if(todo.id === id) todo.completed = !todo.completed
            });
        },
        //删除todo对象
        deleteTodo(id){
            // 过滤器，返回一个新数组
            this.todos = this.todos.filter((todo)=>{
                return todo.id !== id
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
    components:{
        MyHeader,
        MyFooter,
        MyList,
    }
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


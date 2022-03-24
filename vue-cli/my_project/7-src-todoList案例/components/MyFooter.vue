<template>
    <div class="MyFooter" v-show="todos.length">
        <div class="MyFooterCheckbox">
            <!-- 拆分的写法 -->
            <!-- <input type="checkbox"  :checked="All" @change="checkAll" >已选中 {{completedTodo}}  /  全部 {{todos.length}} -->
            <input type="checkbox"  v-model="All" >已选中 {{completedTodo}}  /  全部 {{todos.length}}
        </div>
        <div class="MyFooterButton">
            <button @click="clearSelect">清除已完成任务</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyFooter',
    props:['todos','checkedAllTodo','clearTodo'],
    computed:{
        // 计算选中的todo数目
        completedTodo(){
            // es6中reduce用于做条件统计传入两个参数
            // reduce中第一个参数为函数，数组长度是几就会被调用几次（第一个参数表示上一次的统计值，第二个参数是对象中的元素）
            // reduce第二个参数0表示初始统计的初始值
           return this.todos.reduce((pre,todo)=>{
                return pre + (todo.completed ? 1 : 0)
            },0)
            // 简写形式
            // return this.todos.reduce((pre,todo) => pre + (todo.completed ? 1 : 0),0)
        },
        // 拆分写法    实现全选框功能
        // All(){
        //     return this.completedTodo === this.todos.length && this.todos.length > 0
        // }


        // v-model写法,涉及修改数据，所以要用计算属性对象模式
        All:{
            get(){
                return this.completedTodo === this.todos.length && this.todos.length > 0
            },
            set(value){
               this.checkedAllTodo(value) 
            }
        }
    },
    methods: {
        //拆分写法 全选按钮选中状态改变后的回调
        // checkAll(e){
        //     this.checkedAllTodo(e.target.checked)
        // }

        // 清除选中
        clearSelect(){
            if(confirm('确认删除选中吗？')){
                this.clearTodo()
            }
        }
    }
    
}
</script>

<style scoped>
    .MyFooter{
        width: 100%;
        height: 30px;
    }
    .MyFooterCheckbox{
        float: left;
    }
    .MyFooterCheckbox input{
        margin-right:20px ;
    }
    .MyFooterButton{
        float: right;
    }
    .MyFooterButton button{
        background: red;
        color: rgb(254,201,179);
        padding: 5px;
    }
</style>
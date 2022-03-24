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
    props:['todos'],
    computed:{
        // 计算选中的todo数目
        completedTodo(){
           return this.todos.reduce((pre,todo)=>{
                return pre + (todo.completed ? 1 : 0)
            },0)
        },
        // v-model写法,涉及修改数据，所以要用计算属性对象模式
        All:{
            get(){
                return this.completedTodo === this.todos.length && this.todos.length > 0
            },
            set(value){
               this.$emit('checkedAllTodo',value) 
            }
        }
    },
    methods: {
        // 清除选中
        clearSelect(){
            if(confirm('确认删除选中吗？')){
                this.$emit('clearTodo')
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
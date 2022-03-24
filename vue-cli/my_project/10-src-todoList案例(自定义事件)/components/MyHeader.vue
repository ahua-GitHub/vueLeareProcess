<template>
    <div class="MyHeader">
        <input type="text" placeholder="请输入你的任务名称,回车键确认" @keydown.enter="add">
    </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'MyHeader',
    methods: {
        add(e){
            // 如果没有输入，提示输入
            if(!e.target.value) return alert("请输入内容！")
            // 将用户输入包装成todo对象
            const todoObj = {id:nanoid(),title:e.target.value,completed:false}
            this.$emit('addTodo',todoObj)
        }
    },  
}
</script>

<style scoped>
    .MyHeader input{
        width: 100%;
        display: block;
        border-radius: 5px;
        height: 30px;
    } 
</style>



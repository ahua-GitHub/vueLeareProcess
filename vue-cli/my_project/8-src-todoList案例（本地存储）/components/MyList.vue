<template>
    <div class="MyList">
        <ul class="tasklist">
            <!--遍历数组动态生成列表， props给Item组件传递数据  -->
            <MyItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" :checkTodo='checkTodo' :deleteTodo="deleteTodo"/>
        </ul>
    </div>
</template>

<script>
import MyItem from './MyItem.vue'
export default {
    name:'List',
    components: { MyItem },
    props:['todos','checkTodo','deleteTodo']
}
</script>

<style scoped>
    .tasklist{
        padding: 0;
    }
</style>
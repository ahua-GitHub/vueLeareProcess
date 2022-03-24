<template>
    <li class="taskItem">
        <label>
            <!--  :checked初始选中  @change绑定change事件，获得当前input的todo.id -->
            <input type="checkbox" :checked="todo.completed" @change="handleCheck(todo.id)" >
            <!-- v-model也能实现功能，但是不建议使用，会修改props传递过来的值 -->
            <!-- <input type="checkbox" v-model="todo.completed"> -->
            <span>{{todo.title}}</span>
        </label>
        <button class="deleteItemBtn" @click="deleteItem(todo.id)" >删除</button>
    </li>

</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name:'Item',
    // 拿到List组件传递过来的数据
    props:['todo'],
    methods: {
        //勾选或者取消勾选
        handleCheck(id){
            // 勾选时触发自定义事件并给App传选中的id
            this.$bus.$emit('ahuaAdd',id)
        },
        // 通知app删除对应todo对象
        deleteItem(id){
            if(confirm('确认删除吗？')){
                pubsub.publish('ahuaDelete',id)
            }
        }
    }
}
</script>

<style>
    .taskItem{
        width: 100%;
        border: 1px solid grey;
        border-radius: 5px;
        height: 30px;
        list-style: none;
        padding: 6px 0px 0px;
    }
    .taskItem:hover{
        background-color: #ddd;
    }
    .deleteItemBtn{
        float: right;
        margin-right: 20px;
        display: none;
    }
    .taskItem:hover .deleteItemBtn{
        display: block;
    }
</style>
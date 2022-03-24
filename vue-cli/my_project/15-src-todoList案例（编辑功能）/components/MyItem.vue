<template>
    <li class="taskItem">
        <label>
            <!--  :checked初始选中  @change绑定change事件，获得当前input的todo.id -->
            <input 
            type="checkbox" 
            :checked="todo.completed" 
            @change="handleCheck(todo.id)" >

            <!-- v-model也能实现功能，但是不建议使用，会修改props传递过来的值 -->
            <!-- <input type="checkbox" v-model="todo.completed"> -->
            <span v-show="!todo.isEdit">{{todo.title}}</span>
            <input 
                type="text" 
                v-show="todo.isEdit"  
                :value="todo.title" 
                @blur='handleBlur(todo,$event)'
                ref="inputFocus">
        </label>
        <button class="deleteItemBtn" @click="deleteItem(todo.id)" >删除</button>
        <button v-show="!todo.isEdit" class="editItemBtn" @click="handleEdit(todo)">编辑</button>

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
        },
        // 编辑todo
        handleEdit(todo){
            // 多次编辑时，后续的编辑没必要再重复添加isEdit去覆盖之前添加的值，直接将值改为true即可 
            // 判断todo对象上是否有isEdit属性（es5.1以后禁止直接访问object.prototype上的属性，所以采用下面的写法访问原型上的hasOwnProperty方法）
            if(Object.prototype.hasOwnProperty.call(todo,'isEdit')){
                todo.isEdit = true
                console.log(1)
            }else{
                // 给todo上添加一个isEdit属性，值为true
                this.$set(todo,'isEdit',true)  
            }
            // 这里Vue会先将handleEdit中的代码执行完之后才更新数据，也就是说这时isEdit=false,input为隐藏状态，此时调用focus方法是无效的
            // $nextTick方法会在下一次dom更新结束后执行回调（适用于改变数据后需要根据更新后的新dom进行某些操作）
            this.$nextTick(function(){
                this.$refs.inputFocus.focus()
            })

            // 定时器也能实现，虽然没设置时间，但是执行顺序靠后
            // setTimeout(()=>{
            //     this.$refs.inputFocus.focus()
            // })
        },
        // 失去焦点之后编辑状态切换到显示状态,真正实现修改逻辑
        handleBlur(todo,e){
            todo.isEdit = false
            if(!e.target.value){
                alert('输入不能为空')
            }else{
                todo.title = e.target.value
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
    .taskItem button{
        float: right;
        margin-right: 10px;
        display: none;
    }
    .editItemBtn{
        background-color: blue;
    }
    .taskItem:hover button{
        display: block;
    }
</style>
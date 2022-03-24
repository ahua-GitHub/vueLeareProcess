<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 定义一个插槽，等待组件的使用者进行填充 :foods="foods"实现将foods数据传给插槽的使用者-->
        <slot :foods="foods" msg="消息"> </slot>
    </div>
</template>

<script>
export default {
    name:'category',
    props:['title'],
    data() {
        return { 
            foods:['火锅','饺子','包子','西红柿']
        }
    },
}
</script>

<style scoped>
.category{
    background-color:aquamarine;
    width: 200px;
    height: 300px;
}
.category h3{
    text-align: center;
    background-color:burlywood;
}
.category ul{
    width: 100%;
}

.category img{
    width: 100%;
    height: 150px;
}
.category video{
    width: 100%;
    height: 150px;
}
</style>>


<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 定义一个插槽，等待组件的使用者进行填充 -->
        <slot name="center">使用者没有填充内容时显示文字说明1</slot>
        <slot name="footer">使用者没有填充内容时显示文字说明2</slot>
    </div>
</template>

<script>
export default {
    name:'category',
    props:['listData','title']
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
.category li{
    list-style: none;
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


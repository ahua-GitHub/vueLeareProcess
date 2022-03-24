<template>
    <div class="singer">
        <h1>{{message}}</h1>
        <h2>歌手名称:{{name}}</h2>
        <h2>代表作:{{sing}}</h2>
        <button @click="sendSingerName">把歌手name传给App</button>
  </div>
</template>

<script>
export default {

    data() {
        return {
            message:'我是歌手',
            name:'薛之谦',
            sing:'天外来物'
        }
    },
    methods: {
        sendSingerName(){
            // 自定义事件绑定在了组件实例对象上面，this就是组件实例对象，借助$emit方法触发自定义事件
            // 触发singer组件实例对象身上的ahua事件
            this.$emit('ahua',this.name)
        }
    },
}
</script>

<style>
    .singer{
        background-color:coral;
        padding: 10px;
    }
</style>template>
<template>
    <button @click="test">测试自定义事件</button>
</template>

<script>

export default {
    name:'demo',
    emits:['hello'],
    setup(props,context) {

        function test(){
            context.emit('hello','牛啊')
        }
        return {
            test
        }
    }

}
</script>


<template>
    <ul>
        <li>news001 <input type="text"></li>
        <li>news002 <input type="text"></li>
        <li>news003 <input type="text"></li>
    </ul>
</template>

<script>
export default {
    name:'News',
    // beforeDestroy() {
    //     console.log('News被销毁了')
    // },
    activated() {
        console.log('News组件被激活了')
    },
    deactivated() {
        console.log('News组件失活了')
    },
}
</script>



<style>

</style>
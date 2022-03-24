<template>
    <div>
        <button @click = "isShow = !isShow">显示/隐藏</button>
        <transition 
            name="animate__animated animate__bounce"
            enter-active-class="animate__swing"
            leave-active-class="animate__backOutUp">
            <h1 v-show="isShow">第三方样式</h1>
        </transition>      
    </div>  
</template>

<script>
// 引入样式写法
import 'animate.css'
export default {
    name:'VueTransition',
    data() {
        return {
            isShow:true
        }
    }
}
</script>

<style  scoped>
    h1{
        background-color: aqua;
    }
</style>>


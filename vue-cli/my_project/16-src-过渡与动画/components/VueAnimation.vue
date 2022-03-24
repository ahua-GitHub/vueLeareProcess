<template>
    <div>
        <button @click = "isShow = !isShow">显示/隐藏</button>
        <!-- 将需要实现动画的内容用transition标签包裹起来 -->
        <!-- appear属性可以实现刷新后立马展示动画 -->
        <transition appear>
            <h1 v-show="isShow" >你好!阿花</h1>
        </transition>

        <!-- 有多个动画时，可以为每一个过度动画还可以取名字,这时样式中就不能使用默认的v-leave-active了，需要使用ahua-leave-active -->
        <!-- <transition name='ahua'>
            <h1 v-show="isShow" >你好!阿花</h1>
        </transition>         -->
    </div>
</template>

<script>
export default {
    name:'VueAnimation',
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
    /* Vue中定义进出动画，类名规定进使用v-enter-active 出使用v-leave-active */
    .v-enter-active{
        animation: slideAnimation 2s;
    }
    .v-leave-active{
        animation: slideAnimation 2s reverse;
    }

    /* 给transition设置name后样式类名写法 */
    /* .ahua-enter-active{
        animation: slideAnimation 2s;
    }
    .ahua-leave-active{
        animation: slideAnimation 2s reverse;
    } */


    
    @keyframes slideAnimation {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0);
        }
    }
</style>>


<template>
    <div>
        <button @click = "isShow = !isShow">显示/隐藏</button>
        <!-- 将需要实现动画的内容用transition标签包裹起来 -->
        <!-- appear属性可以实现刷新后立马展示动画 -->

        <!--有多个元素具有相同过渡效果时使用group属性,需要为每个子元素设置key值 -->
        <transition-group name='ahua'>
            <h1 v-show=" isShow"  key="1">我是效果1</h1>
            <h1 v-show=" !isShow"  key="2">我是效果2</h1>
        </transition-group>        
    </div>
</template>

<script>
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
    /* 一个动画执行的过程中Vue一共增加了6个样式的类名 */

    /* 进入的起点、离开的终点 */
    .ahua-enter,.ahua-leave-to{
        transform: translateX(-100%);
    }
    /*进入的终点、离开的起点  */
    .ahua-enter-to,.ahua-leave{
        /* 这行代码也可以直接写在实现动画的元素上（h1） */
        transform: translateX(0);
    }
    /* 进入的过程、离开的过程*/
    .ahua-enter-active,.ahua-leave-active{
        transition: 2s;
    }




</style>>


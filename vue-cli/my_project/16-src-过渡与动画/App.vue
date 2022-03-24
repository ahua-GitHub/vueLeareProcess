<template>
    <div>
        <VueAnimation/>
        <VueTransition/>
        <VueTransitions/>
        <AnimateCss/>
    </div>
</template>

<script>
import AnimateCss from './components/animate-css.vue'
import VueAnimation from './components/VueAnimation.vue'
import VueTransition from './components/VueTransition.vue'
import VueTransitions from './components/VueTransitions.vue'
export default {
    name:'App',
    components:{
        VueAnimation,
        VueTransition,
        VueTransitions,
        AnimateCss
    }
}
</script>
<style>

</style>


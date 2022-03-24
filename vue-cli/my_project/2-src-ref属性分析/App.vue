<template>
  <div>
      <h1 v-text="hello" ref="Dom"></h1>
      <button @click="showDOM">点我显示dom</button>
      <band ref="band"/>
  </div>
</template>

<script>
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band
    },
    data() {
        return {
            hello:'你好，阿花'
        }
    },
    methods: {
        showDOM(){
            // 获取真实dom元素
            console.log(this.$refs.Dom)
            // 获取band组件的实例对象
            console.log(this.$refs.band)
        }
    },
}
</script>

<style>

</style>
<template>
  <div class="box">
      <h2>{{message}}</h2>
      <band/>
      <team/>

  </div>
</template>

<script>
import team from './components/team.vue'
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band,team
    },
    data() {
        return {
            message:'你好世界',
        }
    }
}
</script>

<style scoped>
.box{
    background-color:gray;
    padding: 5px;
}
</style>


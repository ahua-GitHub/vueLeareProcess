<template>
  <div>
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
        band,team,
    }
}
</script>



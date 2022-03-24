<template>
  <div>
      <band/>
      <team/>
  </div>
</template>

<script>
import band from './components/band.vue'
import team from './components/team.vue'
export default {
    name:'App',
    components:{
        band,
        team
    }
}
</script>

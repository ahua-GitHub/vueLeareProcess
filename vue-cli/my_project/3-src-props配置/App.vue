<template>
  <div>
      <band bandName='康姆士' :singerNum='4'/>
      <band bandName='回春丹' :singerNum='3'/>
  </div>
</template>

<script>
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band
    }
}
</script>

<template>
    <div>
        <count/> 
        <hr/>
        <person/>
    </div>
</template>

<script> 
import Count from './components/count.vue'
import Person from './components/person.vue'
export default {
    name:'App',
    components:{
        Count,
        Person
    }

}
</script>
<style >


</style>


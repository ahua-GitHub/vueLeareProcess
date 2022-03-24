<template>
    <div class="container">
        <search/>
        <showList/>
    </div>
</template>

<script>
import search from './components/search.vue'
import showList from './components/showList.vue'
export default {
    name:'App',
    data() {
        return { 
            
        }
    },
    components:{
        search,
        showList
    }
}
</script>
<style>


</style>


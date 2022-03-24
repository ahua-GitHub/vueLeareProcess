<template>
    <div class="categorys">
        <category title="美食" >
            <img src="../public/img/1.jpg" alt="">
        </category>
        <category title="电影" >
            <ul>
                <li v-for="(m,index) in moves" :key="index">{{m}}</li>
            </ul>
        </category>
        <category title="车">
            <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
        </category>
    </div>
</template>

<script>
import category from './components/category.vue'
export default {
    name:'App',
    data() {
        return { 
            foods:['火锅','饺子','包子','西红柿'],
            moves:['海贼王','一人之下','魁拔','琅琊榜'],
            cats:['大众','奥迪','宝马','Toyota']
        }
    },
    components:{
        category
    }
}
</script>
<style >
.categorys{
    display: flex;
    justify-content:space-around;
}

</style>


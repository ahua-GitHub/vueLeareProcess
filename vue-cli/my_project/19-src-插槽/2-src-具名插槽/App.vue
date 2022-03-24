<template>
    <div class="categorys">
        <category title="美食" >
            <img slot="center" src="../public/img/1.jpg" alt="">
            <h3 slot="footer">更多美食</h3>
        </category>
        <category title="电影" >
            <ul slot="center">
                <li v-for="(m,index) in moves" :key="index">{{m}}</li>
            </ul>
            <div class="foot" slot="footer">
                <a  href="http://www.baidu.com">电视剧</a>
                <a  href="http://www.baidu.com">动漫</a>
            </div> 
        </category>
        <category title="车">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <template v-slot:footer>
                <div>
                    <a href="http://www.baidu.com">大车</a>
                    <a href="http://www.baidu.com">小车车</a>
                </div>
                <h3>更多推荐</h3>
            </template>
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
.categorys,.foot{
    display: flex;
    justify-content:space-around;
}

</style>


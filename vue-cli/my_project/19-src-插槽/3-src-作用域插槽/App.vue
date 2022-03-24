<template>
    <div class="categorys">
        <category title="美食" >
            <!-- scope属性拿到定义插槽的组件传递过来的数据,scope属性值不需要和插槽定义的名字相同 -->
            <!-- 旧api scope="receive"  新api slot-scope="receive"-->
            <template scope="receive">
                <ul>
                    <li v-for="(f,index) in receive.foods" :key="index">{{f}}</li>
                </ul>
                <!-- {{receive}} -->
            </template>

        </category>
 
    </div>
</template>

<script> 
import category from './components/category.vue'
export default {
    name:'App',
    components:{
        category
    },

}
</script>
<style >
.categorys,.foot{
    display: flex;
    justify-content:space-around;
}

</style>


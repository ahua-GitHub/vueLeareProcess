<template>
    <div class="count">
        <h2>当前求和为:{{sum}}</h2>
        <h2>当前值放大十倍得:{{bigSum}}</h2>
        <h2>我喜欢的{{type}}是:{{band}}</h2>
        <h2>下面数组总人数是{{persons.length}}</h2>
        <!--将收到的数据强制转换为number -->
        <select v-model.number="n">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
        </select>
        <button @click="increment(n)">+</button>
        <button @click="decrement(n)">-</button>
        <button @click="incrementOdd(n)">当前为奇数再加</button>
        <button @click="incrementWait(n)">等一秒再加</button>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'count',
    data() {
        return {
            n:1,//用户当前选择的数字
        }
    },
    computed:{
        // 不开启nameSpaced写法,在模板中需要从countAbout.sum读取数据
        // ...mapState({countAbout:'countAbout',personAbout:'personAbout'}),

        // nameSpaced写法
        ...mapState('countAbout',['sum','band','type']),
        ...mapState('personAbout',['persons']),
        ...mapGetters('countAbout',{bigSum:'bigSum'})
    },
    methods: {
        ...mapActions('countAbout',{incrementOdd:'incrementOdd',incrementWait:'incrementWait'}),
        ...mapMutations('countAbout',{increment:'increment',decrement:'decrement'}),
    },
   
}
</script>

<style scoped>

</style>>


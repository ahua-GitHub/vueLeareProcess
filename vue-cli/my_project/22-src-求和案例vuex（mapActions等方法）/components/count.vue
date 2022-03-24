<template>
    <div class="count">
        <h2>当前求和为:{{sum}}</h2>
        <h2>当前值放大十倍得:{{bigSum}}</h2>
        <h2>我喜欢的{{type}}是{{band}}</h2>
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
// 引入mapState,mapGetters,mapMutations,mapActions
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'count',
    data() {
        return {
            n:1,//用户当前选择的数字
        }
    },
    computed:{

        // 2、借助mapState生成计算属性，从state中读取数据（对象写法 key用于生成computed中的函数名，value相当于state中的数据）
        // 2、借助mapGetters生成计算属性，从getters中读取数据（对象写法 key用于生成computed中的函数名，value相当于getters中的数据）
        ...mapState({sum:'sum',band:'band',type:'type'}),
        ...mapGetters({bigSum:'bigSum'})

        // 3、借助mapState生成计算属性，从state中读取数据 （数组写法 相当于在computed中生成和state中数据同名的函数）
        // 3、借助mapGetters生成计算属性，从getters中读取数据 （数组写法 相当于在computed中生成和getters中数据同名的函数）
        // ...mapState(['sum','band','type']),
        // ...mapGetters(['bigSum'])


    },
    methods: {

        // 2、通过mapMatations生成对应的方法去调用commit去联系mutations  但是在调用increment和decrement方法时需要将操作的数据作为参数传进去（对象写法）
        // 当没有业务逻辑时，可以直接联系mutations操作state中的数据
        ...mapMutations({increment:'increment',decrement:'decrement'}),
        // 2、通过mapMatations生成对应的方法去调用commit去联系mutations  但是在调用increment和decrement方法时需要将操作的数据作为参数传进去（数组写法）
        // ...mapMutations(['increment','decrement']),

       
       // 3、通过mapActions生成对应的方法去调用dispath去联系actions  但是在调用incrementOdd和incrementWait方法时需要将操作的数据作为参数传进去（对象写法）
       // 这里将判断和定时器的逻辑写在了actions中
       ...mapActions({incrementOdd:'incrementOdd',incrementWait:'incrementWait'}),
       
        // 3、通过mapActions生成对应的方法去调用dispath去联系actions  但是在调用incrementOdd和incrementWait方法时需要将操作的数据作为参数传进去（数组写法）
        // ...mapActions(['incrementOdd','incrementWait'])
    },
   
}
</script>

<style scoped>

</style>>


<template>
    <div class="count">
        <h2>当前求和为:{{sum}}</h2>
        <h2>当前值放大十倍得:{{bigSum}}</h2>
        <h2>我喜欢的{{$store.state.type}}是{{band}}</h2>
        <!--将收到的数据强制转换为number -->
        <select v-model.number="n">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">当前为奇数再加</button>
        <button @click="incrementWait">等一秒再加</button>
    </div>
</template>

<script>
export default {
    name:'count',
    data() {
        return {
            n:1,//用户当前选择的数字
        }
    },
    computed:{
        // 通过计算属性自己写模板语法中的数据
        sum(){
            return this.$store.state.sum
        },
        band(){
            return this.$store.state.band
        },
        type(){
            return this.$store.state.type
        },
        bigSum(){
            return this.$store.getters.bigSum
        }
    },
    methods: {
        increment(){
            this.$store.commit('increment',this.n)
        },
        decrement(){
            this.$store.commit('decrement',this.n)            
        },
        incrementOdd(){
            if(this.$store.state.sum%2){
                this.$store.dispatch('incrementOdd',this.n)
            }
        },
        incrementWait(){
            setTimeout(()=>{
                this.$store.dispatch('incrementWait',this.n)
            },1000)
        }
    },
   
}
</script>

<style scoped>

</style>>


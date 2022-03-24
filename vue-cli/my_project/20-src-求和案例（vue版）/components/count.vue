<template>
    <div class="count">
        <h1>当前求和为:{{sum}}</h1>
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
            sum:0,//当前的和
        }
    },
    methods: {
        increment(){
            this.sum += this.n
        },
        decrement(){
            this.sum -= this.n
        },
        incrementOdd(){
            if(this.sum % 2){
                this.sum += this.n
            }
        },
        incrementWait(){
            setTimeout(()=>{
                this.sum += this.n
            },1000)
        }
    },
   
}
</script>

<style scoped>

</style>>


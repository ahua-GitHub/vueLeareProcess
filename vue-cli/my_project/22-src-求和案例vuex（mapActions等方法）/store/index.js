// 用于创建vuex中的核心——store

// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

//准备actions——用于相应组件中的动作
const actions = {
    // 这里传入两个参数context：相当于一个迷你的store  value：组件传递过来的参数
    incrementOdd:function(context,value){
        if(context.state.sum%2){
            console.log('actions中的incrementOdd被调用了')
            context.commit('INCREMENTODD',value)
        }
    },
    incrementWait:function(context,value){
        setTimeout(()=>{
            console.log('actions中的incrementWait被调用了')
            context.commit('INCREMENTWAIT',value)
        },1000)
    },
}

// 准备mutations——用于操作数据（state）
const mutations = {
    // 这里传入两个参数 state：就是下面定义的存储数据的state  value：用户传递过来的数据
    increment:function(state,value){
        console.log('mutations中的increment被调用了')
        state.sum += value
    },
    decrement:function(state,value){
        console.log('mutations中的decrement被调用了')
        state.sum -= value
    },
    INCREMENTODD:function(state,value){
        console.log('mutations中的INCREMENTODD被调用了')
        state.sum += value 
    },
    INCREMENTWAIT:function(state,value){
        console.log('mutations中的INCREMENTWAIT被调用了')
        state.sum += value 
    },
}

// 准备state——用于存储数据
const state = {
    // 当前的和
    sum:1,
    type:'乐队',
    band:'回春丹'

}

// 准备getter——用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.sum*10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions, 
    mutations,
    state,
    getters
})
// 用于创建vuex中的核心——store

// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

import axios from 'axios'

import {nanoid} from 'nanoid'

// 求和相关配置
const countOptions = {
    // 命名空间设置为true，暴露的countAbout，personAbout才能被mapState中识别
    namespaced: true,
    actions:{
        incrementOdd:function(context,value){
            if(context.state.sum%2){
                console.log('action中的incrementOdd被调用了')
                context.commit('INCREMENTODD',value)
            }
    
        },
        incrementWait:function(context,value){
            setTimeout(() => {
                console.log('action中的incrementWait被调用了')
                context.commit('INCREMENTWAIT',value)
            }, 1000);
        }
    },
    mutations:{
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
    },
    state:{
        sum:1,
        type:'乐队',
        band:'回春丹',
    },
    getters:{
        // 在配置中拿到的state是配置中的state不是总的state
        bigSum(state){
            return state.sum*10
        }
    }
}
const personOptions = {
    namespaced: true,
    actions:{
        addPersonA(context,value){
            if(value.name.indexOf('阿')===0){
                context.commit('ADDPerson',value)
            }else{
                alert('添加的人必须姓阿')
            }
        },
        addTextFromServer(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response =>{
                    context.commit('ADDPerson',{id:nanoid(),name:response.data})
                },
                error =>{
                    alert(error.message)
                }
            )
        }
    },
    mutations:{
        ADDPerson:function(state,value){
            console.log('mutations中的ADDNAME被调用了')
            state.persons.unshift(value)
        }
    },
    state:{
        persons:[
            {id:'001',name:'阿花'}
        ]
    },
    getters:{
        firstPersonName(state){
            return state.persons[0].name
        }
    }
}







// 创建并暴露store
export default new Vuex.Store({
    modules:{
        personAbout:personOptions,
        countAbout:countOptions
    }
})
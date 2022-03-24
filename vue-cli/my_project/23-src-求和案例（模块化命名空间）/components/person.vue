<template>
    <div>
        <h3>人员列表</h3>
        <h3>列表中第一个人的名字是:{{firstPersonName}}</h3>
        <h3>上方组件的求和为{{sum}}</h3>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="ADDPerson">添加</button>
        <button @click="addPersonA">添加一个姓阿的人</button>
        <button @click="addTextFromServer">从服务器中添加一句话</button>
        <ul>
            <li v-for="p in persons" :key="p.id">{{p.name}}</li>
        </ul>
    </div>
  
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'person',
    data() {
        return {
            name:''
        }
    },
    computed:{
        persons(){
            return this.$store.state.personAbout.persons
        },
        sum(){
            return this.$store.state.countAbout.sum
        },
        firstPersonName(){
            return this.$store.getters['personAbout/firstPersonName']
        }
    },
    methods: {
        ADDPerson(){
            const personObj = {id:nanoid(),name:this.name}
            this.name = ''
            // 调用personAbout配置中的ADDNAME方法
            this.$store.commit('personAbout/ADDPerson',personObj)
        },
        addPersonA(){
            const personObj = {id:nanoid(),name:this.name}
            this.name = ''
            // 调用personAbout配置中的ADDNAME方法
            this.$store.dispatch('personAbout/addPersonA',personObj)
        },
        addTextFromServer(){
            this.$store.dispatch('personAbout/addTextFromServer')
        }
    },
}
</script>

<style>

</style>
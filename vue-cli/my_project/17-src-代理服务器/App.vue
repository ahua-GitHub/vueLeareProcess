<template>
    <div id="app">
        <button @click="getSource">获取学生信息</button>
    </div>
</template>

<script>
    import axios from 'axios'

export default {
    name:'App',
    data() {
        return { 
            
        }
    },
    methods: {
        getSource(){
            axios.get('http://localhost:8080/students').then(
                response =>{
                    console.log('请求成功',response.data)
                },
                error =>{
                    alert('请求失败',error.message)
                }
            )
        }
    },
}
</script>
<style>


</style>


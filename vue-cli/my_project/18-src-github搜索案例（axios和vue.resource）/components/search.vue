<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyWord"/>&nbsp;
            <button @click="getUserInfo">Search</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name:'search',
    data(){
        return{
            keyWord:''
        }
    },
    methods: {
        getUserInfo(){
            // 请求前更新List数据（是否第一次展示、是否加载）,传递多个参数时可以放在对象中
            this.$bus.$emit('updateUsers',{users:[],isFirstShow:false,isLoading:true,errMsg:'' })
            // 使用vue-resource发送ajax请求只需要将axios换成this.$http，然后在main.js中将引入的插件打开即可
            axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                response =>{
                    console.log('请求成功',response.data.items)
                // 请求成功后更新List数据（用户数据、是否展示欢迎、是否正在加载）
                    this.$bus.$emit('updateUsers',{users:response.data.items,isLoading:false,errMsg:'' })
                },
                // 请求出错后更新List数据（错误信息、用户信息）
                error => {
                    this.$bus.$emit('updateUsers',{users:[],isLoading:false,errMsg:error.message})
                }
            )
            
        }
    },
}
</script>

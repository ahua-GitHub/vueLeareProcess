<template  >
    <div class="row" >
        <!-- 展示用户列表  当没有用户时不展示-->
        <div v-show="info.users.length" class="card" v-for="userInfo in info.users" :key="userInfo.id">
            <a :href="userInfo.html_url" target="_blank">
            <img :src="userInfo.avatar_url" style='width: 100px'/>
            </a>
            <p class="card-text">{{userInfo.login}}</p>
        </div>
        <!-- 展示欢迎词 -->
        <h1 v-show="info.isFirstShow">欢迎使用gitHub</h1>
        <!-- 加载中 -->
        <h1 v-show="info.isLoading">加载中。。。</h1>
        <!-- 展示错误信息 -->
        <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
    </div>
</template>

<script>
export default {
    name:'showList',
    data(){
        return{
            info:{
                users:[],
                // 是否第一次展示
                isFirstShow:true,
                // 是否正在加载
                isLoading:false,
                // 错误信息
                errMsg:''   
            }
        }
    },
    methods: {
        updateUsers(userObj){
            this.info = {...this.info,...userObj} 
        },
    },
    mounted() {
        this.$bus.$on('updateUsers',this.updateUsers)
    },
}
</script>

<style  scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>
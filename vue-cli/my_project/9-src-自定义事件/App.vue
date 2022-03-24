<template>
  <div class="box">
      <h2>{{message}} 乐队名是：{{bandName}}</h2>
    <!-- 通过父组件给子组件传递函数类型的props实现子给父传递数据 -->
      <band :getBandName='getBandName' />

      <!-- 通过父组件给子组件绑定一个自定义事件实现子给父传递数据 v-on-->
      <!-- 给谁绑定的事件，就通过谁去触发事件 -->
      <!-- 在team组件实例对象上绑定了一个自定义事件ahua，如果有人触发了这个事件，demo函数就会被调用  -->
      <team v-on:ahua='getTeamName' />
      <!-- 只触发一次 --> -->
     <!-- <team v-on:ahua.once='getTeamName' /> -->

      <!-- 通过父组件给子组件绑定一个自定义事件实现子给父传递数据  ref-->
      <!-- ref这种挂载方法比自定义事件灵活性更强 -->
      <!-- 组件绑定原生dom事件需要加native修饰 -->
      <singer ref="singer" @click.native="show" />

  </div>
</template>

<script>
import team from './components/team.vue'
import band from './components/band.vue'
import singer from './components/singer.vue'
export default {
    name:'App',
    components:{
        band,team,singer
    },
    data() {
        return {
            message:'你好世界',
            bandName:''
        }
    },
    methods: {
        getBandName(name){
            console.log(name)
            this.bandName = name
        },
        getTeamName(name){
            console.log(name)
            this.bandName = name 
        },
        getSingerName(name){
            console.log(name)
        }
    },
    mounted() {
        // 初始状态singer实例上并没有挂载ahua事件，而是当挂载完毕后再使用mounted钩子去绑定事件
        setTimeout(()=>{
            // 当ahua事件被触发的时候执行回调getSingerName
            // 拿到组件实例对象在上面绑定自定义事件ahua，回调是getSingerName
            this.$refs.singer.$on('ahua',this.getSingerName)

            // 只绑定一次
            // this.$refs.singer.$once('ahua',this.getSingerName)
        },3000)
    },
}
</script>

<style scoped>
.box{
    background-color:gray;
    padding: 5px;
}
</style>


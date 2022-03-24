<template>
  <div class="team">
      <h1>{{message}}</h1>
      <h2>组合名称:{{name}}</h2>
      <h2>组合人数:{{singerNum}}</h2>    
      <button @click="sendTeamName">把队伍name传给App</button>
      <button @click="unbind">解除绑定 </button>
      <button @click="death">销毁实例 </button>

  </div>
</template>

<script>
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个组合',
            name:'四驱兄弟',
            singerNum:2
        }
    },
    methods: {
        sendTeamName(){
            // 因为是给team组件的实例对象上绑定的自定义事件，所以通过组件实例对象上的$emit方法去触发
            // 触发Team组件实例身上的ahua事件
            this.$emit('ahua',this.name)
        },
        unbind(){
            // 只使用于解绑一个自定义事件
            this.$off('ahua')
             
            // 解绑多个
            // this.$off(['ahua','ahua1','ahua2'])

            // 解绑全部
            // this.$off()
        },
        death(){
            // 销毁当前组件实例，该实例上的所有自定义事件都失效,但是原生的事件不受影响
            this.$destroy()
        }
    },
}
</script>
<style scoped>
.team{
    background-color: cadetblue;
    padding: 10px;
}
</style>
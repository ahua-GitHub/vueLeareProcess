<template>
  <h2>我叫{{name}}</h2>
  <h2>今年{{age}}岁了</h2>
  <button @click="changeInfo" >换名字</button>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'App',
  data() {
    return {
      msg:'cording'
    }
  },
  setup() {
     let name = ref('阿花')
     let age = ref(16)

    function changeInfo(){
      name.value = 'ahua'
      age.value = 18
    }

    return{
      name,
      age,
      changeInfo,
    }

    // 返回一个渲染函数，会替换掉模板中所有的内容
    // return ()=>h('h2','新年快乐')
  }
}

</script>


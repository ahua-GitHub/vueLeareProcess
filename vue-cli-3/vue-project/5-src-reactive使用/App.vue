<template>
  <h2>我叫{{person.name}}</h2>
  <h2>今年{{person.age}}岁了</h2>
  <h2>工作:{{person.job.type}}</h2>
  <h2>薪水:{{person.job.selery}}</h2>
  <h2>爱好:{{person.hobby}}</h2>
  <button @click="changeInfo" >切换 </button>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
  name: 'App',
  setup() {

    let person =  reactive(
      {
        name:'阿花',
        age : 16,
        job : {
          type:'前端工程师',
          selery:'30k'
        },
        hobby:['抽烟','喝酒','烫头']

      }
      
    )

    function changeInfo(){
      person.job.type = 'c++工程师'
      person.job.selery = '40k'
      person.hobby[0] = '学习'
    }

    return{
      person,
      changeInfo,
    }
  }
}

</script>


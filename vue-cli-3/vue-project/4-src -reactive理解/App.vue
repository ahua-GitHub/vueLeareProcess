<template>
  <h2>我叫{{name}}</h2>
  <h2>今年{{age}}岁了</h2>
  <h2>工作:{{job.type}}</h2>
  <h2>薪水:{{job.selery}}</h2>
  <h2>爱好:{{hobby}}</h2>
  <button @click="changeInfo" >切换 </button>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
  name: 'App',
  setup() {
     let name = ref('阿花')
     let age = ref(16)
     let job = reactive({
       type:'前端工程师',
       selery:'30k'
     })
     let job2 = ref({
       type:'java工程师',
       selery:'35k'
     })
     let hobby = reactive(['抽烟','喝酒','烫头'])
    function changeInfo(){
      console.log(job)
      console.log(job2)
      job.type = 'c++工程师'
      job.selery = '40k'
      hobby[0] = '学习'
    }

    return{
      name,
      age,
      job,
      job2,
      hobby,
      changeInfo,
    }
  }
}

</script>


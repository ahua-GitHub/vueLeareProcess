<template>
  <h2>我叫{{name}}</h2>
  <h2>今年{{age}}岁了</h2>
  <h2>{{job.type}}</h2>
  <h2>{{job.selery}}</h2>
  <button @click="changeInfo" >切换数据</button>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'App',
  setup() {
     let name = ref('阿花')
     let age = ref(16)
     let job = ref({
       type:'前端工程师',
       selery:'30k'
     })

    function changeInfo(){
      job.value.type = 'java工程师'
      job.value.selery = '35k'
    }

    return{
      name,
      age,
      job,
      changeInfo,
    }
  }
}

</script>


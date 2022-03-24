<template>
  <input type="text" v-model="inputText">
  <h3>{{inputText}}</h3>
</template>

<script>
import { customRef, ref } from 'vue'
export default {
  name: 'App',
  setup() {
    // const inputText = ref('ahua')  使用vue提供的内置的ref

  // 自定义ref
    function myRef(value,delay){
      let timer
      // 返回自定义ref绑定的值
        return customRef((track,trigger)=>{
          // 语法要求，自定义ref的处理逻辑
          return {
            // 读数据
            get(){
              console.log(`有人从myRef中读取数据了`)
              // 追踪数据（inputText）的改变
              // 没有track  set里面的trigger重新解析模板时get不会return新的数据
              track()
              return value
            },
            // 改数据
            set(newValue){
              clearTimeout(timer)
              timer = setTimeout(()=>{
                              console.log('有人在myRef中修改数据了')
              value = newValue
              // 重新解析模板
              trigger()
              },delay)
            }
          }
        })
    }

    //  使用自定义ref
    let inputText = myRef('ahua',1000) 



    return {inputText}
  }

}
</script>


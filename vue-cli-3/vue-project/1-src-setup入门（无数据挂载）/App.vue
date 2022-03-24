<template>
  <h2>我叫{{name}}</h2>
  <h2>今年{{age}}岁了</h2>
  <button @click="sayHello" >说话</button>
  <button @click="testVue2" >测试vue2</button>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg:'cording'
    }
  },
  setup() {
     let name = '阿花',
     age = 16

    function sayHello(){
      alert(`我是${name},今年${age}岁了`)
    }
    function testVue2(){
      consol.log(msg)
    }

    return{
      name,
      age,
      sayHello,
      testVue2
    }

    // 返回一个渲染函数，会替换掉模板中所有的内容
    // return ()=>h('h2','新年快乐')
  }
}

</script>


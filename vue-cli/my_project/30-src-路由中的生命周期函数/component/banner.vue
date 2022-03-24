<template>
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
        <button @click="forward">前进</button>
        <button @click="back">回退</button>
        <button @click="test">测试一下go</button>
      </div>
</template>

<script>
export default {
    name:'banner',
    methods: {
      back(){
        this.$router.back()
      },
      forward(){
        this.$router.forward()
      },
      test(){
          
      }
    },
}
</script>

<style>

</style>
<template>
  <div class="band">
      <h2>乐队:{{band}}</h2>
      <h2>主唱:{{main}}</h2>
  </div>
</template>

<script>
export default {
    name:'Band',
    data() {
        return {
            band:'回春丹',
            main:'刘西蒙'
        }
    },
}
</script>

<style>
.band{
    background-color: aqua;
}
</style>
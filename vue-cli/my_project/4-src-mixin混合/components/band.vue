<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>乐队名称:{{name}}</h2>
      <button @click='showName'>点我显示乐队名字</button>
  </div>
</template>

<script>
import {mixin} from '../mixin'
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个乐队',
            name:'回春丹',
            singerNum:3
        }
    },
    mixins:[mixin]
}
</script>
<template>
  <div class="band">
      <h1>{{message}}</h1>
      <h2>组合名称:{{name}}</h2>
      <button @click='showName'>点我显示组合名字</button>
  </div>
</template>

<script>
import {mixin} from '../mixin'
export default {
    name:'Band',
    data() {
        return {
            message:'我是一个组合',
            name:'四驱兄弟',
            singerNum:3
        }
    },
    mixins:[mixin]
}
</script>
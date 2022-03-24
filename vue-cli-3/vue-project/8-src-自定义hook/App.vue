<template>
  <demo @hello='showMsg' msg='证书'/>
</template>

<script>
import demo from './component/demo.vue'
export default {
  name: 'App',
  components:{demo},
  setup() {
    function showMsg(){
        alert('你触发了自定义事件')
    }
    return {
      showMsg
    }
  }

}
</script>


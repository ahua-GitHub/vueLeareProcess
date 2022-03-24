<template>
    <h2>鼠标位置为 x:{{point.x}} y:{{point.y}}</h2>
</template>

<script>
import savePoine from '../hooks/usePoint'

export default {
    name:'demo',
    setup(){
        let point = savePoine()
        return {point}
    }



}
</script>


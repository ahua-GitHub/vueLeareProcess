import {onMounted, reactive,onBeforeUnmount} from 'vue'

export default function() {

    // 数据
    let point = reactive({
        x:0,
        y:0
    })
    // 方法 
    function savePoint(event){
        point.x = event.pageX
        point.y = event.pageY
        console.log(point.x,point.y)
    }
    // 生命周期钩子
    onMounted(()=>{
        window.addEventListener('click',savePoint)
    })

    onBeforeUnmount(()=>{
        window.removeEventListener('click',savePoint)
    })

    return point
}
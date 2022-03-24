export default {
    // 这里可以接收一个参数vm的缔造者，Vue构造函数会自动调用install
    install(Vue){
        console.log('install被默认调用了')

        // 全局过滤器
        Vue.filter('sliceString',function(value){
            return value.slice(4,7)
        })
        // 定义全局指令
        Vue.directive('fbind',{
            bind(element,binding){
                element.value = binding.value
            },
            inserted(element){
                element.focus()
            },
            update(element,binding) {
                element.value = binding.value
            }
        })
        // 定义混入
        Vue.mixin({
            data() {
                return {
                    x:100,
                    y:99
                }
            },
        })
        // 在Vue原型上添加方法（Vue原型上的方法，Vue实例和组件实例都可以使用）
        Vue.prototype.sayHello = ()=>{
            alert('hello')
        }

    }
}


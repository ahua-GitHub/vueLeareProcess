@[TOC](vue-cli保姆级教程)
## 一、vue-cli基础
### 1.1 vue-cli安装
1. 全局安装：`npm install -g @vue/cli`或者`yarn global add @vue/cli`，局部安装：`npm install @vue/cli`
2. 切换到要创建项目的目录，然后创建项目：`vue create 项目名称`
3. 进入创建的项目中：`cd 项目名称`
4. 启动项目：`npm run serve`
5. 显示被vue默认隐藏的`webpack.config.js`文件 `vue inspect > webpack.config.js`

### 1.2 vue-cli结构分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/e019bbe6a7d24a51baf5862f4c788707.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
1. `.gitignore`：被git版本管制忽略的配置（管理文件是否受git管理）
2. `babel.config.js`：es6转es5时 babel配置的文件
3. `package.json`：符合npm规范都会有的配置文件，应用包配置文件（包的名字、版本，采用的依赖和库，定义的命令等）
4. `package-lock.json`：包版本控制文件
5. `README.md`：对整个工程进行一个说明和描述
6. src文件夹下的`main.js`：项目的入口文件
7. src文件夹下的`app.vue`：对所有组件进行管理
8. public文件夹下的`index.html`：主页面
9. components文件夹：存放组件
10. assets文件夹：项目静态资源(css样式，图片，音频等)

### 1.3 修改配置
1.  查看默认配置文件
		控制台输入`vue inspect > 自定义名.js` 可以<font color="red">**查看**</font>vue脚手架的默认配置
2. 修改默认配置
在项目根目录下创建vue.config.js对脚手架进行个性化<font color="red">**配置**</font>（[https://cli.vuejs.org/zh/guide/webpack.html](https://cli.vuejs.org/zh/guide/webpack.html)），vue会将这里自定义的配置和webpack中已有的配置进行合并
![在这里插入图片描述](https://img-blog.csdnimg.cn/809d6ad00d5743fca947340a5641c6bb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)


3. `node_moudle->vue->dist`下的`vue.js`和`vue.runtime.xxx.js`区别
		
		1. vue.js是完整版的vue，包含vue核心功能和模板解析器
		2. vue.runtime.xxx.js是运行版的只包含核心功能
		3. 因为vue.runtime.xxx.js没用模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定内容
		4. main.js中import Vue from 'vue'引入的默认是vue.runtime.common.js，在node_moudle->vue->package.json中可以查看
### 1.4 打包部署
1. 本地运行代码在终端输入`npm run serve`打开本地的8080端口即可，但是上线需要放在服务器上，本地写的`.vue`文件浏览器是不能识别的，需要对项目进行打包，生成纯粹的`html、css、js`文件。
2. 打包
 `npm run build`后会生成一个dist文件夹，项目里的代码全部转化成纯粹的`html、css、js`文件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/88a433fb5ecd4f479d0d066b64bab8fd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
3. 部署

一般将前端的静态资源放在static文件夹中，然后在服务器中指定静态资源位置，启动服务器即可

```javascript
const koa = require('koa')
const koaStatic = require('koa-static')

const app = new koa()
app.use(koaStatic('../static/'))

app.listen(8089, () => {
    console.log('静态服务器启动成功~')
})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ffaac468575548e5b63805d0f739885d.png)


### 二、属性和配置
#### 2.1 ref属性
1. 被用来给元素或者子组件注册引用信息（id的替代者）
2. 应用在html标签上是获取的真实Dom元素，应用在组件标签上是组件实例对象
3. 使用方法 `<div ref="xxx">...<div/>或者<band ref="xxx"/>`
4. 获取方法`this.$refs.xxx`，可以拿到组件实例对象
```javascript
<template>
  <div>
      <h1 v-text="hello" ref="Dom"></h1>
      <button @click="showDOM">点我显示dom</button>
      <band ref="band"/>
  </div>
</template>

<script>
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band
    },
    data() {
        return {
            hello:'你好，阿花'
        }
    },
    methods: {
        showDOM(){
            // 获取真实dom元素
            console.log(this.$refs.Dom)
            // 获取band组件的实例对象
            console.log(this.$refs.band)
        }
    },
}
</script>
```
#### 2.2 props
让组件接收外部传来的数据

1. 传递数据： `<band name='xxx' :age='xx'/>`
				属性前面加上"`:`"为v-bind绑定，引号内的内容会被认为是表达式，传入的Number型数据仍然会保持原Number数据类型
2. 接收数据

				1. 只接受，不限制 props:[name:'xxx',age:'xx']
				2. 限制参数类型 
						prors:{
								name:String,
								age:Number
								} 
				3. 限制类型，必要性，指定默认值
						props:{
									name:{
										type:String, //name的类型
										required:true, //name值是必须的
									},
									age:{
										type:Number,	
										default:99 //默认值为99
										}
								}
3. props是只读的
	
		1. vue底层会监测对props的修改，如果进行了修改，就会发出警告
		2. 修改可以通过复制到props中的内容到data中一份（组件中显示data中的数据），然后去修改data中的数据。
		3. props监测程度比较浅，监测对象类型时，当修改对象中某个属性改，prop监测不到，所以v-model不能绑定props传递过来的值，v-model会动态修改数据
4. props适用于
（1） 父组件==>子组件 通信

```javascript
//父组件中传递数据
<template>
  <div>
      <band bandName='康姆士' :singerNum='4'/>
      <band bandName='回春丹' :singerNum='3'/>
  </div>
</template>
<script>
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band
    }
}
</script>

//子组件中接收数据
<template>
  <div class="band">
      <h2>乐队名称:{{bandName}}</h2>
      <h2>乐队人数:{{singerNum}}</h2>
  </div>
</template>
<script>
export default {
    name:'Band',
    props:{
        bandName:String,
        singerNum:Number
    }
}
</script>
```
（2）子组件==>父组件 通信 （要求父组件先给子组件传递一个函数）

```javascript
//在父组件设置props属性，为子组件传递一个函数
<template>
  <div class="box">
      <h2>乐队名是：{{bandName}}</h2>
    // 通过父组件给子组件传递函数类型的props实现子给父传递数据 
      <band :getBandName='getBandName' />
  </div>
</template>

<script>
import band from './components/band.vue'
export default {
    name:'App',
    components:{
        band
    },
    data() {
        return {
            bandName:''
        }
    },
    methods: {
        getBandName(name){
            console.log(name)
            this.bandName = name
        }
    }
}
</script>

// 子组件将数据作为函数参数传给父组件
<template>
  <div class="band">
    <h2>乐队名称:{{name }}</h2>
    <h2>乐队人数:{{singerNum}}</h2>
    <button @click="sendBandName">把乐队name传给App</button>
  </div>
</template>
<script>
export default {
    name:'Band',
    props:['getBandName'],
    data() {
        return {,
            name:'回春丹',
            singerNum:3
        }
    },
    methods: {
        sendBandName(){
            this.getBandName(this.name)
        }
    },
}
</script>

```

#### 2.3 mixin(混入)

		功能：将多个组件的共用的配置提取成一个混入的对象
		使用方式：
				定义混合
					export const mixin = {
							data(){....},
							methods(){....}
							.......
					}
				使用混合：
					(1)全局混入：Vue.mixin(xxx)
					(2)局部混入：mixin:['xxx'] 
#### 2.4 插件
1. 用于增强Vue，本质上是一个包含install方法的对象，vue会自己进行调用
2. install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
3. 定义插件	
```javascript

export default{
//vue会调用这个install
	install(Vue,options) {
			//1.定义全局过滤器
			Vue.filter(...)
			
			//2.添加全局指令
			Vue.directive(...)
			
			//3.配置全局混入
			Vue.mixin(...)

			//4.添加实例方法
			Vue.prototype.$myMethod = funcation(){...}
			Vue.prototype.$myProperty = xxx
	}
}
```
#### 2.5 局部样式
`scoped`可以让组件中的样式只在局部生效（当前组件中生效），防止多组件间类名重复导致样式冲突

```javascript
<style scoped>
    .test{
        color: red;
    }
</style>
```


### 三、组件间通信
#### 3.1 props属性
见上文
#### 3.2  组件间的自定义事件
1. 一种组件间的通信方式：适用于`子组件==>父组件`
2. 子组件想给父组件传递数据，就需要在父组件中给子组件绑定自定义事件，回调写在父组件中
3. 绑定自定义事件

(1）第一种方式： 直接在组件上绑定自定义事件，通过`$emit`去触发（不能控制自定义事件的时机，模板解析完毕时自定义事件便绑定到了组件实例对象上）

在子组件中通过组件实例对象上的emit去触发绑定的自定义事件
```javascript
<template>
  <div class="team">
      <h2>组合名称:{{name}}</h2>
      <h2>组合人数:{{singerNum}}</h2>    
      <button @click="sendTeamName">把队伍name传给App</button>
      <button @click="unbind">解除绑定 </button>
      <button @click="death">销毁实例 </button>
  </div>
</template>

......

 data() {
     return {
         name:'四驱兄弟',
         singerNum:2
     }
 },
methods: {
    methods: {
        sendTeamName(){
            // 因为是给team组件的实例对象上绑定的自定义事件，所以通过组件实例对象上的$emit方法去触发
            // 触发Team组件实例身上的ahua事件
            this.$emit('ahua',this.name)
        },
        unbind(){
            // 只使用于解绑一个自定义事件
            this.$off('ahua')
             
            // 解绑多个
            // this.$off(['ahua','ahua1','ahua2'])

            // 解绑全部
            // this.$off()
        },
        death(){
            // 销毁当前组件实例，该实例上的所有自定义事件都失效,但是原生的事件不受影响
            this.$destroy()
        }
    },
}
```
 在父组件中写绑定的自定义事件
```javascript
      //通过父组件给子组件绑定一个自定义事件实现子给父传递数据 v-on
      //给谁绑定的事件，就通过谁去触发事件 
     //在team组件实例对象上绑定了一个自定义事件ahua，如果有人触发了这个事件，demo函数就会被调用  
     <team v-on:ahua='getTeamName' />
      //只触发一次 -->
     //<team v-on:ahua.once='getTeamName' />
.....
    data() {
        return {
            bandName:''
        }
    },
    methods: {
        getBandName(name){
            console.log(name)
            this.bandName = name
        },
    },
```
(2）第二种方式： 通过`$refs`获取组件实例对象，然后在组件实例对象上绑定自定义事件（可以控制绑定自定义事件的时机）

在父组件中将组件实例对象挂载到`ref`上
```javascript
<template>
  <div class="box">
      <h2>乐队名是：{{bandName}}</h2>
      <!-- ref这种挂载方法比自定义事件灵活性更强 -->
      <!-- 组件绑定原生dom事件需要加native修饰 -->
      <singer ref="singer" @click.native="show" />

  </div>
</template>

<script>
import singer from './components/singer.vue'
export default {
    name:'App',
    components:{
    	singer
    },
    data() {
        return {
            bandName:''
        }
    },
    methods: {
        getSingerName(name){
            console.log(name)
        }
    },
    mounted() {
        // 初始状态singer实例上并没有挂载ahua事件，而是当挂载完毕后再使用mounted钩子去绑定事件
        setTimeout(()=>{
            // 当ahua事件被触发的时候执行回调getSingerName
            // 拿到组件实例对象在上面绑定自定义事件ahua，回调是getSingerName
            this.$refs.singer.$on('ahua',this.getSingerName)

            // 只绑定一次
            // this.$refs.singer.$once('ahua',this.getSingerName)
        },3000)
    },
}
</script>
```
 在子组件中触发自定义事件
```javascript
<template>
    <div class="singer">
        <h2>歌手名称:{{name}}</h2>
        <h2>代表作:{{sing}}</h2>
        <button @click="sendSingerName">把歌手name传给App</button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            name:'薛之谦',
            sing:'天外来物'
        }
    },
    methods: {
        sendSingerName(){
            // 自定义事件绑定在了组件实例对象上面，this就是组件实例对象，借助$emit方法触发自定义事件
            // 触发singer组件实例对象身上的ahua事件
            this.$emit('ahua',this.name)
        }
    },
}
</script>
```
5. 组件绑定原生dom事件需要加native修饰 

```javascript
<demo @click.native="show" />
......
methods:{
	shoe(){
		alert(123)
	}
}
```
6. 解绑自定义事件`this.$off('ahua')`
#### 3.3 全局事件总线(GlobalEventBus)
![ ](https://img-blog.csdnimg.cn/900754b3f30349d3b18361b8c8208761.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
1. 实现任意组件间通信
2. 全局事件总线必须具备条件
			
			1. 所有组件实例对象都能看到他（找到他）
			2. 必须能使用$on和$emit方法去绑定和触发自定义事件
3. 安装全局事件总线

```javascript
//main.js中
//只有组件实例对象或者Vue实例对象上才能调用$on和$emit方法

//方法一:将组件实例对象放在Vue原型上
const xxx = Vue.extend({}) //创建一个组将，相当于VueComponent
// 创建组件实例对象
const d = new xxx()
//将组件实例对象放在vue原型上
Vue.prototype.x = d


//方法二:将Vue实例对象放在Vue原型上
new Vue (
	{
		......
    // 将Vue实例对象上放在Vue原型上，在beforeCreate钩子中，此时模板还未解析，数据监测和数据代理也未完成，可以在原型上添加属性
        // 写在new Vue前面：此时Vue实例还未定义
        // 写在new Vue后面：此时app已经解析解析完成，放在页面上了，再向原型上放数据已经完了
		//beforeCreate钩子中的this就是Vue实例对象vm
		beforeCreate(){
		//安装全局事件总线
			Vue.prototyple.$bus = this
		}
		......
		//使用后最好解绑当前组件用到的所有事件,因为即使该组件不在使用了,但是Vue原型上定义的$bus还在
		//自定义事件中不需要解绑是因为组件一旦被销毁了,连组件实例对象都没了,组件实例对象身上绑定的自定义事件自然也就没了
		beforDestory(){
			this.$bus.$off('xxx')
		}
		
	}
)
```
4. 使用全局事件总线

(1)传递数据
```javascript
	<button @click="sendData">传递数据组件</button>
	.....
    methods: {
        sendData(){
            // 方法一：将组件实例对象上放在Vue原型上
            this.x.$emit('xxx',数据)

            // 方法二：全局事件总线，将Vue实例对象上放在Vue原型上
            // 触发自定义事件xxx
            this.$bus.$emit('xxx',数据)
        }
    }
```
(2)接收数据:

A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件本身
```javascript
//1. 写成箭头函数形式
    mounted() {
        // 方法一：将组件实例对象上放在Vue原型上
        this.x.$on('xxx',(数据)=>{
            console.log('我是接收数据的组件,收到了传递过来的数据',数据)
        })


        // 方法二：全局事件总线，将Vue实例对象上放在Vue原型上
        this.$bus.$on('xxx',(数据)=>{
            console.log('我是传递数据的组件,收到了传递过来的数据',数据)
        })
    }
//2. 写在methods中
	methods(){
		test(数据){
			console.log('我是传递数据的组件,收到了传递过来的数据',数据)
		}
	},
    mounted() {
        // 方法一：将组件实例对象上放在Vue原型上
        this.x.$on('xxx',this.test)


        // 方法二：全局事件总线，将Vue实例对象上放在Vue原型上
        this.$bus.$on('xxx',this.test)
    }
```
#### 3.4 消息订阅与发布
 1. 一种组件间通信方式，适用于任意组件间通信
 2. 原生js不支持消息订阅与发布，一般会选择第三方库如`pubsub-js`，可以在任何一个框架里实现消息的发布于订阅
 3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件中
```javascript
	//引入pubsub库
	import pubsub from 'pubsub-js'
	......
    methods: {
            // 回调中接受两个参数，第一个是消息名，第二个是发布消息时传递过来的参数
        test(msgName,data){
            console.log(msgName,data)
        }
    },
    mounted() {
        //组件挂载完毕后订阅一个消息,第一个参数：订阅的消息名，第二个参数：有人发布该订阅消息后执行的回调;
        this.pubId =  pubsub.subscribe('xxx',this.test)
    },
    //销毁订阅的消息
    beforeDestroy() {
        pubsub.unsubcribe(this.pubId)
    }
```

 4.  发布消息
```javascript
	......
	<button @click="publishMsg">发布消息</button>
	......
	//引入pubsub库
	import pubsub from 'pubsub-js'
	......
    methods: {
        publishMsg(){ 
            // 发布一条消息
            pubsub.publish('xxx',data)
        }
    },	
```
#### 3.5 插槽
让父组件向子组件中指定位置插入HTML结构，也是一种组件间通信的方式，适用于`父组件==>子组件`
1. 默认插槽
```javascript
	//子组件中定义插槽
	<template>
	    <div>
	    	<h1>默认插槽</h1>
	        //定义一个插槽，等待组件的使用者进行填充
	        <slot>使用者没有填充内容时显示文字说明</slot>
	    </div>
	</template>
	
	// 父组件中替换插槽	
   <category>
  		//用于替换插槽内容
       <img src="../../..">
   </category>
   <category>
       <h2>用于替换插槽内容</h2>
   </category>
```
2. 具名插槽
```javascript
	//子组件中定义插槽
	<template>
	    <div>
	    	<h1>具名插槽</h1>
	        //定义插槽，name属性用于区分组件填充时的位置
	        <slot name="center">使用者没有填充内容时显示文字说明1</slot>
	        <slot name="footer">使用者没有填充内容时显示文字说明2</slot>
	    </div>
	</template>
	
	// 父组件中替换插槽	
   <category>
       <img sort="center" src="../../.."> //替换center插槽
       <h2 sort="footer">替换footer插槽</h2>
   </category>
```
3. 作用域插槽
数据在定义插槽的组件自身，但是根据数据生成的结构由插槽的使用者决定(作用域插槽也可以具名)
```javascript
	//子组件中定义插槽
	<template>
    	<div class="category">
	        <h3>作用域插槽</h3>
	        <!-- 定义一个插槽，等待组件的使用者进行填充 :foods="foods"实现将foods数据传给插槽的使用者-->
	        <slot :foods="foods" msg="消息"> </slot>
   		</div>
	</template>
	......
    data() {
        return { 
            foods:['火锅','饺子','包子','西红柿']
        }
    },
	
	// 父组件中替换插槽	
    <category >
        //scope属性拿到定义插槽的组件传递过来的数据,scope属性值不需要和插槽定义的名字相同 
       //旧api scope="receive" 
        <template scope="receive">
            <ul>
                <li v-for="(f,index) in receive.foods" :key="index">{{f}}</li>
            </ul>
            // {{receive}} 
        </template>
    </category>
    <category>
    	// 新api slot-scope="receive"
        <template slot-scope="receive">
            <ol>
                <li v-for="(f,index) in receive.foods" :key="index">{{f}}</li>
            </ol>
            <h2>{{receive.msg}}</h2>
        </template>
    </category> 

    <category>
    	//es6对象的解构赋值写法
        <template scope="{foods}">
                <h2 v-for="(f,index) in foods" :key="index">{{f}}</h2>
        </template>
    </category>
```
### 四、过度与动画
Vue就是封装了一个内置的组件transition，在特定的时候加上一些特定的类名（给元素添加样式），具体这些类名定义的是过度还是动画由用户定义

1. 类名图示：Vue一共为动画和过度效果增加了6个样式的类名

		元素进入的样式：
			1. v-enter：进入的起点
			2. v-enter-active：进入的过程中
			3. v-enter-to：进入的终点
		元素离开的样式	 
			1. v-leave：进入的起点
			2. v-leave-active：进入的过程中
			3. v-leave-to：进入的终点
		进入的起点和离开的终点是一致的，可以写在一起
![在这里插入图片描述](https://img-blog.csdnimg.cn/1a93bc0ad3a342119af95cc65765d0ea.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
 2. 动画写法		
```javascript
    <button @click = "isShow = !isShow">显示/隐藏</button>
    //Vue中过渡和动画需要使用<transition>包裹实现的元素
	// appear属性可以实现刷新后立马展示动画
	<transition appear>
		<h1 v-show:"isShow">你好！</h1>
	</transition>
			
	......
	
	data() {
        return {
            isShow:true
        }
    }
    
	......	
	
	h1{
		background-color: aqua;
	}
	/* Vue中定义进出动画，类名规定进使用v-enter-active 出使用v-leave-active */
    .v-enter-active{
        animation: slideAnimation 2s;
    }
    .v-leave-active{
        animation: slideAnimation 2s reverse;
    }
    @keyframes slideAnimation {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0);
        }
    }
```
3. 过渡写法
```javascript
    <button @click = "isShow = !isShow">显示/隐藏</button>
    //Vue中过渡和动画需要使用<transition>包裹实现的元素
	// appear属性可以实现刷新后立马展示
	// 多个过渡和动画时，可以设置name属性去区分,这时使用样式就不能使用默认的v-leave-active了，需要使用xxx-leave-active
	<transition name="xxx"  appear>
		<h1 v-show:"isShow">你好！</h1>
	</transition>
			
	......
	
	data() {
        return {
            isShow:true
        }
    }
    
	......	
	h1{
		background-color: aqua;
	}
	//进入的起点、离开的终点
 	.xxx-enter,.xxx-leave-to{
    	transform: translateX(-100%);
    }
    //进入的终点、离开的起点
    .xxx-enter,.xxx-leave-to{
    	transform: translateX(0);
    }
    //进入的过程、离开的过程
    .xxx-enter-active,.xxx-leave-active{
    //这行代码也可以直接写在实现动画的元素样式里（h1）
    	transition: 2s;
    }
```
4. 多个元素过度和动画：使用`<transition-group>`， 且为每个元素设置一个key值

```javascript
   <transition-group name='xxx'>
       <h1 v-show=" isShow"  key="1">我是效果1</h1>
       <h1 v-show=" !isShow"  key="2">我是效果2</h1>
   </transition-group>
```
5. 引入第三方样式库

	以`animate.css`库为例，官网地址[https://animate.style/](https://animate.style/)
			
			1. 安装：
				npm install animate.css --save
			2. 引用：
				import 'animate.css' 
			3. 为元素添加类名：
				transition上：name="animate__animated animate__bounce"
				dom元素上：class="animate__animated animate__bounce"
			4. 选择动画样式
				enter-active-class="animate__swing"
            	leave-active-class="animate__backOutUp"
![在这里插入图片描述](https://img-blog.csdnimg.cn/e92e68fba9974528b99cc20ea2a8b8cc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
### 五、Ajax
#### 5.1 axios
 vue中建议使用封装好的axios来发送ajax请求

```javascript
 ......
 <button @click="getSource">获取信息</button>
 ......
methods: {
    getSource(){
        axios.get('http://主机名:端口号/sourse').then(
            response =>{
                console.log('请求成功',response.data)
            },
            error =>{
                alert('请求失败',error.message)
            }
        )
    }
}
......  
```
当ajax请求存在跨域问题时，可以通过配置代理的方式解决

 1. 在vue.config.js中添加如下配置

```javascript
module.exports = {
    devServer:{
        proxy:'http://主机名:目标端口号'
    }
}

```
该方法配置简单，当本地不存在该资源时代理服务器会将请求转发给服务器，但是不能设置多个代理

2. 在vue.config.js中配置具体代理规则

```javascript
module.exports = {
    decServer:{
        proxy:{
        //匹配所有以'api1'开头的路径
            'api1':{
        //代理目标的基础路径(http://localhost:5000)
                target:'http://主机名:目标端口号', 
        //true:服务器收到的请求头中的host为：主机名:目标端口号(localhost:5000) false:localhost:8080
                changeOrigin:true, 
        //将'api1'替换成空，不然代理服务器会使用'http://主机名:目标端口号/api1/资源路径'请求资源(http://localhost:api1/5000/sourse) 
                pathRewrite:{
                    '^/api1':''
                }
            },
            'api2':{//匹配所有以'api2'开头的路径
                target:'http://主机名:目标端口号',
                changeOrigin:true, 
                pathRewrite:{
                	 '^/api2':''  
                }
            },
        }
    }
}
```
#### 5.2 vue.resource
vue的插件库，对xhr进行封装，用于发送Ajax请求，安装`npm i vue-resource`

```javascript
//main.js中
// 引入插件
import vueResource from 'vue-resource'
// 使用插件
Vue.use(vueResource)

//组件中
......
 <button @click="getSource">获取信息</button>
......
methods: {
    getSource(){
        this.$http.get('http://主机名:端口号/sourse').then(
            response =>{
                console.log('请求成功',response.data)
            },
            error =>{
                alert('请求失败',error.message)
            }
        )
    }
}
.....
```
### 六、Vuex
![在这里插入图片描述](https://img-blog.csdnimg.cn/d21c111d68104908a4c2f6d73bed6c9d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
#### 6.1 vuex基本原理
1. 什么是vuex

		（1）在vue中实现集中式状态（数据）管理的一个vue插件
		（2）对vue应用中多个组件的共享状态进行集中式的管理（读/写）
		（3）一种组件间的通信方式，适用于任意组件间通信
 2. 什么时候使用vuex
多个组件需要共享数据时
3. 原理图
Actions、Mutations、State都由store进行管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/c94bcef9309943ee9c1078d1b3116a35.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
#### 6.2 vuex简单使用
 
（1）安装 `npm i vuex`
（2）在`main.js`中创建vm时传入`store`配置项

```javascript
// 引入store
import Store from './store'
new Vue({
    render:c => c(App), 
    //配置Store 
    store:Store
}).$mount('#app')
```
(3)初始化数据、创建store/index.js文件并配置actions、mutations

```javascript
// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

//准备actions——用于相应组件中的动作
const actions = {
    // 这里传入两个参数context：相当于一个迷你的store  value：组件传递过来的参数
    increment:function(context,value){
        console.log('action中的increment被调用了',context)
        //调用mutations中的INCREMENT函数
        context.commit('INCREMENT',value)
    }
}

// 准备mutations——用于操作数据（state）
const mutations = {
    // 这里传入两个参数 state：就是下面定义的存储数据的state  value：用户传递过来的数据
    INCREMENT:function(state,value){
        console.log('mutations中的INCREMENT被调用了')
        state.sum += value 
    }
}

// 准备state——用于存储数据
const state = {
    // 当前的和
    sum:0
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})


```
（4）在组件中读取vuex中的数据`$store.state.sum`

（5）在组件中修改vuex中的数据`$store.dispatch('action中的方法名',数据)`或者 `$store.commit('mutations中的方法名',数据)`，一般没有网络请求等其他业务逻辑的时候才会越过`actions`即不写`dispatch`直接编写`commit`

#### 6.3 getters的使用

当state中的数据需要再次加工时，可以使用getters加工
```javascript
//store/index.js中追加getters配置

// 准备getter——用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.sum*10
    }
}
//暴露store
export default new Vuex.Store{
......
getters
......
}
```
在组件中读取数据：`$store.getters.bigSum`

#### 6.4 map方法的使用
引入map方法

```javascript
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
```

1. `mapState`方法：用于映射`state`中的数据为计算属性

```javascript
   <h2>当前求和为：{{sum}}</h2>
   <h2>当前值放大十倍得：{{bigSum}}</h2>
   <h2>我喜欢的{{type}}是{{band}}</h2>
   ......
    computed:{
        // 1、通过计算属性简写模板语法中的数据
        // sum(){
        //     return this.$store.state.sum
        // },
        // band(){
        //     return this.$store.state.band
        // },
        // type(){
        //     return this.$store.state.type
        // },
        // bigSum(){
        //     return this.$store.getters.bigSum
        // }

        // 2、借助mapState生成计算属性，从state中读取数据（对象写法 key用于生成computed中的函数名，value相当于state中的数据）
        ...mapState({sum:'sum',band:'band',type:'type'}),
        // 3、借助mapState生成计算属性，从state中读取数据（数组写法 相当于在computed中生成和state中数据同名的函数）、
        // ...mapState(['sum','band','type'])
    },
```

2. `mapGetters`方法：用于映射`getters`中的数据为计算属性

```javascript
        // 2、借助mapGetters生成计算属性，从getters中读取数据（对象写法 key用于生成computed中的函数名，value相当于state中的数据）
        ...mapGetters({bigSum:'bigSum'})

        // 3、借助mapGetters生成计算属性，从getters中读取数据（数组写法 相当于在computed中生成和getters中数据同名的函数）
        // ...mapGetters(['bigSum'])
```

3. `mapActions`方法：用于生成于`actions`对话的方法，即`$store.dispatch(xxx)`函数

```javascript	
......
<button @click="incrementOdd(n)">当前为奇数再加</button>
<button @click="incrementWait(n)">等一秒再加</button>
......
methods:{
        // incrementOdd(){
        //     if(this.$store.state.sum % 2){
        //         this.$store.dispatch('incrementOdd',this.n)
        //     }
        // },
        // incrementWait(){
        //     setTimeout(()=>{
        //         this.$store.dispatch('incrementWait',this.n)
        //     },1000)
        // }
       // 通过mapActions生成对应的方法去调用dispath去联系actions（对象写法）
       // 这里将判断和定时器的逻辑写在了actions中   
       ...mapActions({incrementOdd:'incrementOdd',incrementWait:'incrementWait'}),
        // 通过mapActions生成对应的方法去调用dispath去联系actions（数组写法）
        // ...mapActions(['incrementOdd','incrementWait'])
}
```

4. `mapMutations`方法：用于映射`mutations`中的数据为计算属性，即`$store.commit(xxx)`函数

```javascript
.....
 <button @click="increment(n)">+</button>
 <button @click="decrement(n)">-</button>
 .....
      
methods:{
		// increment(){
        //     this.$store.commit('increment',this.n)
        // },
        // decrement(){
        //     this.$store.commit('decrement',this.n)            
        // },
        
        // 通过mapMatations生成对应的方法去调用commit去联系mutations （对象写法） 
        //但是在调用increment和decrement方法时需要将操作的数据作为参数传进去
        ...mapMutations({increment:'increment',decrement:'decrement'}),
        // 通过mapMatations生成对应的方法去调用commit去联系mutations  但是在调用increment和decrement方法时需要将操作的数据作为参数传进去（数组写法）
        // ...mapMutations(['increment','decrement']),
}
```
使用`mapMutations`和`mapActions`方法时，如果需要传递参数，需要在模板中绑定事件时就传递好参数，否则传入的默认参数是事件对象

#### 6.5 模块化命名空间
1. 让代码更容易维护，多种数据分类更加明确
2. 修改stroe.js文件

```javascript
const countOptions = {
    // 命名空间设置为true，暴露的countAbout，personAbout才能被mapState中识别
    namespaced: true,
    actions:{
        incrementOdd:function(context,value){
            if(context.state.sum%2){
                console.log('action中的incrementOdd被调用了')
                context.commit('INCREMENTODD',value)
            }
    
        },
        incrementWait:function(context,value){
            setTimeout(() => {
                console.log('action中的incrementWait被调用了')
                context.commit('INCREMENTWAIT',value)
            }, 1000);
        }
    },
    mutations:{
        increment:function(state,value){
            console.log('mutations中的increment被调用了')
            state.sum += value
        },
        decrement:function(state,value){
            console.log('mutations中的decrement被调用了')
            state.sum -= value
        },
        INCREMENTODD:function(state,value){
            console.log('mutations中的INCREMENTODD被调用了')
            state.sum += value 
        },
        INCREMENTWAIT:function(state,value){
            console.log('mutations中的INCREMENTWAIT被调用了')
            state.sum += value 
        },
    },
    state:{
        sum:1,
        type:'乐队',
        band:'回春丹',
    },
    getters:{
        // 在配置中拿到的state是配置中的state不是总的state
        bigSum(state){
            return state.sum*10
        }
    }
}
const personOptions = {
    namespaced: true,
    actions:{
        addPersonA(context,value){
            if(value.name.indexOf('阿')===0){
                context.commit('ADDPerson',value)
            }else{
                alert('添加的人必须姓阿')
            }
        },
        addTextFromServer(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response =>{
                    context.commit('ADDPerson',{id:nanoid(),name:response.data})
                },
                error =>{
                    alert(error.message)
                }
            )
        }
    },
    mutations:{
        ADDPerson:function(state,value){
            console.log('mutations中的ADDNAME被调用了')
            state.persons.unshift(value)
        }
    },
    state:{
        persons:[
            {id:'001',name:'阿花'}
        ]
    },
    getters:{
        firstPersonName(state){
            return state.persons[0].name
        }
    }
}
// 创建并暴露store
export default new Vuex.Store({
    modules:{
        countAbout:countOptions
    }
})
```
3. 开启命名空间后，组件读取state数据

```javascript
//方式一：自己读取
this.$store.state.personAbout.persons
//方式二：借助mapState读取
...mapState('countAbout',['sum','band','type']),
```
4. 开启命空间后，组件中读取getters数据

```javascript
//方式一:直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取
...mapGetters('countAbout',{bigSum:'bigSum'})
```
5. 开启命名空间后组件中调用dispatch
```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonA',personObj)
//方式二：借助mapActions
...mapActions('countAbout',{incrementOdd:'incrementOdd',incrementWait:'incrementWait'}),
```
6. 开启命名空间后组件中调用commit
```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADDPerson',personObj)
//方式二：借助mapMutations
...mapMutations('countAbout',{increment:'increment',decrement:'decrement'}),

```

### 七、vue-router
#### 7.1 路由简单理解
1. 什么是vue-router
vue的一个插件库，用来实现SPA（单页面应用）
2. 什么是单页面应用（single page web application）
整个页面只有一个完整页面，点击页面中的导航链接不会刷新页面，只会通过ajax请求获取数据做页面的局部更新
3. 什么是路由
路由就是一组key-value的映射关系（路由规则），key为路径，value可能是function或者component
4. 路由分类
		
		（1）后端路由：value是function，用于处理客户端提交的请求，当服务器收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
				
		（2）前端路由：value是component用于展示内容，当浏览器路径改变时对应组件就会显示
#### 7.2 基本使用
1. `npm i vue-router`安装vue-router
2. 引用并应用插件

```javascript
//main.js
// 引入vue-router
import vueRouter from 'vue-router'
// 应用vue-router
Vue.use(vueRouter)
```
3. 编写router配置项

```javascript
// 用于创建整个应用的路由器
import vueRouter from 'vue-router'
// 引入组件
import About from '../page/about'
import Home from '../page/home'
import News from '../page/news'
import Message from '../page/message'
import Detail from '../page/detail'

// 创建并暴露一个路由器
export default new vueRouter({
    routes:[
        // 一级路由
        {
           // 路由命名，可以在切换组件时使用路由name属性来跳转
            name:'guanyu',
           // 如果路径是'/about'，展示About组件
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            // 二级路由  只有一级路由匹配路径时需要'/'
            children:[
                {
                    path:'news',
                    component:News,
                },
                {   
                    path:'message',
                    component:Message,  
                    // 三级路由
                    children:[
                        {
                        // 路由命名，可以在切换组件时使用路由name属性来跳转                      
                        	name:'messageDetail'
                        	path:'detail',
                            component:Detail
                        }
                    ] 
                }
            ]
        }
    ]
})
```
4. 实现组件切换

```javascript
 // 实现导航区点击切换组件显示 
 //用vue-router中提供的特殊标签router-link最后解析出来就是a标签 通过在to属性中添加路径进行跳转 
 //action—class，当点击后会在模板中加入该属性下对应的样式 
          
<router-link class="list-group-item " to="/about" active-class="active">About</router-link>
//组件命名后路径的写法
//<router-link class="list-group-item " :to="{name:'guanyu'}" active-class="active">About</router-link>

//多级路由切换时，需要写完整路径
<router-link class="list-group-item" active-class="active"  to="/home/message">Message</router-link>

```
5. 指定展示位置

```javascript
 <router-view> </router-view>
```
#### 7.3 路由传递参数
##### 7.3.1 路由的query参数
1. 传递参数
```javascript
//跳转路由并携带query参数，to的字符串写法
//':'会将后面的内容当成js语句解析  "``"字符串里面混有js变量
//<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>

//跳转路由并携带query参数，to的对象写法
 <router-link :to="{
   // 路由命名后可以使用路由的名字代替路径实现跳转
   // name:'messageDetail',
     path:'/home/message/detail',
     query:{
         id:m.id,
         title:m.title
     }
 }">
 {{m.title}}
 </router-link>
```
2. 接收参数

```javascript
$route.query.id
$route.query.title
```
##### 7.3.2 路由的params参数
1. 配置路由，声明接收params参数

```javascript
path:'/home',
component:Home,
// 二级路由  二级路由匹配路径时不需要'/'
children:[
    {
        path:'news',
        component:News,
    },
    {
        path:'message',
        component:Message,  
        // 三级路由
        children:[
            {
                // 路由命名，可以在切换组件时使用路由name属性来跳转
                name:'messageDetail',
                // 正常路由写法 
                // path:'detail',

                // 携带params参数，路由写法:占位符
                path:'detail/:id/:title',
                component:Detail
            }
        ] 
    }
]

```

2. 传递参数

```javascript
// 路由跳转并携带params参数，to的字符串写法  需在router中配置占位符-->
// <router-link :to="`/home/message/detail/${m.id}/${m.title}`">
//	  {{m.title}}
// </router-link>

// 跳转路由并携带params参数，to的对象写法 
<router-link :to="{
    //params参数时只能使用路由name来进行跳转，不能使用path
    name:'messageDetail',
    params:{
        id:m.id,
        title:m.title
    }
}">
{{m.title}}
</router-link>
```
3. 接收参数

```javascript
$route.params.id
$route.params.title
```
#### 7.4 路由的props配置
作用：让路由组件更方便的收到参数

```javascript
{
   name:'messageDetail',
   // 携带params参数，路由写法:占位符
   path:'detail/:id/:title',
   component:Detail,


   // props的第一种写法，值为对象，该对象中所有的key-value都会以props的形式传递给detail组件
   // props:{
   //     a:1,
   //     b:'ahua'
   // }

   // porps的第二种写法，值为布尔值，若为真，就会把路由组件收到的所有params参数以props的形式传递给detail组件
   // props:true

   // props的第三种写法，值为函数，该函数返回的对象中的每一组key-value都会通过props传给detail组件
   path:'detail',
   props($router){
       return {
	       id:$router.query.id,
	       title:$router.query.title,
	       a:1,
	       b:'ahua'
       }
   }
```
#### 7.5 路由使用注意点
1. 路由组件一般存放在`pages`文件夹中，一般组件存放在`component`文件夹里面
2. 通过切换，隐藏了的路由组件，默认是被销毁的，需要时再重新挂载
3. 每个组件都有自己的`$route`属性，里面存放的是自己的路由信息
4. 整个应用只有一个`router`，可以通过组件的`$router`来获取
5.  `< router-link >` 的`replace`模式：控制路由跳转时操作浏览器历史记录的模式

		1. 浏览器的历史纪录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录，路由跳转时默认是push
		2. 开启replace模式：
		//简写：<router-link replace> message</router-link>
		//全写：<router-link :replace='true'> message</router-link>
#### 7.6 编程式路由导航
作用：不借助`<router-link>`的路由导航
具体编码：
```javascript
//$router中跳转到指定的组件使用的两个api，使用方法和router-link中的to类似
 showPush(m){
     this.$router.push({
         path:'/home/message/detail',
         query:{
             id:m.id,
             title:m.title
         }
     })
 },
 showReplace(m){
     this.$router.replace({
         path:'/home/message/detail',
         query:{
             id:m.id,
             title:m.title
         }
     })
 }
//$router中控制历史记录进行跳转的api
 //前进
this.$router.forward()
//后退
this.$router.back()
// 向前/后走几步
this.$router.go(2)

```
#### 7.7 缓存路由组件
1. 作用：让不展示的路由组件保持挂载，不被销毁
2. 代码实例

```javascript
//切换显示组件时，原组件不销毁  

//缓存所有组件写法
//<keep-alive>
//缓存多个组件写法
//<keep-alive :include=['News','message']>
//缓存单个组件写法
<keep-alive include="News">
    <router-view></router-view>
</keep-alive>
```
#### 7.8 组件的生命周期
路由组件独有的两个钩子，用于捕获路由组件的激活状态（显示的组件为激活状态，未显示的组件无论是否缓存都是失活状态）
```javascript
//路由组件被激活后
    activated() {
        console.log('组件被激活了')
    },
//路由组件失活后
    deactivated() {
        console.log('组件失活了')
    },
// $nextTick方法会在下一次dom更新结束后执行回调（适用于改变数据后需要根据更新后的新dom进行某些操作）
   	this.$nextTick(function(){
      	this.$refs.inputFocus.focus()
  	})
```
#### 7.9 路由守卫
1. 作用：对路由进行权限控制
2.  全局守卫：全局守卫组件切换一次，切换之前调用前置路由守卫，切换之后调用后置路由守卫

```javascript
const router =  new vueRouter({
    routes:[
        // 一级路由
        {
            // 组件命名
            name:'guanyu',
            meta:{title:'关于'},
            // 如果路径是'/about'，展示About组件
            path:'/about',
            component:About,
        },
        {
            name:'shouye',
            path:'/home',
            meta:{title:'首页'},
            component:Home,
            // 二级路由  二级路由匹配路径时不需要'/'
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    // 路由源信息
                    meta:{isAuth:true,title:'新闻'}
                },
                {
                    // 路由源信息
                    meta:{isAuth:true,title:'信息'},
                    path:'message',
                    component:Message,  
                    // 三级路由
                    children:[
                        {
                            // 路由命名，可以在切换组件时使用路由name属性来跳转
                            name:'messageDetail',
                            component:Detail,

                            // props的第三种写法，值为函数
                            path:'detail',
                            props($router){
                                return {id:$router.query.id,title:$router.query.title}
                            }
                        }
                    ] 
                }
            ]
        }
    ]
})

// 全局前置路由守卫--初始化的时候被调用，每次切换路由之前被调用
// 参数 to：目标路由信息  from：初始路由信息  next：放行路由
router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from,next)

    // to.path === '/home/news' ==> to.name === 'xinwen'
    // 判断是否需要拦截路由（权限控制），可以在路由器的配置项meta中进行配置，然后统一进行判断  
    // if(to.meta.isAuth)
    if(to.path === '/home/news' || to.path === '/home/message'){
    	//权限控制的具体规则
        if(localStorage.getItem('name') === 'ahua'){
            next() //放行路由
        }else{
            alert('用户名错误')
        }
    }else{
        next()
    }
})

// 全局后置路由守卫--初始化的时候被调用，每次路由切换之后被调用
router.afterEach((to,from)=>{
    console.log('后置路由守卫',to,from)
    document.title = to.meta.title  || '管理系统'
})
```
3. 独享守卫	

```javascript
{
    name:'xinwen',
    path:'news',
    component:News,
    // 路由源信息
    meta:{isAuth:true,title:'新闻'},
    // 独享守卫（没有后置路由守卫），只对这一个组件进行限制
    beforeEnter:(to,from,next)=>{
        console.log('前置路由守卫',to,from,next) 
        // 判断是否要鉴权
        if(to.meta.isAuth){
            if(localStorage.getItem('name') === 'ahua'){
                next()
            }else{
                alert('用户名错误')
            }
        }else{
            next()
        }
    }
},
```
4. 组件内守卫
```javascript
    // 通过路由规则，进入该组件时被调用
    beforeRouteEnter (to, from, next) {
        console.log('app---beforRouterEnter',to,from)
        next()
    },
    // 通过路由规则，离开该组件时被调用
    beforeRouteLeave(to, from, next){
        console.log('app---afterRouterLeave',to,from)
        next()
    }
```
#### 7.10 路由器工作模式
1. hash值：在url中#及其以后的值就是hash值
2. hash值不会包含在http请求中，即hash值不会带给服务器
3. hash模式：
		
		1. 地址中永远带着#号，不美观
		2. 若以后讲地址通过第三方手机app分享，若app校验严格则地址会被标记不合法
		3. 兼容性较好
4. history模式：
		
		1. 地址干净，美观
		2. 兼容性和hash模式相比略差
		3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题

### 八、Vue中的UI组件库
相当于一个Vue的组件库
#### 8.1 移动端常用UI组件库
1. **Vant**：[https://vant-contrib.gitee.io/vant/#/en-US/](https://vant-contrib.gitee.io/vant/#/en-US/)
2. **Cube UI**：[https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start](https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start)
3. **Mint UI**：[http://mint-ui.github.io/docs/#/zh-cn](http://mint-ui.github.io/docs/#/zh-cn)

#### 8.2 PC端常用UI组件库
1. **Elememt UI**：[https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)

按需引入：

首先，安装 `babel-plugin-component`：

```javascript
npm install babel-plugin-component -D
```

然后，将 `babel.config.js` 配置修改为：
```javascript
{
  "presets": [["@babel/preset-env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
引入使用的组件


3. **iView UI**：[http://v1.iviewui.com/docs/introduce](http://v1.iviewui.com/docs/introduce)
### 九、组件化编码流程
1. 拆分静态组件：组件按照功能点拆分，命名不能和html元素冲突
2. 实现动态组件：考虑数据存放位置，是一个组件使用还是多个组件使用
	
		（1） 一个组件使用：数据放在组件自身
		（2）多个组件使用：数据存放在子组件共同的父组件上（状态提升）
		（3）这里的用不仅仅包括读，还包括写操作
3. 实现交互：从绑定事件监听开始



      
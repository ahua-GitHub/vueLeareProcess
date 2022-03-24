全网最完整教学[https://v3.cn.vuejs.org/guide/installation.html#vue-devtools](https://v3.cn.vuejs.org/guide/installation.html#vue-devtools)
@[TOC](Vue基础教程)
## Vue devtools
选择适合自己浏览器的安装即可[https://v3.cn.vuejs.org/guide/installation.html#vue-devtools](https://v3.cn.vuejs.org/guide/installation.html#vue-devtools)，不下载也行，影响不大
## Vue 2.0
Vue2.0下载地址：[https://unpkg.com/vue@2.0.0/dist/vue.js](https://unpkg.com/vue@2.0.0/dist/vue.js)
### 一、初识vue
写法一：
```javascript
//html
<div id="root">
        <h1>hello，{{message}}</h1>
</div>

//js
const app = new Vue({
            el:'#root',//用于指定当前Vue实例为哪个容器服务
            //data的对象式写法
            data:{//用于存储数据，供el指定的容器去使用
//本质上是将message挂载到Vue实例上，所以只要是Vue实例上的内容{{xxx}}模板都能拿到
                message:'阿花'
            }
		})
```
写法二：
```javascript
//html
    <div id="root">
        <h1>hello，{{message}}</h1>
    </div>
//js
//这里app就为new的vue实例，在控制台输入app回车，可以查看app详细信息
    const app = new Vue({
    //data的函数式写法（Vue3.0中只支持函数式写法）
        data(){
        	return{
 				message:'阿花',
			}
        }
    })
    //将vue实例挂载到root容器上
    app.$mount('#root')
```
注：
- vue 3的写法和vue 2也有差异，这个会在后面讲到
- data的函数式写法不能写成箭头函数，写成箭头函数this指向的就是global而不是Vue实例了

**浅谈vue**

1. 想让Vue工作，必须创建一个Vue实例，且需要传入一个配置对象
2. 容器（上面代码中的div）里面的代码依旧符合html规范，只是混入了一些特殊的Vue语法
3. 容器里面的Vue称为Vue模板
4. Vue容器和实例是一一对应的
5. 真实开发中只会有一个Vue实例，并且配合着组件一起使用
6. 容器里面的Vue模板（ {{xxx}} ）只能是js表达式，并且和data中的数据绑定



> 1. 一个实例对应多个容器，只有第一个容器会被识别
> 2. 多个实例对应一个容器，浏览器会报错，不过第一个实例可以生效


> js表达式：一个表达式会产生一个值
> 1. `a`
> 2. `1+1`
> 3.  `demo(1)`
> 4. `x === y ? 'a' : 'b'`
> <br>
>   js语句：js代码就是js语句（当然也包括js表达式）<brx>
>   1 . `if(){}`
>   2 . `for(){}`

#### 1、Vue解析过程：

如果容器中有Vue模板，在Vue实例中将对应的内容解析出来后，替换容器中的Vue模板内容，然后在浏览器中解析显示

#### 2、MVVM模型
1. M：模型（model）：data中的数据
2. V：视图（view）：模板代码
3. VM：视图模型（ViewModel）：Vue实例

data（M）实际上是将属性挂载到vue实例上（VM），而vue模板（V）可以拿到vue实例和原型上的属性，并直接使用

#### 3、Vue中的数据代理
1. 通过Vue实例对象来代理data对象中属性的操作（读/写）
3. 通过`Object.defineProperty()`，把data对象(_data)上的所有的属性添加到Vue实例上
4. 每一个添加到实例上的属性，都指定一个get和set方法
5. 在get和set内部操作data中对应的属性
![在这里插入图片描述](https://img-blog.csdnimg.cn/25c3905b67574a229b2944e04237b1b2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
这样在容器中的Vue模板就可以直接使用message属性的值，而不是通过`_data.message`去获取

#### 4、数据监测原理
这一节示例代码中还没讲到，建议在看到列表渲染之后再回来重新看一遍，有利于理解
1. vue会监测data中所有层次的数据
2. vue监测对象中的数据

		通过set实现监视，且需要在new Vue实例时将监测的数据传入
		
		(1) 后续添加到对象中的属性Vue默认不做响应式处理
		(2) 如果需要添加的属性为响应式，可以使用的API有
			1.Vue.set(target,propertyName/index,value)
			2.vue实例.$set(target,propertyName/index,value)
3. vue监测数组中的数据

			通过包裹数组更新元素的方法实现，本质上做了两件事
				1.调用原生对应的方法对数组进行更新
				2.重新解析模板，进而更新页面
4. 在vue中修改某个元素只能使用以下方法

```javascript
1. push(),pop(),shift(),unshift(),splice(),sort(),reverse()
2. Vue.set(),vue实例.$set 
```
5. `Vue.set()`和`vm.$set()`不能给vue实例或者vue实例的根对象添加属性


代码示例
```javascript
//div
    <div id="root">
        <h1>乐队信息</h1>
        <button @click="band.num++">成员加一</button>
        <button @click="addStand">添加代表作</button>
        <button @click="band.stand='艾米莉' ">修改代表作</button>
        <button @click.once="addBand">添加一个乐队</button>
        <button @click.once="updateBand">修改乐队为康姆士</button>
        <button @click.once="addHobby">添加一个爱好</button>
        <button @click.once="updateHobby">修改爱好</button>
        <h3>姓名：{{band.name}}</h3>
        <h3>成员：{{band.num}}</h3>
        <h3 v-show="band.stand">代表作：{{band.stand}}</h3>
        <ul>
            <li v-for="(b,index) in band.hobby" :key="index">{{b}}</li>
        </ul>
        <h3>其他乐队：</h3>
        <ul>
            <li v-for="(o,index) in band.other" :key="index">
                {{o.name}}--{{o.num}}
            </li>
        </ul>
    </div>
 //js
     const app = new Vue({
        el:'#root',
        data:{
            band:{
                name:"回春丹",
                num:3,
                hobby:['抽烟','喝酒','烫头'],
                other:[
                    {name:'sgbb',num:4},
                    {name:'四驱兄弟',num:2}
                ]
            }
        },
        methods: {
            addStand(){
                Vue.set(this.band,'stand','正义')
            },
            addBand(){
                this.band.other.unshift({name:'夏日入侵企划',num:4})
            },
            updateBand(){
                this.band.other[0].name = '康姆士'
            },
            addHobby(){
                this.band.hobby.push('唱歌')
            },
            updateHobby(){
                // this.band.hobby.splice(0,1,'打游戏')
                this.$set(this.band.hobby,0,'打游戏')
            }
            
        }
    })   
```
控制台中可以比较清楚的看到vue中通过set方法实现数据监测，get方法实现数据动态绑定，以及vue中包裹的原生数组方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/cdc6f0e15a514a24aff7febb80454e03.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

### 二、Vue基础
#### 1、基本语法
##### 1.1 插值语法
像上面`{{xxx}}`这种Vue模板语法被称为插值语法，一般用于标签体中
##### 1.2 指令语法
`v-xxx`在Vue中被称为指令语法，一般用于解析标签（标签属性，标签内容体，绑定事件等）
#### 2、数据绑定
##### 2.1 v-bind 数据绑定
1. `v-bind`实现的是单向数据绑定，只能从data流向页面
2. `v-bind`后面引号中的内容会被Vue解析为js表达式，例如下面代码中的`url`
3. `v-bind`可以简写成`:`
```javascript
//html
	<div id="root">
        <h1>指令语法</h1>
       // v-bind:href="url" 表示将js表达式url执行的结果绑定到href上 
        <a v-bind:href="url">点击跳转阿花的博客</a>
        <a :href="jump.url">点击跳转百度</a>
    </div>
//js
	const app = new Vue({
	   el:'#root',
	   data:{
		       message:'ahua',
		       url:'https://blog.csdn.net/aaahuahua',
		       jump:{
		       url:'http://www.baidu.com'
	       	}
	   }
	})

```
##### 2.2 v-model 双向数据绑定
`v-model`只能应用于表单类元素上（输入类元素，配合value一起使用），实现双向绑定，数据可以从页面流向data，也可以从data流向页面

`v-model:value`可以简写为`v-model`

```javascript
//html
    <div id="root">
        <h1>单向数据绑定：<input type="text" :value="message"></h1>
        <h1>双向数据绑定：<input type="text" v-model="message"></h1> 
    </div>
 //js
        const app = new Vue({
            el:'#root',
            data:{
                message:'阿花'
            }
        })

```
收集表单数据示例：

```javascript
//div
<div id="root">
        <form @submit.prevent ="demo">
            <!-- v-model.trim忽略输入框中首尾的空格 -->
            账号：<input type="text" v-model.trim = "userInfo.account"><br><br>
            密码：<input type="password" v-model = "userInfo.passward"><br><br>
            <!--type="number"指定输入框中的输入类型，v-model.number指定vue只识别输入的数字类型的数据 -->
            年龄：<input type="number" v-model.number = "userInfo.age"><br><br>
            性别：
            男<input type="radio" name="sex" v-model="userInfo.sex" values="male"><br><br>
            女<input type="radio" name="sex" v-model="userInfo.sex" values="female"><br><br>
            爱好：
            抽烟<input type="checkbox" v-model="userInfo.hobby" value="smoking">
            喝酒<input type="checkbox" v-model="userInfo.hobby" value="drunk">
            烫头<input type="checkbox" v-model="userInfo.hobby" value="head"><br><br>
            当前地区
            <select v-model="userInfo.city">
                <option>请选择地区</option>
                <option value="beijin">北京</option>
                <option value="shanghai">上海</option>
                <option value="hangzhou">杭州</option>
                <option value="nanjing">南京</option>
                <option value="shenzhen">深圳</option>
            </select>
            个人简介：
            <!--v-model.lazy 指定失去焦点才会更新一次数据  -->
            <textarea v-model.lazy="userInfo.person" cols="30" rows="10"></textarea>
            <input type="checkbox" v-model="userInfo.agree">同意<a href="https://blog.csdn.net/aaahuahua">《本协议》</a>
            <button id="demo">提交</button>
        </form>        
    </div>
//js
    const app = new Vue({
        el:'#root',
        data:{
            userInfo:{
                account : '',
                passward : '',
                age : '',
                sex : '',
                hobby : [],
                city : 'hangzhou',
                agree : ''
            }
        }
    })
```
##### 2.3 v-model收集表单数据
1. 表单类型中，`v-model`收集的都是`value`值
2.  `<input text="radio">`类型中收集的也是`value`值，且需要给标签配置`value`属性
3.  `<input text="checkbox">`
		
		1.没有配置value	属性，v-model收集的就是checked（勾选true，未勾选false）
		2.配置了value属性，
			（1）v-model初始值是非数组，收集的就是checked（勾选true，未勾选false）
			（2）v-model初始值是数组，收集的就是value组成的数组
4.`v-model`的三个修辞符

		1.lazy：失去焦点再收集数据
		2.number：输入字符转为有效的数字
		3.trim：过滤首尾空格
		
#### 3、事件绑定
1. `v-on:xxx`绑定事件，简写形式`@xxx`
2. 事件的回调配置在**methods**对象中，并最终挂载到Vue实例上
3. **methods**中配置的函数都是事件绑定后的回调，this指向的是Vue实例或者组件实例对象
4. `@xxx='test'`和`@xxx='test($event)'`效果一样，只不过是后者可以传参数

```javascript
//div
	<div id="root">
        <h1>hello,{{message}}</h1>
        //绑定点击事件
        <button v-on:click="showAlert">点击我</button>
		//如果传入了参数，就会替代event，如果还需要使用event需要用$event进行占位
        <button v-on:click="showAlert1(10086,$event)">点击我1</button>
    </div>
//js
        const app = new Vue({
            el:'#root',
            data:{
                message:'ahua',
            },
            //点击事件的回调
            methods:{
                showAlert(){
	                //这里的this指向的是Vue实例
	                console.log(this)
	                alert('ahua,你好')
                },
                 showAlert1(num,event){
                  //如果传入了event，这里的event表示的是事件对象
             	    console.log(event,num)
                }
                }
            }
        })
```
这里的回调showAlert其实也是挂载在Vue实例上的，但是vue没有对其做数据代理，因为函数只需要调用，而不是去反复更改

##### 3.1 常用事件修饰符
1. `prevent`：组织默认事件
2. `stop`：组织事件冒泡
3. `once`：事件只触发一次
4. `capture`：使用事件的捕获模式(先捕获，再冒泡)
5. `self`：只有event.target是当前操作的元素，才能触发事件（类似once的功能）
6. `passive`：事件默认行为，立即执行，无需等待事件回调完毕


```javascript
//div
    <div id="root">
       
        <a href="https://blog.csdn.net/aaahuahua" @click.prevent="showInfo" >点我跳转到阿花的博客</a>
        
        <div @click= "showInfo2">
            <button @click.stop = "showInfo1">点击我</button>
        </div>
       
        <div>
            <button @click.once= "showInfo3">只触发一次</button>
        </div>
    </div>
//js
const app = new Vue({
            el:'#root',
            data:{
                message:'ahua',
            },
            //点击事件的回调
            methods:{
                showInfo(){
                    alert('确认跳转到阿花的博客吗')
                },
                showInfo1(){
                    alert('阻止事件冒泡')
                },
                showInfo2(){
                    alert('事件冒泡')
                },
                showInfo3(){
                    alert('触发一次')
                }
            }
        })
```
注：命令修饰符是可以连写的

##### 3.2 键盘事件
1. `@keyup`按键弹起
2. `@keydown`按键按下

```javascript
//div
    <div id="root">
        <input type="text" placeholder="按下回车输出内容" @keyup="showInfo" >
    </div>
//js
        const app = new Vue({
            el:'#root',           
            methods:{
                showInfo(e){
                    console.log(e.target.value)
                }
            }
        })
```
##### 3.3 按键别名
1. 回车 => `enter`
4. 删除 => `delete`
5. 退出 => `esc`
6. 空格 => `space`
7. 换行 => `tab`
8. 上 => `up`
9. 下 => `down`
10. 左 => `left`
11. 右  => `right`

```javascript
//div
    <div id="root">
    //输入完内容后在按下enter键才会打印value值
        <input type="text" placeholder="按下回车输出内容" @keyup.enter="showInfo" >
    </div>
//js
        const app = new Vue({
            el:'#root',           
            methods:{
                showInfo(e){
                    console.log(e.target.value,)
                }
            }
        })
```
**Vue**未提供别的按键别名，可以使用按键原始的**keyCode**值去绑定,使用if进行判断即可
```javascript
//div
    <div id="root">
    //输入完内容后在按下enter键才会打印value值
        <input type="text" placeholder="按下回车输出内容" @keyup="showInfo" >
    </div>
//js
        const app = new Vue({
            el:'#root',           
            methods:{
                showInfo(e){
                    //console.log(e.key,e.keyCode)
                    if(keycode === 65){
                    	console.log(e.key,e.keyCode)
					}
                }
            }
        })
```
Vue也支持自己定义一个**按键别名**

```javascript
//html
	<div id="root">
        <input type="text" placeholder="按下回车输出内容" @keyup.huiche="showInfo" >
    </div>
//js
       //定义按键别名  
        Vue.config.keyCodes.huiche = 13
        const app = new Vue({
            el:'#root',           
            methods:{
             showInfo(e){
                    console.log(e.target.value)
                }
            }
        })
```

**注：**
1. `tab`键不适合与`@keyup`指令一起使用，因为tab键会切换焦点
2. `ctrl`、`alt`、`shift`、`meta`（win/comd）和`keyup`一起使用时，按下修辞键同时再按下其他键，然后释放修饰键，事件才触发（可以通过`@keyup.ctrl.y`实现指定配合按键触发）
3. 也可以使用`@keyup.65`这种形式去指定具体的按键，但是web标准中已经删除了该特性，未来可能会废弃

#### 4、计算属性
**computed:**
1. 使用的属性实际不存在，通过已有属性计算得来
2. 底层使用的还是Object.defineproperty方法提供的getter方法和setter方法
3. 与methods相比，计算属性内部有缓存机制（复用），效率高，调试方便
4. 计算属性最终会挂载到Vue实例上（将返回值挂载到Vue实例上，名字命名为该计算属性名），在Vue实例上直接读取即可
5. 计算属性修改，必须使用set函数去修改依赖的数据

```javascript
//完整写法
//html
    <div id="root">

        <input type="text" v-model:value="firstName"><br><br>
        <input type="text" v-model:value="lastName"><br>
        <h1>{{showName}}</h1>
    </div>
//js
    	const app = new Vue({
            el:"#root",
            data:{
                    firstName: '阿',
                    lastName: '花'                
            },
            computed:{
                showName:{
            // 读取showName时，就会调用一次get方法，返回值就是showName的值，然后将返回值挂载到Vue实例上，命名为showName..
            // get的调用时机 1.初次调用showName时  2.showName依赖的数据发生变化时
            // 也就是说computed会缓存showName的值，而不是每次都调用get方法重新获取
                    get(){
                        // 这里的this指向的是Vue实例
                        // console.log(this)
                        return this.firstName +" "+ this.lastName
                    },
                    // set的参数是修改后的值
                    set(value){
                        // console.log('set修改后的showName：'+value)
                        const arr = value.split('')
                        this.firstName = arr[0]
                        this.lastName = arr[1]
                    }
                }
            }
        })

//精简写法
//大部分情况是不需要使用setter去修改计算属性的值，所以可以省略setter方法
//html
    <div id="root">

        <input type="text" v-model:value="firstName"><br><br>
        <input type="text" v-model:value="lastName"><br>
        <h1>{{showName}}</h1>
    </div>
//js
    	const app = new Vue({
            el:"#root",
            data:{
                    firstName: '阿',
                    lastName: '花'                
            },
            computed:{
                showName(){
                        return this.firstName +" "+ this.lastName
                    }
            }
        })
```
#### 5、监视属性
**`watch`:**
1. 当监视的属性发生变化时，回调函数自动调用
2. 监视的属性必须存在，才能进行监视
3. `data`中的属性和`computed`里的计算属性都是可以监视的
4. 监视属性可以执行异步操作而计算属性不行，因为计算属性是通过返回值来返回结果的
5. Vue管理的函数最好写成**原始函数**，这样this指向的就是Vue实例或者组件对象本身
6. 所有不被Vue管理的函数（定时器的回调，ajax的回调，promise的回调等），最好写成**箭头函数**，因为箭头函数没有this，会向外层找，外层由Vue管理的函数this指向Vue实例（**最终目标就是让this指向Vue实例**）
7. 当能用监视属性和监听属性同时实现时，优先选择计算属性

```javascript
//div
<div id="root">
    <h1>{{name}},你好</h1>
    <button @click="changeName">切换姓名</button>
</div>
//js
const app = new Vue({
            el:'#root',
            data:{
                info:true
            },
            computed: {
                name(){
                    return this.info ? '阿花' : 'ahua'
                }
            },
            methods: {
                changeName(){  
                    this.info = !this.info
                } 
            },
            watch:{
                // 监测info属性
                info:{
                    immediate:true,//初始化调用一次handler
                    // 当info发生改变时会调用handle
                    handler(newValue,oldValue){
                        console.log('info被修改了',newValue,oldValue)
                    }
                }
            }
        })   

//监视属性的另一种写法
app.$watch('info'){
	immediate:true,//初始化调用一次handler
	 // 当info发生改变时会调用handle
	 handler(newValue,oldValue){
	 console.log('info被修改了',newValue,oldValue)
}

//简写
       watch:{
             info(newValue,oldValue){
             console.log('info被修改了',newValue,oldValue)}
        }
```
当被监测内容是一个对象时，只修改对象的一个属性watch是监测不到的
```javascript
//检测多级结构中的某个属性
//div
<div id="root">
    <h1>{{message}},{{numbers.a}}</h1>
    <button @click="numbers.a++">点击我</button>
</div>
//js
const app = new Vue({
            el:'#root',
            data:{
                message:'你好',
                numbers:{
	            	a:1,
	            	b=2
            }
            },
            watch:{
            //对象里的key应该是字符串，多层级时简写不合法
                'numbers.a':{
                    handler(newValue,oldValue){
                        console.log('a被修改了',newValue,oldValue)
                    }
                }
            }
        })  
//深度监测
 watch:{
       //配置深度监测，能监测到对象中只有一个属性变化的情况
      deep:true,
      numbers:{
          handler(newValue,oldValue){
              console.log('a被修改了',newValue,oldValue)
          }
      }
 }
```
#### 6、样式绑定
##### 6.1 class样式绑定
**写法`:class`，xxx可以是字符串，对象，数组**

字符串写法：适用于样式类名不确定，需要动态指定
```javascript
//style
	<style>
        #root{
            text-align: center;
            line-height:200px;
            height: 200px;
            width: 200px;
        }
        .blue{
            background-color:blue;
        }
        .boder{
            border: 2px;
            border-color: blueviolet;
        }
        .red{
            background-color: red;
        }
    </style>
//div
	<div id="root" class="boder" :class="color"   @click = "changeColor">
        {{message}}
    </div>
//js
	const app = new Vue({
            el:'#root',
            data:{
                message:"阿花",
                color:'blue'
            },
            methods: {
                changeColor(){
                    this.color = 'red'
                }
            },

        })   
```
数组写法：需要绑定的样式不确定，名字也不确定
```javascript
//style
	   .text{
            font-weight: 900;
        }
        .border{
            border-radius: 50%;
        }
        .red{
            background-color: red;
        }
//div
    <div id="root"  :class="arr"   @click = "changeColor">
        {{message}}
    </div>
//js
	const app = new Vue({
            el:'#root',
            data:{
                message:"阿花",
                color:'blue',
                arr:['text','border','red']
            },
            methods: {
                changeColor(){
                    this.arr.shift()
                }
            },
        })            
```
对象写法：绑定的样式确认，名字也确认，但是动态决定使用
```javascript
//style
	   .text{
            font-weight: 900;
        }
        .border{
            border-radius: 50%;
        }
        .red{
            background-color: red;
        }
//div
    <div id="root"  :class="obj"   @click = "changeColor">
        {{message}}
    </div>
//js
	const app = new Vue({
            el:'#root',
            data:{
                message:"阿花",
                color:'blue',
                obj:{
                	text:true,
                	border:false,
                	red:true
                }
            }
        })            
```
##### 6.2 style样式绑定
这个使用较少，也有对象和数组两个写法，下面是对象写法
```javascript
//html
	<div id="root"  :style="styleObj">
        {{message}}
	</div>

//js
		const app = new Vue({
            el:'#root',
            data:{
                message:"阿花",
                color:'blue',
                arr:['text','border','red'],
                styleObj:{
                    backgroundColor:'red',
                    fontSize:'60px'
                }
            }            
        })          
```
#### 7、条件渲染

##### 7.1 v-show
条件渲染，动态控制节点是否展示，适用于**切换频率较高**的场景，**不移除**不展示的dom元素，仅仅是设置了`display:none`
```javascript
//div
<div id="root">
        <h1 v-show="info">{{message}},你好</h1>
        //可以直接写表达式
        <h1 v-show="1===5">{{message}},你好</h1>
</div>
//js
        const app = new Vue({
            el:'#root',
            data:{
                info:false,
                message:'阿花',               
            }   
        })
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/40cf2d9e775d4eb6bc5a4b55ae6251ec.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
##### 7.2 v-if
条件渲染，动态控制节点是否存在，适用于切换频率较低的场景，不展示的dom直接被移除（注释掉了）
```javascript
//html
    <div id="root">
    	<h1 v-if="false">麻园诗人</h1>
        <button @click="n++">点我显示{{n}}</button>
        <h1 v-if="n === 1">夏日入侵企划</h1>
        <h1 v-if="n === 2">痛仰</h1>
        <h1 v-if="n === 3">回春丹</h1>
    </div>
    //js
    const app = new Vue({
            el:'#root',
            data:{
                info:false,
                n:0            
            }   
    })   
    
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b3675cdcadc43eb8cc5b9c31e293877.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
**template**
`template`只能和`v-if`配合使用，相当于一个容器，但是不会在页面上渲染出来

```javascript

<div id="root">
    <template>  
        <h1 v-if="n === 0">夏日入侵企划</h1> 
        <h1 v-else-if="n === 2">痛仰</h1>
        <h1 v-else-if="n === 3">回春丹</h1>
    </template>
</div>
    //js
    const app = new Vue({
            el:'#root',
            data:{
                info:false,
                n:0            
            }   
    })  
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b70101f053dc43a89a4471f325d0cd6d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

##### 7.3 v-else-if
如果`v-if`成立，则`v-else-if`后面的代码不再执行，都不成立执行`else`后面的语句。`if`和`else-if`中间不能被其他语句隔断，否则没有`else-if`效果
```javascript
//html
    <div id="root">
        <button @click="n++">点我显示{{n}}</button>
        <h1 v-if="n === 1">夏日入侵企划</h1>
        <h1 v-else-if="n === 2">痛仰</h1>
        <h1 v-else-if="n === 3">回春丹</h1>
        <h1 v-else>康姆士</h1>
    </div>
//js
    const app = new Vue({
            el:'#root',
            data:{
                info:false,
                n:0            
            }   
    })   
    
```
注：`v-if="false`"后，页面中就无法找到该节点了，因为已经被注释掉了，但是`v-show="false"`后，页面中还是能找到这个节点的，因为只是设置了`display:none`隐藏了而已
#### 8、列表渲染
##### 8.1 v-for
`语法：v-for="xxx in xxx" :key="yyy"`，key可以由自己设置，也可以使用index索引

只要通过`v-for`遍历的方式去生成多个同样结构的数据，就需要为每个结构起个名字或者设置一个key标识（不设置也行，vue会默认以index作为key）
```javascript
    <div id="root">
        <ul>
        //遍历数组类型
        //p相当于形参，index是每项数据在数组中的索引，从参数池personList里遍历出来，类似`for in` 
        	//以index作为key值
         	<li v-for="(p,index) in personsList" :key ="index">{{p.name}}-{{p.age}}</li>
         	//自定义key值
         	<li v-for="(p,index) in personsList" :key ="p.id">{{p.name}}-{{p.age}}</li>
         	//遍历对象类型
        	<li v-for="(value,key) in bandList" :key ="key">{{key}}-{{value}}</li>
        	//遍历字符串
        	//这里的index遍历出来的是字符串中每个字母的位置
        	<li v-for="(char,index) in charList" :key ="key">{{char}}-{{index}}</li>
        	//遍历指定次数
        	<li v-for="(number,index) in 6" :key ="index">{{char}}-{{index}}</li>

        </ul>
        
	</div>
    //js
    <script>
        const app = new Vue({
            el:'#root',
            data:{
                personsList:[
                    {id:01,name:"张三",age:14},
                    {id:02,name:"李四",age:15},
                    {id:03,name:"赵六",age:16}
                ],
                bandList:{
                    name:"回春丹",
                    lendSinger:"刘西蒙",
                    magnumOpus:"正义"
                },
                charList:"ahua"
                
            }   
        })
```
##### 8.2 key的作用（key的内部原理）
1. 虚拟dom中key的作用：
key是dom对象的标识，当状态或者数据发生变化时，Vue会根据新数据生成新的虚拟dom，随后Vue进行新虚拟dom与旧虚拟dom的比较
2. 对比规则：
	（1）旧虚拟dom中找到了与新虚拟dom中相同的key
	
 		 若虚拟dom中的内容没有改变，直接使用之前的真实dom（复用）
		 若虚拟dom中的内容变了，则生成新的真实dom，替换掉之前的真实dom
	（2）旧虚拟dom中未找到与新虚拟dom中相同的key
	
			创建新的真实dom，然后渲染到页面
3. 用index作为key会出现的问题
	
		1.若对数据进行：逆序添加，逆序删除等破坏顺序操作会产生没有必要的真实dom更新，页面效果没有问题，但是效率低
		2.如果结构中还含有输入类dom（input），会产生错误的dom更新，输入类dom中已经输入的内容会被新添加的dom使用

4. 如何选择key

		1.最好使用每条数据的唯一标识作为key
		2.如果不存在对数据的逆序添加，逆序删除等破坏顺序的操作，使用index作为key是没问题的
5. key值在真实dom中是不会被渲染出来的
##### 8.3 列表过滤
在输入框中输入关键字，实现简单查询功能
```javascript
//div
    <div id="root">
        <input type="text" placeholder="请输入查询内容" v-model="seachWord">
        <ul>
            <li v-for="(p,index) in resultList" :key="index">{{p.name}}-{{p.age}}-{{p.id}}</li>
        </ul>
    </div>
//js
		const app = new Vue({
            el:'#root',
            data:{
                personsList:[
                    {id:01,name:"张三丰",age:14},
                    {id:02,name:"李四丰",age:15},
                    {id:03,name:"李六",age:16},
                    {id:04,name:"张六",age:16}
                ],
                seachWord:'',
                resultList:[]
            },
		//使用watch监听
            watch:{
                seachWord:{
		// 立即执行一次，newValue为空串，而每个字符串中都含空字符，即p.name.indexOf('') === 0，所以立即执行后页面上能直接显示出内容列表
                    immediate:true,
                    handler(newValue){
                        this.resultList = this.personsList.filter((p)=>{
                        return p.name.indexOf(newValue) !== -1
                    })
                    }
                    
                }
            }
        })  
 
		//使用computed计算属性实现
			computed:{
                resultList(){
		// 计算属性一开始就会调用一次，之后依赖的值发生改变都会调用一次
                    return this.personsList.filter((p)=>{
                        return p.name.indexOf(this.seachWord) !== -1
                    })
                }
            }
```

##### 8.4 列表排序
通过年龄大小，对已经筛选过的内容进行排序

```javascript
//div
    <div id="root">
        <input type="text" placeholder="请输入查询内容" v-model="seachWord">
        <button @click="sortType = 2">年龄升序</button>
        <button @click="sortType = 1">年龄降序</button>
        <button @click="sortType = 0">原顺序</button>
        <ul>
            <li v-for="p in resultList" :key="p.id">{{p.name}}-{{p.age}}   </li>
        </ul>
    </div>
//js
    const app = new Vue({
        el:'#root',
        data:{
            personsList:[
                {id:01,name:"张三丰",age:19},
                {id:02,name:"李四丰",age:15},
                {id:03,name:"李六",age:20},
                {id:04,name:"张六",age:16}
            ],
            seachWord:'',
            sortType:0  //0代表原顺序，1代表降序，2代表升序（自定义的，使用其他内容做代表也行）
        },
        computed:{
            resultList(){
                const arr =  this.personsList.filter((p)=>{
                    return p.name.indexOf(this.seachWord) !== -1
                    // 0转换为布尔值是false
                })
                if(this.sortType){
                        arr.sort((a,b)=>{
                            return this.sortType === 1 ? b.age-a.age : a.age-b.age
                        })
                    }
                return arr
            }
        }
    })   
```
#### 9、过滤器
对要显示的数据进行特定格式化后再显示（适用于一些简单的逻辑处理）
##### 9.1 局部过滤器
局部过滤器写在定义好的vue实例中，在其他组件中不能复用
```javascript
//div
<div id="root">
    <!-- 先读取管道符前的参数，然后传入到timeFormater中，执行完成后将返回值给timeFormater,再替换掉{{}}里面的插值语法 -->
    <h3>现在是：{{time | timeFormater}}</h3>
    <!-- 接收参数时，无论有没有传入管道符|前面的参数，Vue都会其作为第一个参数传入 -->
    <h3>现在是：{{time | timeFormater('YYYY_MM_DD')}}</h3>
    <!-- 过滤器串联时，先读取管道符前的参数，然后传入到timeFormater中，执行完成后将返回值给下一个过滤器作为参数，再将返回值返回替换插值语法 -->
    <h3>现在是：{{time | timeFormater('YYYY_MM_DD')|mySlice}} </h3>
    <!-- 过滤器还可以用在v-bind中 -->
    <h3 :ahua="message | mySlice">v-bind和过滤器</h3>
</div>
//js
    const app = new Vue({
        data() {
            return {
                time:1636618923735,
                message:"你好，阿花"
            }
        },
        // 过滤器本质是函数，可以对数据进行加工,
        filters:{
            // es6的形参默认值，不传入的时候默认是'YYYY年MM月DD日 HH:mm:ss'
            timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
            //这里的dayjs是调用了一个库去实现将时间戳转换为年月日
            //https://www.bootcdn.cn/dayjs/ 下载下来引用到本地即可
                return dayjs(value).format(str)
            },
            mySlice(years){
                return years.slice(0,4)
            }
        }
    })
    app.$mount('#root')
```
##### 9.2 全局过滤器
全局过滤器定义在Vue实例之前，所有组件中都能使用`Vue.filter(name,callback)`
```javascript
    Vue.filter('timeFormater',function(value,str='YYYY年MM月DD日 HH:mm:ss'){
        return dayjs(value).format(str)
    })
```
#### 10、其他内置指令
1. `v-text`：向所在的节点渲染文本内容，`v-text`会替换掉节点中的内容，插值语法不会
2. `v-html`:向指定节点上渲染包含`html`结构的内容，会替换掉节点中的所有内容。但是能识别出`html`结构，但是同时也带来了安全问题，在网站上动态渲染html结构容易导致**xss攻击**
3. `v-cloak`:特殊属性，Vue实例创建完毕并接管容器后，会删除掉v-cloak属性，一般配合css可以解决网速慢时的js堵塞问题
4. `v-once`：在初次动态渲染后就视为静态内容了，以后数据的改变都不会引起`v-once`所在结构的更新，可以用于优化性能
5. `v-pre`：跳过所在节点的编译过程，可以利用他跳过没有使用指令语法，插值语法的节点，加快编译速度
```javascript
//css
[v-cloak]{
	display:none
}
//div
//v-cloak配合css，先让容器隐藏，等Vue接管容器后会删除v-cloak，容器便会显示出来
    <div id="root" v-cloak>
        <div v-text="message"></div>
        <div v-html="message"></div>
     	<h2 v-once>初始化的num值：{{num}}</h2>
        <h2>当前的num值：{{num}}</h2>
        <button @click="num++">点我n+1</button>
    </div>
//js
	const app = new Vue({
	    el:'#root',
	    data() {
	        return {
	            message:'<h2>阿花，你好</h2>',
	            num:1	            
	        }
	    },
	})
```
#### 11、自定义属性
1. 定义在配置对象directives中，定义时指令名不加`v-`，使用时需要加`v-`
2.  vue不支持`camelCase`命名(小驼峰命名法),当指令名由多个单词组合在一起的时候建议用横线连接（`kebab-case`）,这时不能省略`' '`，形如：`'big-num'(){}`
3. vue**自定义指令**里面的**this**指向的是**window**，其他地方指向的都是vue实例

```javascript
//v-big指令实现将数字放大十倍
//v-fbind指令实现让输入框获得焦点
//div
    <div id="root">
        <h2>当前的值是：<span v-text="num"></span></h2>
        <h2>乘以10之后的值是：<span v-big="num"></span></h2>
        <h2>乘以100之后的值是：<span v-big-num="num"></span></h2>
        <button @click="num++">点我num＋1</button>
        <input type="text" v-fbind:value="num">
    </div>
//js
// 自定义指令也支持全局写法,类似全局过滤器
    Vue.directive('fbind',{
        bind(element,binding){
            element.value = binding.value
        },
        inserted(element,binding){
            element.focus()
        },
        update(element,binding) {
            element.value = binding.value
        }
    })
    const app = new Vue({
        el:'#root',
        data() {
            return {
                num:1
            }
        },
        directives:{
            
            // 函数写法
            // 自定义函数指令调用时机
            //1.当指令与元素成功绑定时调用  2.指令所在模板被重新解析时调用
            
            //第一个参数是当前绑定的真实dom元素  第二个参数是将元素和参数进行绑定后返回的结果对象
            big(element,binding){
                element.innerText = binding.value*10
            },

            // 对象写法
            // 这三个函数是vue定义好的，不支持改名，不然vue没法识别
            fbind:{
                // 指令和元素绑定成功后调用(未渲染到页面)
                bind(element,binding){
                    element.value = binding.value
                },
                // 指令所在元素被插入到页面时调用
                inserted(element,binding){
                    // 如果在指令和元素绑定时就获取焦点,这时模板刚被vue解析,还没有渲染到页面上,根本没有这个元素,自然获取焦点失败
                    element.focus()
                },
                // 指令所在模板被重新解析时
                update(element,binding) {
                    element.value = binding.value
                }
            },
            'big-num'(element,binding){
                element.innerText = binding.value*100
            }
            
        }
    })
```
#### 12、生命周期
1. 在vue解析模板字符串并渲染到页面上的每个关键的时间点，都会调用指定命名的函数，这些函数统称为生命周期函数
2. 生命周期又名生命周期回调函数，生命周期函数，生命周期钩子（在固定的时候将事先准备好的函数用钩子勾出来执行）
3. 生命周期函数名字不可更改，但是具体内容是开发人员自定义的
4. 生命周期函数的`this`指向的是**vue实例**或**组件实例对象**
5. Vue实例（vm）的生命周期
		
		将要创建 ===> 调用beforeCreate函数
		创建完毕 ===> 调用created函数
		将要挂载 ===> 调用beforeMount函数
		挂载完毕 ===> 调用mounted函数  =====（重要：发送ajax请求，启动定时器，绑定自定义事件，订阅消息等）
		将要更新 ===> 调用beforeUpdate函数
		更新完毕 ===> 调用updated函数
		将要销毁 ===> 调用beforeDestroy函数 === (重要：清除定时器，解绑自定义事件，取消订阅消息等)
		销毁完毕 ===> 调用destroyed函数
6. Vue实例销毁后，自定义事件会失效，但原生dom事件依然有效，一般不会在beforeDestroy操作数据，这个时候即使操作数据，也不会触发更新流程了
![在这里插入图片描述](https://img-blog.csdnimg.cn/81d636a6b65d48cf9ddb274c7cd0e642.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

测试周期内的每个函数，可以在相应位置加上debugger，让代码执行停在那一行

```javascript
//div
    <div id="root">
        <h2 >{{num}}</h2>
        <button @click="num++">点我n+1</button>
        <button @click="des">点我销毁vm</button>
    </div>
//js
    new Vue({
        el:"#root",
        data() {
            return{
                num:1
            }
        },
        methods: {
            des(){
                this.$destroy()
            }
        },
        beforeCreate() {
            console.log("beforeCreate")
            //debugger
        },
        created() {
            console.log("created")
        },
        beforeMount() {
            console.log("beforeMount")
        },
        mounted() {
            console.log("mounted")
        },
        beforeUpdate() {
            console.log("beforeUpdate")
        },
        updated() {
            console.log("updated")
        },
        beforeDestroy() {
            console.log("beforeDestroy")  
        },
        destroyed() {
            console.log("destroyed")
        },
    })
```
### 三、组件化编程
1. **组件**：实现应用中局部功能的代码和资源的集合，实现代码的复用，简化项目编码，提高运行效率
2. **模块化**：当应用中的js都是以模块来编写的，那这个应用就是一个模块化应用
3. **组件化**：当一个应用中的功能都是以多组件的方式来编写的，那这个应用就是一个组件化应用

![在这里插入图片描述](https://img-blog.csdnimg.cn/4523d98bf1274b41a5fa8f6c09026d09.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 1、非单文件组件
一个文件中包含n个组件
##### 1.1 组件的基本使用


1. 组件基本使用流程	

		1. 创建（定义）组件
			（1）使用Vue.extend(options)创建
			（2）options和new Vue例时基本相同
			（3）使用template配置组件结构
		2. 注册组件 （key value形式)
			（1）局部注册：new Vue时传入components选项
			（2）全局注册：Vue.componnent('组件名'，组件)
		3. 编写组件标签（写组件标签）
			以定义的组件名为标签
2. 组件中不能使用data的对象形式写法，只能使用函数式写法，避免组件复用时，数据存在引用关系

		1. 对象在两个不同地方被调用时，内存引用的是同一个地址，一处操作修改，其他处引用也会发生改变
		2. 函数被不同地方调用时，每次调用，都会返回一个全新的对象，一处修改时其他地方不会修改
3. 组件名规则
		
		1. 一个单词组成
			（1）首字母小写vue
			（2）首字母大写Vue
		2. 多个单词
			（1）kebab-case命名：my-vue
			（2）CamelCase命名：My-Vue（只有脚手架中可以使用）
		3. 组件名应该尽量避免html中已有的元素名称，如h1、H1、div、DIv等

4. 组件标签写法
		
		1. <vue></vue>
		2. <vue/>，这种写法不使用脚手架时会导致后续组件不能渲染
5. 可以在定义组件时使用name配置项设置组件在vue开发者工具中呈现的名字，注册组件时的命名只使用在组件标签上，不改变开发者工具中呈现的组件名
6. 简写形式，`const  组件名 = Vue.extend(options)` 可以简写为 `const  组件名 = options`
```javascript
//html
    <div id="root">
        <hi></hi>
        <hr>
        <h3>{{message}}</h3>
        <hr>
        <band></band>
        <hr>
        <team></team>
        <hr>
        <team></team>
    </div>
//js
// 创建band组件
        const band = Vue.extend({
            template: `
                <div>
                    <h2>乐队名称:{{name}}</h2>
                    <h2>代表作:{{main}}</h2>
                </div>            
            `,
            data(){
                return{
                    name:'回春丹',
                    main:'艾米莉'
                }
            }
        })
      //band组件简写形式
    // const band = {
    //     template: `
    //         <div>
    //             <h2>乐队名称:{{name}}</h2>
    //             <h2>代表作:{{main}}</h2>
    //         </div>            
    //     `,
    //     data(){
    //         return{
    //             name:'回春丹',
    //             main:'艾米莉'
    //         }
    //     }
    // }
        // 创建team组件
        const team = Vue.extend({
       
        	//name:'ahua'  自定义开发者工具中组件名显示为ahua
            template : `
                <div>
                    <h2>team名称:{{name}}</h2>
                    <h2>代表:{{main}}</h2>
                </div>            
            `,
            data(){
                return{
                    name:'tripper',
                    main:'skater'
                }
            }
        })

        const hi = Vue.extend({
            template : `
                <div>
                    <h2>{{message}}</h2>
                </div>            
            `,
            data(){
                return{
                    message:"新年快乐"
                }
            }
        })
		//全局注册:组件名，组件
        Vue.component('hi',hi)
       //局部注册
       new Vue({
            el:"#root",
            data:{
                message:"你好，阿花"
            },
            components:{
                band,
                // es6简写形式，原型为band:band
                team
            }
        })
```
##### 1.2 组件的嵌套

```javascript
//div
    <div id="root">
        <app></app>
    </div>
//js
    // 创建TeamNum组件,嵌套在里层的组件，要先定义在上面
    const team = Vue.extend({
        template : `
            <div>
                <h2>乐队人数:{{num}}</h2>
                <h2>新专:{{album}}</h2>
            </div>            
        `,
        data(){
            return{
                num:3,
                album:'耳鬼出风'
            }
        }
    })
    // 创建band组件
    const band = Vue.extend({
        template: `
            <div>
                <h2>乐队名称:{{name}}</h2>
                <h2>代表作:{{main}}</h2>
                <team></team>
            </div>            
        `,
        data(){
            return{
                name:'回春丹',
                main:'艾米莉'
            }
        },
        components:{
            team
        }
    })

    // 定义app组件，管理所有组件
    const app = Vue.extend({
        template:`
            <div>
                <band></band>    
            </div>
        `,
        components:{
            // team由band管理
            band
        }
    })

    new Vue({
            el:"#root",
            components:{
                app
            }
        })
```
##### 1.3 组件的本质
1. vue组件本质上是一个名为`VueComponent`的构造函数，是由`Vue.extend`生成的(可以省略Vue.extend，直接写{xxx}配置项)
2. 使用时写完组件标签后（\<band> \</band>），vue解析时会自动创建组件（band）的实例对象（和Vue实例对象一样），即执行：`new VueComponent(options)`
3. 每次调用`Vue.extend`，返回的都是一个全新的`VueCommonent`构造函数
4. 组件中的`data`函数，`methods`函数，`watch`函数，`computed`函数，他们的`this`均是`VueCommonent`实例对象
5. 组件是可复用的Vue实例，除了以下两点不同
		
		1. Vue实例对象可以通过el属性指定为哪个容器服务，而VueCommonent的实例对象不能指定服务的容器，只能通过Vue的实例对象来指定
		2. 创建组件实例对象时，data配置项只能写成函数式
```javascript
//div
    <div id="root">
        <band></band>
        <hr>
        <hello></hello>
    </div>
//js
    const band = Vue.extend({
        template: `
            <div>
                <h2>乐队名称:{{name}}</h2>
                <h2>代表作:{{main}}</h2>
                <button @click="showThis">输出组件this</button>
            </div>            
        `,
        data(){
            return{
                name:'回春丹',
                main:'艾米莉'
            }
        },
        methods: {
            showThis(){
                console.log('showThis',this)
            } 
        }
        
    })
    const hello = Vue.extend({
        template: `
            <div>
                <h2>{{message}}</h2>
            </div>            
        `,
        data(){
            return{
                message:"你好，vue！"
            }
        }
    })
    console.log(band)
    console.log(hello)
    new Vue({
            el:"#root",
            components:{
               band,
               hello
            }
    })

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/195c64c36240422b8522c6355624e082.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
**vue和VueComponent的关系**
 `VueComponent.prototype.__proto__===Vue.prototype`，目的是让组件实例对象可以访问到vue原型上的属性和方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/4fbed791a96e49c6820f42b0be182251.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5ZWKYemYv-iKsQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

```javascript
//div
    <div id="root">
        <band></band>
    </div>
//js
    //在Vue原型对象上添加一个x属性
    Vue.prototype.x = 1;

    // 创建band组件
    const band = Vue.extend({
        template: `
            <div>
                <h2>乐队名称:{{name}}</h2>
                <h2>代表作:{{main}}</h2>
                <button @click="showThisX">输出组件this</button>
            </div>            
        `,
        data(){
            return{
                name:'回春丹',
                main:'艾米莉'
            }
        },
        methods: {
            showThisX(){
                console.log('showThisX',this.x)
            } 
        }
    })

    new Vue({
            el:"#root",
            components:{
               band
            }
    })
```

#### 2、单文件组件
一个文件中只包含一个组件，由vue创建的.vue文件，包含html结构，js交互和css样式，但是单文件组件只能在脚手架中使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/cd70e8d26cfb4b76af28e77cdc61e408.png)

```javascript
//band.vue
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
```

```javascript
//App.vue
<template>
  <div>
      <band/>
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
}
</script>

```
### 四、浏览器的本地存储
1. 存储大小一般支持5mb左右（浏览器之间不同）
2. 浏览器通过Window.sessionStorage和Window.localStorage属性来实现本地存储
3. 相关api
```javascript
 xxxxStorage.setItem('key','value')
 //接收一个键和值作为参数，把键值对添加到存储中，如果键名在则更新值
 xxxxStorage.getItem('key')
 //接收一个键名作为参数，返回键名对应的值，如果没有这个值返回null
 xxxxStorage.removeItem('key')
 //接收一个键名作为参数，把改键名和对应的键值删除
 xxxxStorage.clear()
 //清空存储的所有数据
```
4. `sessionStorage`存储内容会随着浏览器的关闭而消失
5. `localStorage`存储的内容需要手动清除
7. `JSON.parse(null)`的结果还是null

## Vue 3.0
1. <font color='red'>性能的提升</font>

		打包大小减少41%
		
		初次渲染快55%, 更新渲染快133%
		
		内存减少54%
 2. <font color='red'>源码的升级</font>

		使用Proxy代替defineProperty实现响应式
		
		重写虚拟DOM的实现和Tree-Shaking

3. <font color='red'>拥抱TypeScript</font>

		 Vue3可以更好的支持TypeScript

4. <font color='red'>新的特性</font>

		1. Composition API（组合API）	
		   - setup配置
		   - ref与reactive
		   - watch与watchEffect
		   - provide与inject
		   - ......
		2. 新的内置组件
		   - Fragment 
		   - Teleport
		   - Suspense
		3. 其他改变
		   - 新的生命周期钩子
		   - data 选项应始终被声明为一个函数
		   - 移除keyCode支持作为 v-on 的修饰符
		   - ......






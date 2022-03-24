<template>
  <div>
    <div class="row">
        <banner/>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
            <!-- 原始编码使用a标签中的href属性实现页面跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a>
          <a class="list-group-item" href="./home.html">Home</a> -->

          <!-- 实现导航区点击切换路径 -->
          <!-- 用vue-router中提供的特殊标签router-link最后解析出来就是a标签 通过在to属性中添加路径进行跳转 -->
          <!-- action—class，当点击后会在模板中加入该属性下对应的样式 -->
          
            <router-link class="list-group-item " to="/about" active-class="active">About</router-link>
            <router-link class="list-group-item" to="/home"  active-class="active">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
              <!-- 指定组件的呈现位置 -->
              <router-view>

              </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
import banner from './component/banner.vue'
export default {
    name:'App',
    components:{
      banner
    }
}
</script>
<style >


</style>


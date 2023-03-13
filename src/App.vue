<template>
  <div id="app">
    <div class="outer">
      <!-- 頭部 -->
      <UesrHeader />
      <!-- 路由組件出口 -->
      <router-view></router-view>
      <!-- 底部 -->
      <UserFooter v-show="$route.meta.showFooter" />
    </div>
  </div>
</template>

<script>
import UesrHeader from "./components/UesrHeader"
import UserFooter from "./components/UserFooter"


export default {
  name: "App",
  components: {
    UesrHeader,
    UserFooter
  },
  mounted() {
    
    //在store小模組添加 namespaced:true 透過name可以直接取得該小模組數據
    //​ 當路由跳轉的時候—home和search來回切換的時候會重新發起TypeNav中getBaseCategoryList的數據請求
    //​ 我們這裡優化：只發起一次請求可以更好的優化性能
    this.$store.dispatch("home/getCateGoryList")
  }
}
</script>

<style lang="less">
.outer {
  margin: o auto;
}
</style>

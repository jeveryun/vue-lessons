<template>
  <div class="home">
    <h1>首页</h1>
    <VuexTest></VuexTest>
<!--    <router-view />-->
  </div>
</template>

<script>
import VuexTest from '@/components/vuex'
export default {
  name: 'home',
  components: {
    VuexTest
  }
}
</script>

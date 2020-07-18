<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<div>-->
      <!--<p>-->
        <!--If Element is successfully added to this project, you'll see an-->
        <!--<code v-text="'<el-button>'"></code>-->
        <!--below-->
      <!--</p>-->
      <!--<el-button>el-button</el-button>-->
    <!--</div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

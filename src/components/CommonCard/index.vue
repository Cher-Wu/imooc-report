<template>
  <div class="common-card">
    <div class="title">{{title}}</div>
    <div class="value">{{value}}</div>
    <!--slot标记向父组件开放的2个插槽-->
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name = "footer"></slot>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        title: String,
        value: String
      }
    }
</script>

<!--全局样式-->
<style lang="scss">
  .emphasis {
    margin-left: 5px;
    color: #666;
    font-weight: 700;
  }
</style>

<style scoped>
  .title {
    font-size: 12px;
    color: #999;
  }
  .value {
    font-size: 25px;
    color: #000;
    margin-top: 5px;
    letter-spacing: 1px;
  }
  .chart {
    height: 50px;
    /*background-color: bisque;*/
  }
  .line {
    margin: 10px 0;
    border-top: 1px solid #ddd;
  }
  .total {
    font-size: 12px;
    color: #999;
  }
</style>

<template>
  <common-card
    title="累计销售额"
    value="￥ 75,540,830"
  >
    <template>
      <div class="compare-wrapper">
        <div class = "compare">
          <span>日同比</span>
          <span class="emphasis">151.80%</span>
          <div class="increase"></div>
        </div>
        <div class = "compare">
          <span>月同比</span>
          <span class="emphasis">225.61%</span>
          <div class="decrease"></div>
        </div>
        </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额</span>
      <span class="emphasis">¥ 30,000,000</span>
    </template>
  </common-card>
</template>

<script>
  import CommonCard from '../CommonCard'
    export default {
        components: {
          CommonCard
        }
    }
</script>

<style lang="scss" scoped>
  .compare-wrapper {
    height: 100%;
    display: flex;
    /*弹性盒子*/
    flex-direction: column;
    /*垂直分布*/
    justify-content: center;
    /*居中*/
    .compare {
      display: flex;
      align-items: center;
      margin-top: 3px;
      font-size: 12px;
      /*background-color: #ecc;*/
    }
  }
</style>

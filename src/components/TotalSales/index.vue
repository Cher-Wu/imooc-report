<template>
  <common-card
    title="累计销售额"
    :value="salesToday"
  >
    <template>
      <div class="compare-wrapper">
        <div class = "compare">
          <span>日同比</span>
          <span class="emphasis">{{salesGrowthLastDay}}</span>
          <div class="increase"></div>
        </div>
        <div class = "compare">
          <span>月同比</span>
          <span class="emphasis">{{salesGrowthLastMonth}}</span>
          <div class="decrease"></div>
        </div>
        </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额</span>
      <span class="emphasis">{{salesLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
  import CommonCard from '../CommonCard'
  import commonDataMixin from '../../mixins/commonDataMixins'
    export default {
        components: {
          CommonCard
        },
        mixins: [commonDataMixin]
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

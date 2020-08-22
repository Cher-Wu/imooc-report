<template>
  <common-card
    title="今日交易用户数"
    :value="orderUser"
  >
    <template>
      <v-chart :options ="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="emphasis">{{returnRate}}</span>
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
        mixins: [commonDataMixin],
      methods: {
        getOptions () {
          return {
            color: '#7dace4',
            xAxis: {
              type: 'category',
              data: this.orderUserTrendAxis,
              show: false
            },
            tooltip: {},
            yAxis: {
              show: false
            },
            series: [{
              name: '用户实时交易量',
              type: 'bar',
              data: this.orderUserTrend,
              barWidth: '60%'
              // 面积填色
            }],
              // 撑满区域显示
              grid: {
              top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>

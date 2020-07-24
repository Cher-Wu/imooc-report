<template>
  <common-card
    title="今日交易用户数"
    value="1,245,872"
  >
    <template>
      <v-chart :options ="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="emphasis">5.53%</span>
    </template>
  </common-card>
</template>

<script>
  import CommonCard from '../CommonCard'
    export default {
        components: {
          CommonCard
        },
      methods: {
        getOptions () {
          return {
            color: '#7dace4',
              xAxis: {
              type: 'category',
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
                show: false
            },
            yAxis: {
              show: false
            },
            series: [{
              type: 'bar',
              data: [234, 435, 654, 675, 233, 565, 454, 333, 546, 800, 244, 325],
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

<template>
  <common-card
    title="累计订单量"
    value="4,527,507"
  >
    <template>
      <v-chart :options ="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="emphasis">2,000,000</span>
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
              xAxis: {
                type: 'category',
                show: false,
                // 图表与两侧x轴的距离
                boundaryGap: false
              },
              yAxis: {
                show: false
              },
              series: [{
                type: 'line',
                data: [234, 435, 654, 675, 233, 565, 454, 333, 546, 800, 244, 325],
                // 面积填色
                areaStyle: {
                  color: '#8971d0'
                  // 色值备选：#7dace4，#95e8d7，#adf7d1
                },
                lineStyle: {
                  width: 0
                },
                // 节点样式
                itemStyle: {
                  opacity: 0
                },
                // 使线条平滑
                smooth: true
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

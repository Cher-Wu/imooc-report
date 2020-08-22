<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <template>
      <v-chart :options ="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="emphasis">{{orderLastDay}}</span>
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
            // 加入判断，获取值之后才会开始渲染
            return this.orderTrend.length > 0 ? {
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
                data: this.orderTrend,
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
            } : null
          }
        }
    }
</script>

<style scoped>

</style>

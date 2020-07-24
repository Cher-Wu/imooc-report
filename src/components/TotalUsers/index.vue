<template>
  <common-card
    title="累计用户数"
    value="2,284,634"
  >
    <template>
      <v-chart :options ="getOptions()" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">128.40%</span>
        <div class="increase"></div>
        <span class="month">月同比</span>
        <span class="emphasis">185.50%</span>
        <div class="decrease"></div>
      </div>
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
              grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              },
              xAxis: {
                type: 'value',
                show: false
              },
              yAxis: {
                type: 'category',
                show: false
              },
              series: [{
                type: 'bar',
                // 通过stack属性把多个图形合并为1个
                stack: '总量',
                data: [200],
                barWidth: '20%',
                itemStyle: {
                  color: '#95e8d7'
                }
              }, {
                type: 'bar',
                stack: '总量',
                data: [300],
                itemStyle: {
                  color: '#eee'
                }
              }, {
                // 自定义图形????????
                type: 'custom',
                data: [200],
                renderItem: (params, api) => {
                  const value = api.value(0)
                  // endPoint获取节点位置
                  const endPoint = api.coord([value, 0])

                  return {
                    type: 'group',
                    position: endPoint,
                    children: [{
                      type: 'path',
                      shape: {
                        d: 'M228.266667 347.733333h569.6c14.933333 0 25.6 4.266667 27.733333 12.8 4.266667 8.533333 0 17.066667-10.666667 27.733334l-281.6 281.6c-4.266667 4.266667-12.8 8.533333-19.2 8.533333-8.533333 0-14.933333-2.133333-19.2-8.533333l-281.6-281.6c-10.666667-10.666667-14.933333-21.333333-10.666666-27.733334 0-8.533333 8.533333-12.8 25.6-12.8z',
                        x: -5,
                        y: -20,
                        width: 10,
                        height: 10,
                        // layout根据实际div大小缩放拉伸
                        layout: 'cover'
                      },
                      style: {
                        fill: '#95e8d7'
                      }
                    }, {
                      type: 'path',
                      shape: {
                        d: 'M531.2 354.133333l281.6 281.6c10.666667 10.666667 14.933333 21.333333 10.666667 27.733334-4.266667 8.533333-12.8 12.8-27.733334 12.8h-569.6c-14.933333 0-25.6-4.266667-27.733333-12.8-4.266667-8.533333 0-17.066667 10.666667-27.733334l281.6-281.6c4.266667-4.266667 12.8-8.533333 19.2-8.533333s17.066667 4.266667 21.333333 8.533333z',
                        x: -5,
                        y: 10,
                        width: 10,
                        height: 10,
                        layout: 'cover'
                      },
                      style: {
                        fill: '#95e8d7'
                      }
                    }
                    ]
                  }
                }
              }]
            }
          }
      }
    }
</script>
<!--<svg t="1595166951405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4945" width="200" height="200"><path d="M228.266667 347.733333h569.6c14.933333 0 25.6 4.266667 27.733333 12.8 4.266667 8.533333 0 17.066667-10.666667 27.733334l-281.6 281.6c-4.266667 4.266667-12.8 8.533333-19.2 8.533333-8.533333 0-14.933333-2.133333-19.2-8.533333l-281.6-281.6c-10.666667-10.666667-14.933333-21.333333-10.666666-27.733334 0-8.533333 8.533333-12.8 25.6-12.8z" p-id="4946"></path></svg>-->
<!--<svg t="1595166968515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5083" width="200" height="200"><path d="M531.2 354.133333l281.6 281.6c10.666667 10.666667 14.933333 21.333333 10.666667 27.733334-4.266667 8.533333-12.8 12.8-27.733334 12.8h-569.6c-14.933333 0-25.6-4.266667-27.733333-12.8-4.266667-8.533333 0-17.066667 10.666667-27.733334l281.6-281.6c4.266667-4.266667 12.8-8.533333 19.2-8.533333s17.066667 4.266667 21.333333 8.533333z" p-id="5084"></path></svg>-->
<style scoped>
  .total-users-footer {
    display: flex;
    align-items: center;
    /*垂直居中*/
  }
  .total-users-footer .month {
    margin-left: 10px;
  }
</style>

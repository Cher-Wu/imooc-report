<template>
  <ve-liquidfill
  :data="chartData"
  height = "100%"
  :settings="chartSettings"
  ></ve-liquidfill>
</template>

<script>
  import commonDataMixin from '../../mixins/commonDataMixins'
  function getColor (value) {
      // console.log(value)
      let ballColor = '#95e8d7'
      if (value > 0.5 && value <= 0.8) {
          ballColor = '#7dace4'
      } else if (value > 0.8) {
          ballColor = '#8971d0'
      }
      return ballColor
  }
  export default {
    /* eslint-disable */
    mixins: [commonDataMixin],
    watch: {
      userGrowthLastMonth () {
        console.log(this.userGrowthLastMonth)
        this.chartData = {
          columns: ['title', 'percent'],
          rows: [{
            title: '用户月同比增长',
            percent: this.userGrowthLastMonth / 1000
          }]
        }
        this.chartSettings = {
          wave: [0.5],
          // seriesMap修改水球图样式
          seriesMap: {
            '用户月同比增长': {
              radius: '80%',
              label: {
                  normal: {
                      formatter: (v) => {
                          // console.log(v)
                          return `${(v.data.value * 100).toFixed(2)}%`
                          // 改成百分数形式，并取整
                      },
                      textStyle: {
                      fontSize: 36,
                      color: '#999',
                      fontWeight: 'normal'
                      },
                      // 居中显示label
                      position: ['50%', '50%']
                  }
              },
              // 外边框样式
              outline: {
                  itemStyle: {
                      borderColor: '#aaa4a4',
                      borderWidth: 1,
                      color: 'none',
                      shadowBlur: 0,
                      shadowColor: '#fff'
                  },
                  // 内外边框的间距
                  borderDistance: 0
              },
              backgroundStyle: {
                  color: '#fff'
              },
              itemStyle: {
                  shadowBlur: 0
                  // shadowColor: '#fff'
              },
              amplitude: '8%',
              color: [getColor(this.chartData.rows[0].percent)]
            }
          }
        }
      }
    },
    data () {
      return {
        // 数据
        chartData: {},
        // 样式定义 
        chartSettings: {}
      }
    },
  }
</script>

<style lang = "scss" scoped>

</style>

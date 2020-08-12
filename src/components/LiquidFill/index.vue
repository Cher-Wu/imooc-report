<template>
  <ve-liquidfill
  :data="chartData"
  height = "100%"
  :settings="chartSettings"
  ></ve-liquidfill>
</template>

<script>
  function getColor (value) {
      console.log(value)
      let ballColor = '#95e8d7'
      if (value > 0.5 && value <= 0.8) {
          ballColor = '#7dace4'
      } else if (value > 0.8) {
          ballColor = '#8971d0'
      }
      return ballColor
  }
  export default {
    data () {
        /* eslint-disable */
      return {
        chartData: {
          columns: ['title', 'percent'],
          rows: [{
            title: 'rate',
            percent: 0.6899
          }]
        },
        chartSettings: {}
      }
    },
    //DOM渲染完毕后执行mouted
    mounted() {
        this.chartSettings = {
        wave: [0.5],
        // seriesMap修改水球图样式
        seriesMap: {
          'rate': {
            radius: '80%',
            label: {
                normal: {
                    formatter: (v) => {
                        console.log(v)
                        return `${Math.floor(v.data.value * 100)}%`
                        // 把标注的小数改成百分数形式，并取整
                    },
                    textStyle: {
                    fontSize: 36,
                    color: '#999',
                    fontWeight: 'normal'
                    },
                    position: ['50%', '50%']//居中显示label
                }
            },
            outline: {//外边框样式
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
  }
</script>

<style lang = "scss" scoped>

</style>

<template>
  <ve-bmap
    :settings = "chartSettings"
    :title = "title"
    :tooltip = "chartTooltip"
    :series = "chartSeries"
    height = "100%">
  </ve-bmap>
  <!-- 与echarts配置项对应的属性也被加到了组件上,参见https://v-charts.js.org/#/props “echarts options 属性”-->
</template>

<script>
  import commonDataMixin from '../../mixins/commonDataMixins'
  /* eslint-disable */
  // toPoints把数据转换成需要的格式，即{ name: '南京', value: [118.78, 32.04, 100]}
  function toPoints(data, geodata) {
    const res =[];
    const len = data.length;
    for(var i = 0; i < len; i++){
      const name = data[i].name;
      const value = data[i].value;
      const coord = geodata[name];
      res.push({
        name,
        value: [coord[0], coord[1], value]
      });
    }
    return res;
  }
  export default {
    mixins: [commonDataMixin],
    data () {
      return {
        title: {
          text: '外卖销售数据分布图',
          subtext: '销售趋势统计',
          sublink: 'http://www.imooc.com',
          // sublink为副标题设置外部链接
          top: 10,
          left: 'center'
        },
        chartSettings: {
          /* eslint-disable */
          key: 'R2stL9czvDpfRHBO69uN65OVjGgG3ITn',
          bmap: {
            center: [120.19, 35.26],
            zoom: 5,
            roam: true,
            mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
          }
        },
        chartTooltip: {},
        chartSeries: []
      }
    },
    watch: {
      mapData () {
        // console.log('map')
        // console.log(this.mapData)
        // 获取实时更新的数据
        const {data, geo} = this.mapData
        // 把数据转换成需要的格式
        const mapPoints = toPoints(data, geo)
        // console.log(mapPoints)
        this.chartSeries = [{
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: mapPoints,
          encode: {
            value: 2
            // 悬浮窗的数据提示，显示第3个值
          },
          //symbolsize控制点的大小
          symbolSize: function(val) {
            return val[2] / 10
          },
          itemStyle: {
            color: '#8971d0'
          },
          // emphasis设置鼠标移到上面显示label
          emphasis: {
            label: {
              show: true,
              position: 'top',
              //position注记的显示位置
              formatter: function(val) {
                // console.log(val);
                return `${val.data.name}${val.value[2]}`
              }
              //formatter选择s显示哪个属性
            }
          }
        }, {
          name: 'Top 2',
          // 带动效的点符号
          type: 'effectScatter',
          // 获取前10个数据
          coordinateSystem: 'bmap',
          data: mapPoints.sort(function(a, b) {
            return b.value[2] - a.value[2]
          }).slice(0, 10), 
          encode: {
            value: 2
            // 悬浮窗的数据提示，显示第3个值
          },
          symbolSize: function(val) {
            return val[2] / 10
          },
          itemStyle: {
            color: '#8971d0',
            shadowBlur: 20,//阴影
            shadowColor: '#dbc6eb'
          },
          // emphasis设置鼠标移到上面显示label
          emphasis: {
            label: {
              show: true,
              position: 'top',
              //position注记的显示位置
              formatter: function(val) {
                // console.log(val);
                return `${val.data.name}${val.value[2]}`
              }
              //formatter选择s显示哪个属性
            }
          },
          hoverAnimation: true,
          rippleEffect: {
            //修改波纹样式
            brushType: 'stroke'
          }
        }]
      }
    }
  }
</script>
<style lang = "scss" scoped>
</style>

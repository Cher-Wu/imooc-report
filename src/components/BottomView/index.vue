<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">104,866</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">218,833</div>
                <v-chart :options="searchNumberOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" />
                <el-table-column prop="keyword" label="关键字" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="rate" label="点击率" />
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :page-size="4"
                :total="100"
                background
                @current-change="onPageChange"
              ></el-pagination>
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size = "small">
                <el-radio-button label="品类" />
                <el-radio-button label="商品" />
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          searchUserOption: {
            xAxis: {
              type: 'category',
              show: false,
              // boundaryGap表示图表与两侧x轴的距离,默认是存在距离的，所以不贴边有空隙，需要进行设置
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
                color: '#adf7d1',
                opacity: 0.5
                // 色值备选：#7dace4，#95e8d7，#adf7d1
              },
              lineStyle: {
                color: '#95e8d7'
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
          },
          searchNumberOption: {
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
                color: '#adf7d1',
                opacity: 0.5
                // 色值备选：#7dace4，#95e8d7，#adf7d1
              },
              lineStyle: {
                color: '#95e8d7'
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
          },
          tableData: [{
            id: 1, rank: 1, keyword: '北京', count: 100, users: 90, rate: '90%'
          }, {
            id: 2, rank: 2, keyword: '北京', count: 100, users: 90, rate: '90%'
          }, {
            id: 3, rank: 3, keyword: '北京', count: 100, users: 90, rate: '90%'
          }, {
            id: 4, rank: 4, keyword: '北京', count: 100, users: 90, rate: '90%'
          }],
          radioSelect: '品类',
          categoryOptions: {}
        }
      },
      methods: {
        onPageChange (page) {
          console.log(page)
        },
        renderPieChart () {
          // ['粉面粥店', '简餐便当', '汉堡披萨', '香锅冒菜', '小吃炸串', '地方菜系'],
          const mockData = [
            {
              legendName: '粉面粥店',
              value: 67,
              percent: '15.40%',
              itemStyle: {
                color: '#8971d0'
              },
              // name属性用于标识图例
              name: '粉面粥店占比15.40%'
            }, {
              legendName: '简餐便当',
              value: 97,
              percent: '22.30%',
              itemStyle: {
                color: '#7dace4'
              },
              name: '简餐便当占比15.40%'
            }, {
              legendName: '汉堡披萨',
              value: 92,
              percent: '21.15%',
              itemStyle: {
                color: '#95e8d7'
              },
              name: '汉堡披萨占比15.40%'
            }, {
              legendName: '香锅冒菜',
              value: 67,
              percent: '15.40%',
              itemStyle: {
                color: '#adf7d1'
              },
              name: '香锅冒菜占比15.40%'
            }, {
              legendName: '小吃炸串',
              value: 67,
              percent: '15.40%',
              itemStyle: {
                color: '#dbc6eb'
              },
              name: '小吃炸串占比15.40%'
            }, {
              legendName: '地方菜系',
              value: 67,
              percent: '15.40%',
              itemStyle: {
                color: '#b9cced'
              },
              name: '地方菜系占比15.40%'
            }
          ]
          this.categoryOptions = {
            title: [{
              text: '品类分布',
              textStyle: {
                fontSize: 14,
                color: '#666'
              },
              left: 20,
              top: 20
            }, {
              text: '累计订单量',
              subtext: '320',
              x: '35%',
              y: '42.5%',
              textStyle: {
                fontSize: 14,
                color: '#999'
              },
              subtextStyle: {
                fontSize: 28,
                color: '#333'
              },
              textAlign: 'center'
            }],
            series: {
              name: '品类分布',
              type: 'pie',
              data: mockData,
              label: {
                normal: {
                  show: true,
                  position: 'outter',
                  formatter: function (params) {
                    return params.data.legendName
                  }
                }
              },
              // 圆心位置：宽度的35%，高度的50%
              center: ['35%', '50%'],
              // radius设置圆环的内外半径，内半径45%，外半径60%；默认值是['0%','75%']
              radius: ['45%', '60%'],
              // 指示线的样式
              labelLine: {
                normal: {
                  length: 5,
                  length2: 3,
                  smooth: true
                }
              },
              // 逆时针排列
              clockWise: false,
              // 为圆环设置描边
              itemStyle: {
                borderWidth: 4,
                borderColor: '#fff'
              }
            },
            // 此处定制图例的样式布局
            legend: {
              type: 'scroll',
              orient: 'vertical',
              height: 250,
              left: '70%',
              // top: 'middle'垂直居中显示
              top: 'middle',
              textStyle: {
                color: '#aaa'
              }
            },
            // 此处定制鼠标悬停显示的注记
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                console.log(params)
                const str = params.seriesName + '<br />' + params.marker + params.data.legendName + '<br />数量：' + params.data.value + '<br />占比：' + params.data.percent
                return str
              }
            }
          }
        }
      },
      mounted () {
        this.renderPieChart()
      }
    }
</script>

<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;
  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding-left: 10px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      /*color: lightcoral;*/
      font-weight: 500;
      padding-left: 20px;
      .radio-wrapper {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
    .chart-wrapper{
      display: flex;
      /*chart和table垂直分布*/
      flex-direction: column;
      height: 452px;
      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;
        flex-direction: row;
        .chart {
          flex: 1;
          padding: 0 10px;
          .chart-title {
            color: #999;
            font-size: 14px;
          }
          .chart-data {
            color: #333;
            font-size: 22px;
            font-weight: 500;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 0 20px;
        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <!-- 头部header模板 -->
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <!-- body部分模板 -->
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{userCount}}</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{searchCount}}</div>
                <v-chart :options="searchNumberOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" />
                <el-table-column prop="keyword" label="关键字" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="rate" label="搜索占比" />
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
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
              <el-radio-group v-model="radioSelect" size = "small" @change="onCategoryChange">
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
    import commonDataMixin from '../../mixins/commonDataMixins'
    export default {
      mixins: [commonDataMixin],
      data () {
        return {
          searchUserOption: {},
          searchNumberOption: {},
          userCount: 0,
          searchCount: 0,
          // 表格总数据
          totalData: [],
          // 每一页的数据
          tableData: [],
          // 数据条目总数
          total: 0,
          // 每一页显示的条目数
          pageSize: 4,
          radioSelect: '品类',
          categoryOptions: {}
        }
      },
      methods: {
        onPageChange (page) {
          this.renderTable(page)
        },
        onCategoryChange (type) {
          this.radioSelect = type
          this.renderPieChart()
        },
        renderPieChart () {
          // 任何一个值为空，则返回
          if (!this.categoryShop.data1 || !this.categoryFruit.data1) {
            return
          }
          let data = []
          let axis = []
          let total = 0
          const colorBar = ['#8971d0', '#7dace4', '#95e8d7', '#adf7d1', '#dbc6eb', '#b9cced', '#a0ccff']
          if (this.radioSelect === '品类') {
            data = this.categoryShop.data1
            axis = this.categoryShop.axisX
            total = data.reduce((s, i) => s + i, 0)
          } else {
            data = this.categoryFruit.data1
            axis = this.categoryFruit.axisX
            total = data.reduce((s, i) => s + i, 0)
          }
          const chartData = []
          data.forEach((item, index) => {
            const percent = `${(item / total * 100).toFixed(2)}%`
            chartData.push({
              legendName: axis[index],
              value: item,
              percent: percent,
              itemStyle: {
                color: colorBar[index]
              },
              name: `${axis[index]}占比${percent}`
            })
          })
          this.categoryOptions = {
            title: [{
              text: `${this.radioSelect}分布`,
              textStyle: {
                fontSize: 14,
                color: '#666'
              },
              left: 20,
              top: 20
            }, {
              text: '累计订单量',
              subtext: total,
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
              data: chartData,
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
                // console.log(params)
                const str = params.seriesName + '<br />' + params.marker + params.data.legendName + '<br />数量：' + params.data.value + '<br />占比：' + params.data.percent
                return str
              }
            }
          }
        },
        renderTable (page) {
          this.tableData = this.totalData.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        renderLineChart () {
          // 为了确保this的指向是正确的，所以使用箭头函数
          const creatOption = (key) => {
            const axis = []
            const searchData = []
            this.wordCloud.forEach(item => {
              axis.push(item.word)
              searchData.push(item[key])
            })
            return {
              xAxis: {
                type: 'category',
                data: axis,
                show: false,
                // boundaryGap表示图表与两侧x轴的距离,默认是存在距离的，所以不贴边有空隙，需要进行设置
                boundaryGap: false
              },
              yAxis: {
                show: false
              },
              tooltip: {},
              series: [{
                type: 'line',
                data: searchData,
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
            }
          }
          // 获取不同折线图数据 在原始数据中 对应的字段名
          this.searchUserOption = creatOption('user')
          this.searchNumberOption = creatOption('count')
        }
      },
      mounted () {
        this.renderPieChart()
      },
      watch: {
        wordCloud () {
          console.log('watch!!!')
          console.log(this.wordCloud)
          const totalArray = []
          this.wordCloud.forEach((item, index) => {
            totalArray.push({
              id: index + 1,
              rank: index + 1,
              keyword: item.word,
              count: item.count,
              users: item.user,
              rate: `${((item.user / item.count) * 100).toFixed(2)}%`
            })
          })
          this.totalData = totalArray
          this.total = this.totalData.length
          this.renderTable(1)
          // reduce累加器
          this.userCount = this.thousands(this.totalData.reduce((s, i) => i.users + s, 0))
          this.searchCount = this.thousands(this.totalData.reduce((s, i) => i.count + s, 0))
          this.renderLineChart()
        },
        categoryShop () {
          this.renderPieChart()
        },
        categoryFruit () {
          this.renderPieChart()
        }
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

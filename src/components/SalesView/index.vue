<template>
  <div class = "sales-view">
    <el-card shadow = "hover" :body-style="{ padding: '0 0 20px 0'}">
      <template v-slot:header>
        <div class="menu-wrapper">
          <!--index用于控制选中的选项卡的id-->
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="onMenuSelect"
            class="sales-menu"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <!--index用于控制选中的选项卡的id-->
            <el-menu mode="horizontal">
              <el-radio-group v-model="radioSelect" size = "small">
                <el-radio-button label="今日" />
                <el-radio-button label="本周" />
                <el-radio-button label="本月" />
                <el-radio-button label="今年" />
              </el-radio-group>
            </el-menu>
            <!--unlink-panels可以让左右两个日期选择器不联动变化-->
            <el-date-picker
              type="daterange"
              v-model="data"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              :picker-options = "pickerOptions "
              class = "data-picker-menu"
            ></el-date-picker>
          </div>
        </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options = "chartOption" />
          <div class="sales-view-list">
            <div class="sales-view-title">排行榜</div>
            <div class="list-item-wrapper">
              <div class="list-item" v-for="item in rankData" :key ="item.no">
                <!--class绑定-->
                <div :class="['list-item-no',+item.no <=3 ? 'top-no': '']">{{item.no}}</div>
                <div class="list-item-name">{{item.name}}</div>
                <div class="list-item-money">{{item.money}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
    import commonDataMixin from '../../mixins/commonDataMixins'
  /* eslint-disable */
    export default {
      mixins: [commonDataMixin],
      data () {
        return {
          // 默认选中的选项卡为'1' 
          activeIndex: '1',
          radioSelect: '今日',
          data: null,
          chartOption: {},
          // 自动获取三种时段
          pickerOptions: {
            shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                // new Date()获取的是当前的时间
                const start = new Date()
                const end = new Date()
                // getTime()获取时间戳，并倒退七天
                start.setTime(start.getTime()-3600*24*1000*7)
                picker.$emit('pick',[start, end])
              }
            },{
              text: "最近一个月",
              onClick(picker) {
                const start = new Date()
                const end = new Date()
                start.setTime(start.getTime()-3600*24*1000*30)
                picker.$emit('pick',[start, end])
              }
            },{
              text: "最近三个月",
              onClick(picker) {
                const start = new Date()
                const end = new Date()
                start.setTime(start.getTime()-3600*24*1000*90)
                picker.$emit('pick',[start, end])
              }
            }]
          }
        }
      },
      computed: {
        // 根据选项卡的选中状态， 判断此时显示销售额排行榜还是访问量排行榜
        rankData () {
          // console.log(this.activeIndex)
          return this.activeIndex === '1' ? this.orderRank : this.userRank
        }
      },
      watch: {
        // 默认状态下渲染年度销售额，只要调用完orderFullYear ()，就可以开始  渲染
        orderFullYear () {
          this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
        }
      },
      methods: {
        // onMenuSelect监听选择的选项卡的id
        onMenuSelect(index) {
          // 把index传入rankData中
          this.activeIndex = index
          if (index === '1') {
            this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
          } else {
            this.render(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
          }
          console.log(this.activeIndex)
        },
        // 用于判断当前图表的数据源--销售额or访问量
        render(data, axis, title) {
          this.chartOption = {
            title: {
              text: title,
              textStyle: {
                fontSize: 12,
                color: '#666'
              },
              top: 20,
              left: 25,
            },
            xAxis:{
              type: 'category',
              data: axis,
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisTick: {
                alignWithLabel: true,
                lineStyle: {
                  color: '#999'
                },
              },
              axisLabel: {
                color: '#333'
              }
            },
            yAxis:{
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: 'dotted',
                  color: '#999'
                }
              }
            },
            series:[{
              type: 'bar',
              barWidth: '35%',
              data: data
            }],
            color: ['#7dace4'],
            grid: {
              top: 70,
              left: 60,
              right: 60,
              bottom: 50
            }
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .sales-view {
    margin-top: 20px;
    .menu-wrapper {
      position: relative;
      display: flex;
      /*flex-direction: row;*/
      /*justify-content: space-between;*/
      /*align-items: center;*/
      .sales-menu {
        width: 100%;
        padding-left: 20px;
        .el-menu-item {
          height: 50px;
          line-height: 50px;
          /*margin: 0 20px;*/
        }
      }
      .menu-right {
        position: absolute;
        top: 0;
        right: 20px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .data-picker-menu {
          margin-left: 20px;
        }
      }
    }
  }
  .sales-view-chart-wrapper{
    display: flex;
    height: 270px;
    .echarts{
      flex:0 0 76%;
      width: 76%;
      height: 100%;
    }
    .sales-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .sales-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }
      .list-item-wrapper {
        margin-top: 15px;
        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          /*line-height: 20px;*/
          padding: 6px 20px 6px 0;
          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;
            &.top-no {
              background-color: black;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }
          .list-item-name {
            margin-left: 10px;
            color: #333;
          }
          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
</style>

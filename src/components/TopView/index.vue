<template>
  <div class="top-view">
    <el-row :gutter="20">
      <!--el-row和el-col的宽度都是24。-->
      <!--el-row的gutter控制列间距-->
      <!--el-col的span控制几等分，如果想要四列，则24/4=6，span的值为6-->
      <!--gutter的20为行间距，span的6为各列宽-->
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-orders />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-users />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    // 引入和注册
    import TotalSales from '../TotalSales'
    import TotalOrders from '../TotalOrders'
    import TodayUsers from '../TodayUsers'
    import TotalUsers from '../TotalUsers'
    export default {
      components: {
        TotalSales,
        TotalOrders,
        TodayUsers,
        TotalUsers
      }
    }
</script>

<style scoped>

</style>

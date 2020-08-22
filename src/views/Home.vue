<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
  import TopView from '../components/TopView'
  import SalesView from '../components/SalesView'
  import BottomView from '../components/BottomView'
  import MapView from '../components/MapView'
  import { searchData, mapScatter, screenData } from '../api'

  export default {
    name: 'Home',
    components: {
      TopView,
      SalesView,
      BottomView,
      MapView
    },
    data () {
      return {
        // 设置传入的3组数据的默认状态，设为null
        reportData: null,
        wordCloud: null,
        mapData: null
      }
    },
    methods: {
      getReportData () {
        return this.reportData
      },
      getWordCloud () {
        return this.wordCloud
      },
      getMapData () {
        return this.mapData
      }
    },
    // provide()把return后的内容传给下一级组件
    // 要考虑到provide和inject是在初始化完成后才存在，本来需要在mounted里
    provide () {
      return {
        getReportData: this.getReportData,
        getWordCloud: this.getWordCloud,
        getMapData: this.getMapData
      }
    },
    // 在整个页面渲染完之后调用wordcloud()方法
    // catch获取错误信息并弹窗显示wordcloud().catch(err => alert(err.message))
    mounted () {
      screenData().then(data => { this.reportData = data })
      searchData().then(data => { this.wordCloud = data })
      mapScatter().then(data => { this.mapData = data })
    }
  }
</script>

<style>
  .home {
    width: 100%;
    /* height: 100%; 注释掉使高度自适应*/
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }
</style>

<template>
  <ve-wordcloud :data="chartData" :settings="chartSettings" height="100%"></ve-wordcloud>
</template>

<script>
  import commonDataMixin from '../../mixins/commonDataMixins'
  export default {
    mixins: [commonDataMixin],
    watch: {
      wordCloud () {
        const data = []
        this.wordCloud.forEach(item => {
          data.push({
            word: item.word,
            count: item.count
          })
        })
        this.chartData = {
          columns: ['word', 'count'],
          rows: data
        }
      }
    },
    data () {
      return {
        chartData: {},
        chartSettings: {
        color: ['#8971d0', '#7dace4', '#95e8d7', '#adf7d1', '#dbc6eb'],
        shape: 'circle'
      }
      }
    }
  }
</script>

<style lang = "scss" scoped>

</style>

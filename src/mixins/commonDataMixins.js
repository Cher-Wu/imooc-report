// 可复用的代码
// format()转换为千分位函数
function format (v) {
    // // 匹配第一个表达式时，后面的表达式必须3个数字成组
    // const reg = /\d{1,3}(?=(\d{3}+$))/g
    // console.log(String(v).match(reg))
    // return `${v}`.replace(reg,'$&,')
    const oldStr = String(v)
    const newArray = []
    let count = 0
    for (let i = oldStr.length; i > 0; i--) {
        if (count > 0 && count % 3 === 0) {
            newArray.push(',')
        }
        count++
        newArray.push(oldStr.charAt(i - 1))
    }
    // console.log(newArray + 'shini')
    const newStr = newArray.reverse()
    return newStr.join('')
}

function wrapperOriginNumber (obj, k) {
    if (obj && obj[k]) {
        return obj[k]
    } else {
        return 0
    }
}

function wrapperNumber (obj, k) {
    if (obj && obj[k]) {
        return `${format(obj[k])}`
    } else {
        return 0
    }
}

function wrapperArray (obj, k) {
    if (obj && obj[k]) {
        return obj[k]
    } else {
        return []
    }
}

function wrapperMoney (obj, k) {
    if (obj && obj[k]) {
        return `¥ ${format(obj[k])}`
    } else {
        return '¥ 0.00'
    }
}

function wrapperPercentage (obj, k) {
    if (obj && obj[k]) {
        return `${obj[k]}%`// String
    } else {
        return 0
    }
}
// 迭代获取其子元素
function wrapperObject (obj, k) {
    if (obj && k.indexOf('.') >= 0) {
        const keys = k.split('.')
        keys.forEach(key => {
            obj = obj[key]
        })
        return obj
    } else {
        return obj && obj[k] ? obj[k] : {}
    }
}

export default {
    computed: {
        reportData () {
            console.log(this.getReportData())
            return this.getReportData()
        },
        // 累计销售额
        salesToday () {
            return wrapperMoney(this.reportData, 'salesToday')
        },
        salesGrowthLastDay () {
            return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
        },
        salesGrowthLastMonth () {
            return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
        },
        salesLastDay () {
            return wrapperMoney(this.reportData, 'salesLastDay')
        },
        // 累计订单量
        orderToday () {
            return wrapperNumber(this.reportData, 'orderToday')
        },
        orderLastDay () {
            return wrapperNumber(this.reportData, 'orderLastDay')
        },
        orderTrend () {
            return wrapperArray(this.reportData, 'orderTrend')
        },
        // 今日交易用户数
        orderUser () {
            return wrapperNumber(this.reportData, 'orderUser')
        },
        orderUserTrend () {
            return wrapperArray(this.reportData, 'orderUserTrend')
        },
        orderUserTrendAxis () {
            return wrapperArray(this.reportData, 'orderUserTrendAxis')
        },
        returnRate () {
            return wrapperPercentage(this.reportData, 'returnRate')
        },
        // 累计用户数
        userToday () {
            return wrapperOriginNumber(this.reportData, 'userToday')
        },
        userLastMonth () {
            return wrapperOriginNumber(this.reportData, 'userLastMonth')
        },
        userGrowthLastDay () {
            return wrapperPercentage(this.reportData, 'userGrowthLastDay')
        },
        userGrowthLastMonth () {
            return wrapperOriginNumber(this.reportData, 'userGrowthLastMonth')
        },
        // 年度销售额
        orderFullYear () {
            return wrapperArray(this.reportData, 'orderFullYear')
        },
        orderFullYearAxis () {
            return wrapperArray(this.reportData, 'orderFullYearAxis')
        },
        // 访问量
        userFullYear () {
            return wrapperArray(this.reportData, 'userFullYear')
        },
        userFullYearAxis () {
            return wrapperArray(this.reportData, 'userFullYearAxis')
        },
        // 排行榜
        orderRank () {
            return wrapperArray(this.reportData, 'orderRank')
        },
        userRank () {
            return wrapperArray(this.reportData, 'userRank')
        },
        // 品类分布数据
        categoryShop () {
            return wrapperObject(this.reportData, 'category.data1')
        },
        categoryFruit () {
            return wrapperObject(this.reportData, 'category.data2')
        },
        // 搜索量数据源
        wordCloud () {
            // console.log(this.getWordCloud())
            return this.getWordCloud()
        },
        // 地图数据
        mapData () {
            return this.getMapData()
        }
      },
      // inject接收父组件的内容
      methods: {
          thousands (v) {
              return format(v)
          }
      },
      inject: ['getReportData', 'getWordCloud', 'getMapData']
}

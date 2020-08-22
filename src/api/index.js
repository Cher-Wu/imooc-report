// 具体的api方法
import request from '../utils/request'

const icode = 'A3486F6CBAEC5670'
export function searchData () {
    // 返回的是promise对象
    return request({
        url: '/screen/wordcloud',
        // 实际请求的路径则为baseURL+url
        method: 'get',
        params: { icode }
    })
}
export function mapScatter () {
    return request({
        url: '/screen/map/scatter',
        method: 'get',
        params: { icode }
    })
}
export function screenData () {
    return request({
        url: '/screen/data',
        method: 'get',
        params: { icode }
    })
}

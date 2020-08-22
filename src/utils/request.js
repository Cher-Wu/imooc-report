// 请求的公共方法
import axios from 'axios'
// 通过axios.create()创建axios实例
// baseURL是接口请求的默认api,timeout是超时时间
const service = axios.create({
    baseURL: 'https://apis.imooc.com/',
    timeout: 5000
})
// 拦截器interceptors,自定义拦截器的内容
// error => {}定义异常处理，response => {}定义正常状况下的处理流程
service.interceptors.response.use(
    response => {
        // console.log(response)
        if (response.status === 200 && response.data) {
            // console.log(response.data)
            return response.data
        } else {
            return Promise.reject(new Error('请求失败'))
        }
    },
    error => {
        return Promise.reject(error)
    }
)
// 输出service
export default service

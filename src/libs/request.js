import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import { getToken } from '@/libs/util'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 100000  // 设置请求超时时间30s
})
/**
 * 请求参数处理
 */
service.interceptors.request.use((config) => {
    // config.method === 'post'

    /**
     * method类型
     *  1 get
     *  2 post
     *  3 post-form =>'Content-Type' = 'multipart/form-data'
     */
    config.method.split('-')[1] === 'form'
      ? config.data = config.data  //post-form 不对数据进行处理
      : config.method.split('-')[0] === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    //post-form 设置类型
    if (config.method.split('-')[1] === 'form') {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    //修正method
    config.method = config.method.split('-')[0] || 'get'
    return config
  }
)
/**
 * 响应结果处理
 */
service.interceptors.response.use(
  (response) => {
    // Spin.hide()
    if (response.data.code !== 0) {
      // Message.error(response.data.msg)
    }
    return Promise.resolve(response.data)
  }, error => {
    // Spin.hide()
    let message = ''
    console.log(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // location.reload()
          return
        case 403:
          message = error.response.data.path + ',' + error.response.data.message
          break
        case 502:
          message = '连接服务器失败'
          break
        default:
          message = error.response.data.message ? error.response.data.message : '服务器错误'
          break
      }
      // Message.error(message)
      // 请求错误处理
      return Promise.reject(error)
    } else {
      message = '连接服务器失败'
      // Message.error(message)
      return Promise.reject(error)
    }
  }
)

export default service

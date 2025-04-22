/**
 * API服务基础配置
 * 配置axios实例，设置拦截器，统一处理请求和响应
 */
import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9999/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('accessToken')

    // 如果存在token，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('请求添加了认证令牌:', config.url)
    } else {
      console.log('请求未添加认证令牌，可能需要登录:', config.url)
    }

    console.log('API请求配置:', {
      url: config.url,
      method: config.method,
      params: config.params,
      hasAuth: !!token,
    })

    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 记录响应日志
    console.log('API响应成功:', {
      url: response.config.url,
      status: response.status,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data),
      hasData: !!response.data,
    })

    // 只返回响应数据部分
    return response.data
  },
  (error) => {
    const { response } = error

    // 记录错误详情
    console.error('API响应错误:', {
      url: error.config?.url,
      status: response?.status,
      message: error.message,
      data: response?.data,
    })

    // 处理不同的错误状态码
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，清除token并重定向到登录页
          localStorage.removeItem('accessToken')
          // 如果有路由实例，可以在这里跳转到登录页
          // router.push('/login')
          console.error('未授权或token已过期')
          break

        case 403:
          console.error('没有权限访问此资源')
          break

        case 404:
          console.error('请求的资源不存在')
          break

        case 500:
          console.error('服务器错误')
          break

        default:
          console.error(`未处理的错误状态: ${response.status}`)
      }
    } else {
      // 网络错误或请求被取消
      console.error('网络错误或请求已取消')
    }

    return Promise.reject(error)
  },
)

export default api

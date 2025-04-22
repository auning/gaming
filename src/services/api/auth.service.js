/**
 * 认证相关API服务
 * 处理登录、注册、登出等认证相关请求
 */
import api from './index'
import axios from 'axios'

// 创建无认证API实例，用于不需要认证的请求（如注册、轮播图等）
const noAuthApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9999/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 用户登录
 * @param {string} usernameOrEmail - 用户名或邮箱
 * @param {string} password - 密码
 * @returns {Promise} - 登录响应
 */
export const login = (usernameOrEmail, password) => {
  // 创建URLSearchParams对象以发送form-urlencoded格式的数据
  const params = new URLSearchParams()
  params.append('username_or_email', usernameOrEmail)
  params.append('password', password)

  return api.post('/user/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

/**
 * 用户注册
 * @param {Object} userData - 用户数据
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @param {string} userData.email - 邮箱
 * @returns {Promise} - 注册响应
 */
export const register = (userData) => {
  // 创建URLSearchParams对象以发送form-urlencoded格式的数据
  const params = new URLSearchParams()
  params.append('username', userData.username)
  params.append('email', userData.email)
  params.append('password', userData.password)
  params.append('confirm_password', userData.confirm_password)

  console.log('注册请求参数:', userData)

  // 使用无认证API实例发送请求
  return noAuthApi
    .post('/user/register', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      console.log('注册响应:', response.data)
      return response.data
    })
    .catch((error) => {
      console.error('注册请求错误:', error)
      throw error
    })
}

/**
 * 用户登出
 * @returns {Promise} - 登出响应
 */
export const logout = () => {
  return api.post('/auth/logout')
}

/**
 * 刷新访问令牌
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise} - 新的访问令牌
 */
export const refreshToken = (refreshToken) => {
  return api.post('/auth/refresh-token', { refreshToken })
}

/**
 * 忘记密码请求
 * @param {string} email - 用户邮箱
 * @returns {Promise} - 重置密码邮件发送响应
 */
export const forgotPassword = (email) => {
  return api.post('/auth/forgot-password', { email })
}

/**
 * 重置密码
 * @param {string} token - 重置令牌
 * @param {string} newPassword - 新密码
 * @returns {Promise} - 密码重置响应
 */
export const resetPassword = (token, newPassword) => {
  return api.post('/auth/reset-password', { token, newPassword })
}

/**
 * 验证邮箱
 * @param {string} token - 邮箱验证令牌
 * @returns {Promise} - 邮箱验证响应
 */
export const verifyEmail = (token) => {
  return api.post('/auth/verify-email', { token })
}

export default {
  login,
  register,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
}

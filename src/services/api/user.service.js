/**
 * 用户相关API服务
 * 处理用户信息、资料更新等用户相关请求
 */
import api from './index'

/**
 * 获取当前用户信息
 * @returns {Promise} - 用户信息
 */
export const getCurrentUser = () => {
  return api.get('/user/profile')
}

/**
 * 更新用户资料
 * @param {Object} userData - 更新的用户数据
 * @returns {Promise} - 更新后的用户信息
 */
export const updateProfile = (userData) => {
  return api.put('/user/profile', userData)
}

/**
 * 更新用户头像
 * @param {FormData} formData - 包含头像文件的表单数据
 * @returns {Promise} - 更新后的头像URL
 */
export const updateAvatar = (formData) => {
  return api.post('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 修改密码
 * @param {string} currentPassword - 当前密码
 * @param {string} newPassword - 新密码
 * @returns {Promise} - 修改密码响应
 */
export const changePassword = (currentPassword, newPassword) => {
  return api.put('/user/password', { currentPassword, newPassword })
}

/**
 * 获取用户通知
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @returns {Promise} - 用户通知列表
 */
export const getNotifications = (page = 1, limit = 10) => {
  return api.get('/user/notifications', { params: { page, limit } })
}

/**
 * 读取通知
 * @param {string} notificationId - 通知ID
 * @returns {Promise} - 操作响应
 */
export const markNotificationAsRead = (notificationId) => {
  return api.put(`/user/notifications/${notificationId}/read`)
}

/**
 * 获取用户活动历史
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @returns {Promise} - 用户活动历史
 */
export const getActivityHistory = (page = 1, limit = 10) => {
  return api.get('/user/activity', { params: { page, limit } })
}

export default {
  getCurrentUser,
  updateProfile,
  updateAvatar,
  changePassword,
  getNotifications,
  markNotificationAsRead,
  getActivityHistory,
}

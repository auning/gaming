/**
 * 游戏相关API服务
 * 处理游戏列表、详情、分类等游戏相关请求
 */
import api from './index'
import axios from 'axios'

// 创建无认证API实例，用于不需要认证的请求
const noAuthApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9999/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 获取游戏轮播图
 * @param {number} limit - 轮播图数量
 * @returns {Promise} - 轮播图数据
 */
export const getCarouselList = (limit = 4) => {
  console.log('调用轮播图API，参数:', { limit })
  // 对轮播图接口特殊处理，使用不带授权的请求
  return noAuthApi
    .get('/stream/carousel/list', { params: { limit } })
    .then((response) => {
      console.log('轮播图API响应:', response.data)
      return response.data
    })
    .catch((error) => {
      console.error('轮播图API错误:', error)
      throw error
    })
}

/**
 * 获取推荐游戏列表
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @returns {Promise} - 推荐游戏列表
 */
export const getRecommendedGames = (page = 1, limit = 10) => {
  return api.get('/games/recommended', { params: { page, limit } })
}

/**
 * 获取热门游戏分类
 * @param {number} limit - 返回分类数量
 * @returns {Promise} - 热门游戏分类
 */
export const getPopularCategories = (limit = 8) => {
  return api.get('/games/categories/popular', { params: { limit } })
}

/**
 * 获取直播频道
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @returns {Promise} - 直播频道列表
 */
export const getLiveChannels = (page = 1, limit = 8) => {
  return api.get('/stream/live', { params: { page, limit } })
}

/**
 * 获取游戏详情
 * @param {string} gameId - 游戏ID
 * @returns {Promise} - 游戏详情
 */
export const getGameDetail = (gameId) => {
  return api.get(`/games/${gameId}`)
}

/**
 * 收藏游戏
 * @param {string} gameId - 游戏ID
 * @returns {Promise} - 操作响应
 */
export const favoriteGame = (gameId) => {
  return api.post(`/games/${gameId}/favorite`)
}

/**
 * 取消收藏游戏
 * @param {string} gameId - 游戏ID
 * @returns {Promise} - 操作响应
 */
export const unfavoriteGame = (gameId) => {
  return api.delete(`/games/${gameId}/favorite`)
}

/**
 * 搜索游戏
 * @param {string} query - 搜索关键词
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @returns {Promise} - 搜索结果
 */
export const searchGames = (query, page = 1, limit = 20) => {
  return api.get('/games/search', { params: { query, page, limit } })
}

export default {
  getCarouselList,
  getRecommendedGames,
  getPopularCategories,
  getLiveChannels,
  getGameDetail,
  favoriteGame,
  unfavoriteGame,
  searchGames,
}

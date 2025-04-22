/**
 * 服务模块统一导出
 * 便于在组件中一次性导入所需服务
 */

// 导入API服务
import authService from './api/auth.service'
import userService from './api/user.service'
import gameService from './api/game.service'

// 导出API服务
export const auth = authService
export const user = userService
export const game = gameService

// 默认导出所有服务
export default {
  auth,
  user,
  game,
}

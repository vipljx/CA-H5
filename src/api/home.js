import request from '@/libs/request'

/**
 * 获取主页信息
 * @param phone
 */
export const getHomeInfo = (userId) => {
  const params = { userId }
  return request({
    url: '/sign/signtask/homePage',
    params,
    method: 'get'
  })
}

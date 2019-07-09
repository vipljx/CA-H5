import request from '@/libs/request'

/**
 * 我的印章
 * @param userId
 */
export const userSeal = (userId) => {
  return request({
    url: '/app/appuser/userSeal/' + userId,
    method: 'get'
  })
}

/**
 * 删除印章
 * @param sealId
 */
export const deleteSealId = (appSealId) => {
  const params = { appSealId }
  return request({
    url: '/app/appuser/deleteSeal',
    params,
    method: 'get'
  })
}

/**
 * 设为默认印章
 * @param userId
 * @param sealId
 */
export const setuserSeal = (userId, sealId) => {
  const params = { userId, sealId }
  return request({
    url: '/app/appuser/setuserSeal',
    params,
    method: 'get'
  })
}

/**
 * 收获地址分页
 * @param userId
 */
export const addressPage = (userId) => {
  return request({
    url: '/app/appuser/addressPage/' + userId,
    method: 'get'
  })
}

/**
 * 修改地址回显
 * @param addressId
 */
export const addressById = (addressId) => {
  return request({
    url: '/app/appuser/address/' + addressId,
    method: 'get'
  })
}
/**
 * 修改地址
 * @param userId
 * @param addressId
 * @param provinceId
 * @param cityId
 * @param districtidId
 * @param addressRemark
 * @param name
 * @param phone
 */
export const updateAddress = ({ userId, addressId, provinceId, cityId, districtidId, addressRemark, name, phone }) => {
  const data = {
    userId, addressId, provinceId, cityId, districtidId, addressRemark, name, phone
  }
  return request({
    url: '/app/appuser/updateAddress',
    data,
    method: 'post'
  })
}

/**
 * 删除地址
 * @param addressId
 */
export const deleteAddress = (addressId) => {
  return request({
    url: '/app/appuser/address/deleteAddress?addressId=' + addressId,
    method: 'get'
  })
}

/**
 * 设为默认地址
 * @param userId
 * @param addressId
 */
export const defaultAddress = (userId, addressId) => {
  const params = { userId, addressId }
  return request({
    url: '/app/appuser/defaultAddress',
    params,
    method: 'get'
  })
}

/**
 * 添加印章
 * @param userId
 * @param file
 */
export const addSeal = (userId, file) => {
  const data = { userId, file }
  return request({
    url: '/app/appuser/addSeal',
    data,
    method: 'post'
  })
}

/**
 * 生成二维码
 * @param msg
 */
export const createCode = (msg) => {
  const params = { msg }
  return request({
    url: '/common/api/createCode',
    params,
    method: 'get'
  })
}

import request from '@/libs/request'

/**
 * 申请出证提交
 * @param storeHistoryId
 * @param taskId
 * @param userId
 * @param outType
 * @param pay_way
 * @param addressId
 */
export const applyCertificateSub = ({ storeHistoryId, taskId, userId, outType, pay_way, addressId }) => {
  const params = { storeHistoryId, taskId, userId, outType, pay_way, addressId }
  return request({
    url: '/certificate/certificateouthistory/applyCertificateSub',
    params,
    method: 'get'
  })
}

/**
 * 出证下载
 * @param outHistoryId
 */
export const proveDownload = (outHistoryId) => {
  const params = { outHistoryId }
  return request({
    url: '/certificate/certificateouthistory/pdfDownload',
    params,
    method: 'get'
  })
}

/**
 * 申请出证回显
 * @param taskId
 * @param userId
 * @param addressId
 */
export const applyCertificate = (taskId, userId, addressId) => {
  const params = { taskId, userId, addressId }
  return request({
    url: '/certificate/certificateouthistory/applyCertificate',
    params,
    method: 'get'
  })
}

/**
 * 新增收获地址
 * @param userId
 * @param name
 * @param addressRemark
 * @param phone
 * @param cityId
 * @param provinceId
 * @param districtidId
 * @param isDefault
 */
export const addAddress = ({ userId, name, addressRemark, phone, cityId, provinceId,districtidId, isDefault }) => {
  const data = { userId, name, addressRemark, phone, cityId, provinceId,districtidId, isDefault }
  return request({
    url: '/certificate/certificateouthistory/addAddress',
    data,
    method: 'post'
  })
}

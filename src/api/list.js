import request from '@/libs/request'

/**
 * 文档签属列表
 * @param userId
 * @param taskName
 * @param fqName
 * @param qsName
 * @param startTime
 * @param endTime
 * @param type
 * @param size
 * @param current
 */
export const signList = ({ userId, taskName, fqName, qsName, startTime, endTime, type, size, current }) => {
  const data = { userId, taskName, fqName, qsName, startTime, endTime, type, size, current }
  return request({
    url: '/sign/signtask/signList',
    data,
    method: 'post'
  })
}
/**
 * 存证记录
 * @param userId
 * @param taskName
 * @param userName
 * @param qsPlatform
 * @param qsName
 * @param startTime
 * @param endTime
 * @param type
 * @param size
 * @param current
 */
export const depositCertificate = ({ userId, taskName, userName,qsPlatform, qsName, startTime, endTime, size, current }) => {
  const data = { userId, taskName, userName,qsPlatform, qsName, startTime, endTime, size, current }
  return request({
    url: '/certificate/certificateouthistory/depositCertificate',
    data,
    method: 'post'
  })
}

/**
 * 出证记录列表
 * @param userId
 * @param taskName
 * @param userName
 * @param outType
 * @param outStatus
 * @param startTime
 * @param endTime
 * @param size
 * @param current
 */
export const showAllProve = ({ userId, taskName, userName, outType, outStatus, startTime, endTime, size, current }) => {
  const params = { userId, taskName, userName, outType, outStatus, startTime, endTime, size, current }
  return request({
    url: '/certificate/certificateouthistory/showProve',
    params,
    method: 'GET'
  })
}

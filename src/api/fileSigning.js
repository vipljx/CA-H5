import request from '@/libs/request'

/**
 * 发起签属任务
 * @param data
 */
export const launchSign = (data) => {
  // { file, endTime, isCxqs, qsType, sort, taskMode, taskName, type, userId }
  return request({
    url: '/sign/signtask/launchSign',
    data,
    method: 'post-form',
  })
}

/**
 * 发起签属任务_指定签属位置
 * @param data
 */
export const launchSignPosition = (data) => {
  // { file, endTime, isCxqs, qsType, sort, taskMode, taskName, type, userId }
  const params = data
  return request({
    url: '/sign/signtask/launchSignPosition',
    // params,
    data,
    method: 'post',
  })
}

/**
 * 文件签属_回显
 * @param taskId
 * @param userId
 */
export const taskSignInfo = (taskId, userId) => {
  const data = {
    taskId,
    userId
  }
  return request({
    url: '/sign/signtask/taskSign',
    data,
    method: 'post',
  })
}

/**
 * 文档签属列表
 * @param userId
 * @param startTime
 * @param taskName
 * @param type
 * @param fqName
 * @param qsName
 * @param size
 */
export const signList = (userId, startTime, taskName, type, fqName, qsName, size,current) => {
  const data = {
    userId, startTime, taskName, type, fqName, qsName, size,current
  }
  return request({
    url: '/sign/signtask/signList',
    data,
    method: 'post',
  })
}

/**
 * 盖章
 * @param imagePath
 * @param pdfDestPath
 * @param pdfPath
 * @param x
 * @param y
 */
export const imageConvertPdf = ({ imagePath, pdfDestPath, pdfPath, x, y }) => {
  const params = {
    imagePath,
    pdfDestPath,
    pdfPath,
    x,
    y
  }
  return request({
    url: '/common/api/imageConvertPdf',
    params,
    method: 'get',
  })
}

/**
 * 提交签属_核验身份
 * @param sealId
 * @param taskId
 * @param userId
 * @param imgX
 * @param imgY
 * @param type
 * @param msg
 * @param phone
 */
export const identityCheck = ({ sealId, taskId, userId, imgX, imgY, type, msg, phone }) => {
  const data = {
    sealId,
    taskId,
    userId,
    imgX,
    imgY,
    type,
    msg,
    phone
  }
  return request({
    url: '/sign/signtask/identityCheck',
    data,
    method: 'POST',
  })
}

/**
 * 拒绝签属
 * @param taskId
 * @param userId
 * @param jjyy
 */
export const refuseSign = ({ taskId, userId, jjyy }) => {
  const data = {
    taskId, userId, jjyy
  }
  return request({
    url: '/sign/signtask/refuseSign',
    data,
    method: 'POST',
  })
}

/**
 * 撤销
 * @param taskId
 * @param userId
 */
export const revokeSign = ({ taskId, userId }) => {
  const data = {
    taskId, userId
  }
  return request({
    url: '/sign/signtask/revokeSign',
    data,
    method: 'POST',
  })
}

/**
 * 重新签属回显
 * @param taskId
 */
export const reLaunch = (taskId) => {
  const data = {
    taskId
  }
  return request({
    url: '/sign/signtask/reLaunch',
    data,
    method: 'POST',
  })
}

/**
 * 删除任务
 * @param taskId
 */
export const deleteTask = (taskId) => {
  const params = {
    taskId
  }
  return request({
    url: '/sign/signtask/deleteTask',
    params,
    method: 'get',
  })
}

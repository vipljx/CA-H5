import request from '@/libs/request'

/**
 * 获取短信验证码
 * @param phone
 */
export const getCode = (phone) => {
  const params = { phone }
  return request({
    url: '/auth/sendSms',
    params,
    method: 'get'
  })
}

/**
 * 短信验证码校验
 * @param phone
 * @param code
 */
export const checkCode = (phone, code) => {
  const params = {
    phone,
    code
  }
  return request({
    url: '/app/appuser/smsVerification',
    params,
    method: 'post'
  })
}

/**
 * 登录获取token
 * @param loginType
 * @param userAccount
 * @param passWord
 * @param verCode
 */
export const getToken = (loginType, userAccount, passWord, verCode) => {
  const params = {
    loginType,
    passWord,
    userAccount,
    verCode
  }
  return request({
    url: '/auth/getToken',
    params,
    method: 'get'
  })
}

/**
 * 获取用户id
 * @param loginType
 * @param userAccount
 * @param passWord
 * @param verCode
 */
export const getUserId = (Authorization) => {
  const params = {
    Authorization
  }
  return request({
    url: '/app/appuser/getUser',
    params,
    method: 'get'
  })
}

/**
 * 获取用户信息
 * @param userId
 */
export const getUserInfo = (userId) => {
  // const params = {
  //   userId
  // }
  return request({
    url: '/app/appuser/userInfo/' + userId,
    // params,
    method: 'get'
  })
}

/**
 * 用户注册
 * @param phone
 * @param password
 */
export const userRegist = (phone, password) => {
  const params = {
    phone,
    password
  }
  return request({
    url: '/auth/userRegis',
    params,
    method: 'post'
  })
}

/**
 * 银行四要素认证
 * @param name
 * @param certNo
 * @param cardNo
 * @param phoneNo
 * @param code
 * @param userId
 */
export const bankAuth = (name, certNo, cardNo, phoneNo, code, userId) => {
  const params = {
    name,
    certNo,
    cardNo,
    phoneNo,
    code,
    userId
  }
  return request({
    url: '/app/appuser/bankAuth',
    params,
    method: 'post'
  })
}

/**
 * 找回密码
 * @param phone
 * @param password
 */
export const findPass = (phone, password) => {
  const params = {
    phone,
    password
  }
  return request({
    url: '/auth/retrievePass',
    params,
    method: 'post'
  })
}

/**
 * 校验手机号是否以注册
 * @param phone
 */
export const checkUser = (user_phone) => {
  const params = {
    user_phone
  }
  return request({
    url: '/app/appuser/checkRegister',
    params,
    method: 'get'
  })
}

/**
 * 修改登陆密码
 * @param userId
 * @param phone
 * @param code
 * @param password
 */
export const modifyUserPass = ({ userId, phone, code, password }) => {
  const data = {
    userId, phone, code, password
  }
  return request({
    url: '/app/appuser/modifyUserPass',
    data,
    method: 'post'
  })
}

/**
 * 设置签属密码
 * @param userId
 * @param password
 */
export const setSignPass = (userId, password) => {
  const data = {
    userId, password
  }
  return request({
    url: '/app/appuser/setSignPass',
    data,
    method: 'post'
  })
}

/**
 * 修改签属密码
 * @param userId
 * @param password
 * @param newPassword
 */
export const modifySignPass = ({ userId, password, newPassword }) => {
  const data = {
    userId, password, newPassword
  }
  return request({
    url: '/app/appuser/modifySignPass',
    data,
    method: 'post'
  })
}

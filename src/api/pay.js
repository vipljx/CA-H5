import request from '@/libs/request'

/**
 * 微信扫码支付
 * @param orderSn
 */
export const wxQcodePay = (orderSn) => {
  const params = { orderSn }
  return request({
    url: '/wxmp/pay/wxQcodePay',
    params,
    method: 'get'
  })
}

/**
 * 微信支付回调通知处理
 */
export const WXHDOrder = (orderSn) => {
  const data = { orderSn }
  return request({
    url: '/order/isPay',
    data,
    method: 'post'
  })
}

/**
 * 阿里支付
 * @param orderSn
 * @param type
 */
export const oldWapAliPay = (orderSn, type) => {
  const params = { orderSn, type }
  return request({
    url: '/ali/oldWapAliPay',
    params,
    method: 'get'
  })
}

/**
 * 手机支付
 * @param orderSn
 * @param type
 */
export const WapWxPay = (orderSn, tradeType) => {
  const params = { orderSn, tradeType }
  return request({
    url: '/wxmp/pay/wxUnifiedOrder',
    params,
    method: 'get'
  })
}

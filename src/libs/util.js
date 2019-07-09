import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'

export const TOKEN_KEY = 'token'

export const setToken = (token, auto) => {
  if (auto) {
    Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
  } else {
    Cookies.set(TOKEN_KEY, token)
  }
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token && token !== 'undefined') {
    return token
  } else {
    return false
  }
}

//生成默认印章
export const textToImg = (text) => {
  let canvasOne = document.createElement('canvas')

  let ctx = canvasOne.getContext('2d')
  canvasOne.width = 300
  canvasOne.height = 300
  let textMetrics

  ctx.font = '70px Helvetica'
  ctx.textBaseline = 'middle' //设置文本的垂直对齐方式
  ctx.textAlign = 'center'//设置文本的水平对齐方式
  textMetrics = ctx.measureText(text)

  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'red'
  ctx.fillText(text, canvasOne.width / 2, canvasOne.height / 2)
  ctx.strokeText(text, canvasOne.width / 2, canvasOne.height / 2)

  let dataUrl = canvasOne.toDataURL('image/png')//注意这里背景透明的话，需要使用png
  return dataUrl
}

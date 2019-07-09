import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {setToken, getToken} from '@/libs/util'

import routes from './routers'

Vue.use(Router)

const router = new Router({
  base: '/',
  mode: 'history',
  routes: routes
})
//
const LOGIN_PAGE_NAME = 'passwordLogin'
const permitList = [LOGIN_PAGE_NAME, 'checkLogin', 'findPassword', 'newUserRegister']

router.beforeEach((to, from, next) => {
  localStorage.setItem("innerHeight",window.innerHeight)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '安徽CA电子云签1'
  }
  const token = getToken()
  if (!token && !permitList.includes(to.name)) {
    // 未登录,并且不是白名单
    console.log('=====================未登录,并且不是白名单')
    sessionStorage.removeItem("active")
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && permitList.includes(to.name)) {
    sessionStorage.removeItem("active")
    console.log('=================================白名单')
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    console.log('============================跳转到主页')

    next({
      name: 'home' // 跳转到主页
    })
  } else {
    if (store.state.user.userInfo.userId) {
      console.log('===========================有userId')
      next()
    } else {
      store.dispatch('setUser').then(res => {
        next()
      }).catch(err => {
        setToken('')
        console.log('=========================setToken 空')
        sessionStorage.removeItem("active")
        next({
          name: LOGIN_PAGE_NAME
        })
      })
    }
  }
  // next()
})

export default router

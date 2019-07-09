import { getUserId, getUserInfo } from '@/api/login'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUser ({ state, commit }) {
      return new Promise((resolve, reject) => {
        //token => 用户id
        getUserId(getToken()).then(res => {
          if (res.code === 0) {
            //id => 用户信息
            getUserInfo(res.data.userId).then(resp => {
              if (resp.code === 0) {
                commit('setUserInfo', resp.data)
                resolve(resp)
              } else {
                resolve(resp)
              }
            }).catch(err => {
              reject(err)
            })
            // commit('setUserInfo', res.data)
          } else {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

<template>
  <div class="passworld-login">
    <van-nav-bar left-arrow  @click-left="onClickLeft" title="找回密码" />
    <div class="login-line"></div>
    <div class="two-box">
      <div class="iphone-number">
        <img src="../assets/图层4.png" alt="">
        <div class="iphone-input">
          <van-cell-group>
            <van-field v-model="phone" placeholder="请输入手机号码" autosize @blur="checkIphoneNumber" maxlength="11"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-register-icon">
        <img src="../assets/图层6.png" alt="">
        <div class="ipone-register-input">
          <van-cell-group>
            <van-field v-model="registerNumber" placeholder="请输入验证码" autosize maxlength="6"/>
          </van-cell-group>
        </div>
        <div class="register-number">
          <van-button :disabled="disabled" type="primary" @click="checkLoginButton">
            {{registercode}}
          </van-button>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="passworld" placeholder="请输入新登录密码" autosize type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="confrimpassworld" placeholder="请确认新登录密码" autosize type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-button" @click="resetMessage">
        重置
      </div>

    </div>

  </div>
</template>

<script>
  import {
    getCode,
    checkUser,
    getToken,
    findPass
  } from '@/api/login';
  import {
    setToken
  } from '@/libs/util'
  import {
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        phone: '',
        registerNumber: '',
        disabled: false,
        time: 60,
        passworld: '',
        confrimpassworld: '',
        registercode: '获取验证码',
        timer: null
      }
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      onClickLeft() {
        this.$router.go(-1);
      },
      checkIphoneNumber() {
        if (this.phone != '' && !(/^1[3456789]\d{9}$/.test(this.phone))) {
          this.$toast({
            message: '手机号码格式错误',
            duration: 2000,
          })
        }
      },
      checkLoginButton() {
        if (this.phone != "" && (/^1[3456789]\d{9}$/.test(this.phone))) {
          this.disabled = true;
          this.time = 60
          this.timer = setInterval(() => {
            if (this.time === 0) {
              this.clearTime()
            } else {
              this.time--
              this.registercode = this.time + 's';
            }
          }, 1000);
          checkUser(this.phone).then((res) => {
            if (res.data != null) {
              getCode(this.phone).then((res) => {
                if (res.code !== 0) {
                  this.clearTime()
                  this.$toast(res.msg)
                }
              })
            }
          })
        } else {
          this.$toast({
            message: '请输入正确的手机号',
            duration: 2000,
          })
        }
      },
      clearTime() {
        this.disabled = false
        this.registercode = '获取验证码'
        clearInterval(this.timer)
      },
      resetMessage() {
        let errormessage = '';
        if (this.phone == "") {
          errormessage = '手机号码不能为空'
        } else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          errormessage = '手机号码格式不正确'
        } else if (this.registerNumber == '') {
          errormessage = '验证码不能为空'
        } else if (!(/^[0-9]{6}$/).test(this.registerNumber)) {
          errormessage = '验证码格式不正确'
        } else if (this.confrimpassworld == '' && this.passworld == '') {
          errormessage = '密码不能为空'
        } else if (!(/^[a-zA-Z0-9]{6,18}$/).test(this.passworld) && !(/^[a-zA-Z0-9]{6,18}$/).test(this
          .confrimpassworld)) {
          errormessage = '密码格式不正确'
        } else if (this.confrimpassworld != this.passworld) {
          errormessage = '密码不一致'
        }
        if (errormessage) {
          this.$toast({
            message: errormessage,
            duration: 2000
          })
        } else {
          checkUser(this.phone).then((res) => {
            if (res.data != null) {
              findPass(this.phone, this.passworld).then((res) => {
                if (res.code === 0) {
                  getToken('2', this.phone, this.passworld, '').then(res => {
                    if (res.code === 0) {
                      setToken(res.data)
                      this.getUserInfoAjax(res.data)
                    }
                  })
                }
              })
            }
          })
        }
      },
      getUserInfoAjax() {
        this.setUser().then(res => {
          if (res.code === 0) {
            this.$router.push('home')
          }
        })
      }
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'margin:0px')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')

    }
  }

</script>
<style scoped lang="less">
  .van-nav-bar .van-icon{
     color:#323233;
  }
  .passworld-login {
    width: 100%;
  }
  .login-line {
    width: 100%;
    height: 15*@precision;
    background: #f2f2f2;
  }

  .two-box {
    width: 80%;
    margin: 10*@precision auto 0;
  }

  .iphone-number,
  .login-passworld-icon,
  .login-register-icon {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    border-bottom: 1px #e6e6e6 solid;
    display: flex;
    align-items: center;
  }

  .iphone-number img {
    width: 30*@precision;
    height: 42*@precision;
    margin-left: 25*@precision;
  }

  .login-passworld-icon img {
    width: 30*@precision;
    height: 38*@precision;
  }

  .login-register-icon img {
    width: 34*@precision;
    height: 23*@precision;
  }

  .login-passworld-icon img,
  .login-register-icon img {
    margin-left: 20*@precision;
  }

  .iphone-input,
  .iphone-passworld-input,
  .ipone-register-input {
    float: left;
    margin-left: 25*@precision;
  }

  .register-number {
    display: flex;
    align-items: center;
    margin-left: 64*@precision;
  }

  .van-button {
    width: 180*@precision;
    height: 68*@precision;
    border-radius: 8*@precision;
    line-height: 65*@precision;
    font-size: 26*@precision;
  }

  .van-button--normal {
    padding: 0 0;
  }

  .van-button--primary {
    background: #1abc9c;
    border: 1px #1abc9c solid;
  }

  .login-button {
    width: 100%;
    margin: 0 auto;
    cursor: pointer;
    margin-top: 59*@precision;
    height: 89*@precision;
    background: #1abc9c;
    color: white;
    text-align: center;
    line-height: 89*@precision;
    border-radius: 10*@precision;
    font-size: 36*@precision;
  }

</style>

<template>
  <div class="passworld-login">
    <van-nav-bar title="登录" />
    <div class="login-line"></div>
    <div class="login-image"><img src="../assets/图层2.png" alt=""></div>
    <div class="cloud-size">电子云签平台</div>
    <div class="two-box">
      <div class="iphone-number">
        <img src="../assets/图层4.png" alt="">
        <div class="iphone-input">
          <van-cell-group>
            <van-field v-model="phone" placeholder="请输入手机号码" autosize @blur="checkIphoneNumber" maxlength="11"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/图层6.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="password" placeholder="请输入验证码" autosize maxlength="6"/>
          </van-cell-group>
        </div>
        <div class="register-number">
          <van-button :disabled="disabled" type="primary" @click="checkLoginButton">
            {{registercode}}
          </van-button>
        </div>
      </div>
      <div class="login-button" @click="checkIphoneMessage">
        登录
      </div>
      <div class="speed-register">
        <router-link to="/newUserRegister">立即注册</router-link>
      </div>
      <div class="find-passworld">
        <router-link to="/findPassword">找回密码</router-link>
      </div>
    </div>
    <div class="three-box">
      <div class="login-way-line-left"></div>
      <div class="login-way">其它登录方式</div>
      <div class="login-way-line-right"></div>
    </div>
    <div class="login-number-image" ><img src="../assets/图层7.png" alt="" @click="centerLoginWay"></div>
    <div class="login-check">
      <router-link to="/">密码登录</router-link>
    </div>
  </div>
</template>

<script>
  import {
    checkCode,
    getCode,
    getToken,
    checkUser
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
        disabled: false,
        time: 60,
        phone: '',
        password: '',
        registercode: '获取验证码',
        timer: null
      }
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      checkIphoneMessage() {
        let errormessage = '';
        if (this.phone == "") {
          errormessage = '手机号码不能为空'
        } else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          errormessage = '手机号码格式不正确'
        } else if (this.password == '') {
          errormessage = '验证码不能为空'
        } else if (!(/^[0-9]{6}$/).test(this.password)) {
          errormessage = '验证码格式不正确'
        }
        if (errormessage) {
          this.$toast({
            message: errormessage,
            duration: 2000,
          })
        } else {
          getToken('3', this.phone, '', this.password).then(res => {
            if (res.code === 0) {
              setToken(res.data)
              this.getUserInfoAjax(res.data)
            }
          })
        }
      },
      centerLoginWay(){
        this.$router.push('passwordLogin')
      },
      getUserInfoAjax() {
        this.setUser().then(res => {
          if (res.code === 0) {
            this.$router.push('home')
          }
        })
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
            if (res.data == null) {
              this.$toast({
                message: '手机号码不存在',
                duration: 2000,
              })
            } else {
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
  .passworld-login {
    width: 100%;
  }

  .login-line {
    width: 100%;
    height: 15*@precision;
    background: #f2f2f2;

  }

  .login-image {
    width: 100%;
    text-align: center;
    margin-top: 30*@precision;
  }

  .login-image img {
    width: 164*@precision;
    height: 118*@precision;
  }

  .cloud-size {
    text-align: center;
    margin-top: 34*@precision;
    color: #1abc9c;
    font-size: 40*@precision  !important;
  }

  .two-box {
    width: 80%;
    margin: 10*@precision auto 0;
  }

  .iphone-number,
  .login-passworld-icon {
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
    height: 40*@precision;
    margin-left: 25*@precision;
  }

  .login-passworld-icon img {
    width: 36*@precision;
    height: 23*@precision;
    margin-left: 22*@precision;
  }

  .iphone-input,
  .iphone-passworld-input {
    width: 300*@precision;
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

  .find-passworld,
  .speed-register {
    font-size: 28*@precision;
    margin-top: 42*@precision;
    float: left;
  }

  .find-passworld a,
  .speed-register a {
    color: #4f99f9;
  }

  .find-passworld {
    position: relative;
    left: calc(80% - 106*@precision);
  }

  .three-box {
    width: 420*@precision;
    margin: 140*@precision auto 5*@precision;
    display: flex;
    justify-content: space-around;
  }

  .login-way-line-left,
  .login-way-line-right,
  .login-way {
    display: inline-block;
  }

  .login-way-line-left,
  .login-way-line-right {
    height: 2*@precision;
    width: 125*@precision;
    background: #e6e6e6;
    margin: auto 0;
  }

  .login-way {
    font-size: 28*@precision;
    color: #a1a1a1;
  }

  .login-number-image img {
    display: block;
    width: 100*@precision;
    height: 100*@precision;
    margin: 40*@precision auto 26*@precision;
  }

  .login-check {
    font-size: 28*@precision;
    text-align: center;
  }

  .login-check a {
    color: #1abc9c;
  }

</style>

<template>
  <div class="set-sign-passworld-login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="设置签署密码" />
    <div class="login-line"></div>
    <div class="two-box">
      <div class="iphone-number">
        <img src="../assets/图层4.png" alt="">
        <span class="iphone-input">
          {{userInfo.userPhone}}
        </span>
      </div>
      <div class="login-register-icon">
        <img src="../assets/图层6.png" alt="">
        <div class="ipone-register-input">
          <van-cell-group>
            <van-field v-model="registerNumber" placeholder="请输入验证码" autosize maxlength="6" />
          </van-cell-group>
        </div>
        <div class="register-number">
          <van-button :disabled="disabled" type="primary" @click="checkLoginButton">
            {{registercode}}
          </van-button>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/photo_16.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="passworld" placeholder="请输入签署密码" autosize type="password" maxlength="18"
              minlength="6" />
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/photo_16.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="confrimpassworld" placeholder="请确认签署密码" autosize type="password" maxlength="18"
              minlength="6" />
          </van-cell-group>
        </div>
      </div>
      <div class="login-button" @click="resetMessage">
        保存
      </div>

    </div>

  </div>
</template>

<script>
  import {
    setSignPass,
    checkCode,
    checkUser,
    getCode
  } from '@/api/login'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        registerNumber: '',
        disabled: false,
        time: 60,
        passworld: '',
        confrimpassworld: '',
        registercode: '获取验证码',
        timer: null
      }
    },
    computed: {
      ...mapState({
        'userInfo': state => state.user.userInfo
      })
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      onClickLeft() {
        this.$router.go(-1)
      },
      checkLoginButton() {
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
        checkUser(this.userInfo.userPhone).then((res) => {
          if (res.data != null) {
            getCode(this.userInfo.userPhone).then((res) => {
              if (res.code !== 0) {
                this.clearTime()
                this.$toast(res.msg)
              }
            })
          }
        })
      },
      clearTime() {
        this.disabled = false
        this.registercode = '获取验证码'
        clearInterval(this.timer)
      },
      resetMessage() {
        let errormessage = ''
        if (this.passworld === '') {
          errormessage = '密码不能为空'
        } else if (this.confrimpassworld === '') {
          errormessage = '确认密码不能为空'
        } else if (!(/^[a-zA-Z0-9]{6,18}$/).test(this.passworld)) {
          errormessage = '密码格式不正确'
        } else if (!(/^[a-zA-Z0-9]{6,18}$/).test(this.confrimpassworld)) {
          errormessage = '确认密码格式不正确'
        } else if (this.registerNumber == '') {
          errormessage = '验证码不能为空'
        } else if (!(/^[0-9]{6}$/).test(this.registerNumber)) {
          errormessage = '验证码格式不正确'
        }
        if (errormessage) {
          this.$toast({
            message: errormessage,
            duration: 2000
          })
        } else {
          if (this.confrimpassworld !== this.passworld) {
            this.$toast({
              message: '密码不一致',
              duration: 2000,
            })
          } else {
            checkCode(this.userInfo.userPhone, this.registerNumber).then(res => {
              if (res.code === 0) {
                setSignPass(this.userInfo.userId, this.passworld).then(res => {
                  if (res.code === 0) {
                    this.$toast('操作成功')
                    this.setUser().then(res => {
                    this.$router.push('userIndication')
                    })
                  }else{
                    this.$toast(res.msg);
                  }
                })
              }else{
                this.$toast(res.msg);
              }
            })
          }
        }
      }
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'margin:0px;')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')

    }
  }

</script>
<style scoped lang="less">
  .login-passworld-icon,
  .login-register-icon,
  .iphone-number {
    background: #ffffff;
  }

  .van-nav-bar .van-icon {
    color: #323233;
  }

  .set-sign-passworld-login {
    width: 100%;
    background: #f2f2f2;
    height: 100vh;
  }

  .login-line {
    width: 100%;
    height: 15*@precision;
    background: #f2f2f2;
  }

  .two-box {
    width: 100%;
    margin: 0 auto 0;
  }

  .iphone-number img {
    width: 30*@precision;
    height: 42*@precision;
    margin-left: 4vw;
  }

  .login-register-icon img {
    width: 34*@precision;
    height: 23*@precision;
    margin-left: 4vw;
  }

  .iphone-number,
  .login-register-icon,
  .login-passworld-icon {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    border-bottom: 1px #e6e6e6 solid;
    display: flex;
    align-items: center;
  }

  .login-passworld-icon img {
    width: 37*@precision;
    height: 38*@precision;
    margin-left: 30*@precision;
  }

  .iphone-passworld-input,
  .ipone-register-input {
    float: left;
    margin-left: 10*@precision;
  }

  .iphone-input {
    margin-left: 5.666667vw;
    font-size: 4vw;
    color:#323233;
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
    width: 90%;
    margin: 0 auto;
    cursor: pointer;
    margin-top: 48*@precision;
    height: 89*@precision;
    background: #1abc9c;
    color: white;
    text-align: center;
    line-height: 89*@precision;
    border-radius: 10*@precision;
    font-size: 36*@precision;
  }

</style>

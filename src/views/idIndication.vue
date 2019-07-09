<template>
  <div class="id-indication-login">
    <van-nav-bar left-arrow  @click-left="onClickLeft" title="身份核验" />
    <div class="login-line"></div>
    <div class="two-box">
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
      <div class="login-button" @click="resetMessage">
        确认
      </div>

    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import {
    getCode
  } from '@/api/login';
  export default {
    data() {
      return {
        registerNumber: '',
        disabled: false,
        time: 60,
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
      onClickLeft() {
        this.$router.go(-1);
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
        getCode(this.userInfo.userPhone).then((res) => {
          if (res.code !== 0) {
                  this.clearTime()
                  this.$toast(res.msg)
                }
        })
      },
      clearTime() {
        this.disabled = false
        this.registercode = '获取验证码'
        clearInterval(this.timer)
      },
      resetMessage() {
        if ((/^[0-9]{6}$/.test(this.registerNumber))) {
          getCode(this.userInfo.userPhone).then((res) => {
            if (res.code == 0) {
              this.$router.push('SetSignPassword')
            }
          })
        }else if(this.registerNumber==''){
          this.$toast({
            message: '验证码不能为空',
            duration: 2000,
          })
        }else{
          this.$toast({
            message: '验证码格式不正确',
            duration: 2000,
          })
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
  .login-register-icon {
    background: #ffffff;
  }
  .van-nav-bar .van-icon{
     color:#323233;
  }
  .id-indication-login {
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

  .iphone-number,
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
    width: 26*@precision;
    height: 36*@precision;
    margin-left: 30*@precision;
  }

  .login-register-icon img {
    width: 40*@precision;
    height: 29*@precision;
    margin-left: 30*@precision;
  }

  .ipone-register-input {
    width: 300*@precision;
    float: left;
    margin-left: 15*@precision;
  }

  .register-number {
    display: flex;
    align-items: center;
    margin-left: 140*@precision;
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

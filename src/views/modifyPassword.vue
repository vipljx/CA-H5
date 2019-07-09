<template>
  <div class="modify-passworld-login">
    <van-nav-bar left-arrow  @click-left="onClickLeft" title="修改密码" />
    <div class="login-line"></div>
    <div class="two-box">
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="password" placeholder="请输入新登录密码" autosize type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="confrimpassword" placeholder="请确认新登录密码" autosize type="password" maxlength="18" minlength="6"/>
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
    </div>
    <div class="login-button" @click='showIphoneMessage'>
      保存
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import {
    modifyUserPass,
    getCode
  } from '@/api/login';
  export default {
    data() {
      return {
        registerNumber: '',
        disabled: false,
        password: '',
        confrimpassword: '',
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
      showIphoneMessage() {
           let errormessage = '';
            if(this.password==''){
              errormessage = '密码不能为空';
            }else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.password))){
              errormessage = '密码格式不正确';
            }else if(this.confrimpassword==''){
              errormessage = '确认密码不能为空';
            }else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.confrimpassword))){
              errormessage = '确认密码格式不正确';
            }else if(this.registerNumber==''){
              errormessage = '验证码不能为空';   
            }else if(!(/^[0-9]{6}$/.test(this.registerNumber))){
              errormessage = '验证码格式不正确';
            }
             if(errormessage){
              this.$toast({
                 message: errormessage,
                 duration: 2000,
               })
             }else{
              if (this.confrimpassword != this.password) {
            this.$toast({
              message: '密码不一致',
              duration: 2000,
            })
          } else {
            let obj = {
              userId: this.userInfo.userId,
              phone: this.userInfo.userPhone,
              code: this.registerNumber,
              password: this.password
            }
            modifyUserPass(obj).then(res => {
              if (res.code == 0) {
                this.$router.push('userIndication');
              }
            })
          }
        } 
      },
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
  .two-box {
    background: #ffffff;
  }
  .van-nav-bar .van-icon{
     color:#323233;
  }
  .modify-passworld-login {
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

  .login-passworld-icon,
  .login-register-icon {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    display: flex;
    align-items: center;
  }

  .login-passworld-icon {
    border-bottom: 1px #e6e6e6 solid;
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
    margin-left: 30*@precision;
  }

  .iphone-passworld-input,
  .ipone-register-input {

    float: left;
    margin-left: 15*@precision;
  }

  .ipone-register-input {
    width: 300*@precision;
  }

  .register-number {
    display: flex;
    align-items: center;
    margin-left: 150*@precision;
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
    margin-bottom: 26*@precision;
    height: 89*@precision;
    background: #1abc9c;
    color: white;
    text-align: center;
    line-height: 89*@precision;
    border-radius: 10*@precision;
    font-size: 36*@precision;
  }

</style>

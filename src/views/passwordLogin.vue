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
            <van-field v-model="phone" placeholder="请输入手机号码" @blur="checkIphoneNumber"  maxlength="11"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="passworld" placeholder="请输入登录密码" @blur="checkPassword" type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-button" @click="showIphoneMessage">
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
    <div class="login-number-image"><img src="../assets/图层5.png" alt=""  @click="centerLoginWay"></div>
    <div class="login-check">
      <router-link to="/checkLogin">验证码登录</router-link>
    </div>

  </div>
</template>

<script>
  import {
    getCode,
    getToken,
    getUserInfo,
    checkUser,
    checkCode,
    userRegist,
    findPass
  } from '@/api/login'
  import { setToken } from '@/libs/util'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        phone: '',
        passworld: ''
      }
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      showIphoneMessage() {
        let errormessage = '';
        if (this.phone == "") {
          errormessage= '手机号码不能为空';
        }else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
          errormessage = '手机号码格式不正确'
        }else if(this.passworld == ""){
          errormessage= '密码不能为空';
        }else if(!(/^[a-zA-Z0-9]{6,18}$/).test(this.passworld)){
          errormessage = '密码格式不正确'
        } 
          if(errormessage){
            this.$toast({
            message: errormessage,
            duration: 2000,
          })
          }else{
            getToken('2',this.phone, this.passworld,'').then(res => {
              if(res.code ===900001){
                this.$toast({
                message: '用户名或密码错误',
                duration: 2000,
                })
              }else if (res.code === 0) {
                setToken(res.data)
                this.getUserInfoAjax(res.data)
              }
            })
          }  
      },
      centerLoginWay(){
        this.$router.push('checkLogin')
      },
      //token换取用户信息
      getUserInfoAjax () {
        this.setUser().then(res => {
          console.log(res)
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
      checkPassword(){
        if (this.passworld != '' && !(/^[a-zA-Z0-9]{6,18}$/.test(this.passworld))) {
          this.$toast({
            message: '密码为6-18位字母和数字组合',
            duration: 2000,
          })
        }
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
    font-size: 40*@precision !important;
  }

  .two-box {
    width: 80%;
    margin: 10*@precision auto 0;
  }

  .login-button {
    width: 100%;
    margin: 0 auto;
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

  .iphone-number img,
  .login-passworld-icon img {
    margin-left: 25*@precision;
  }

  .iphone-number img {
    width: 30*@precision;
    height: 42*@precision;
  }

  .login-passworld-icon img {
    width: 30*@precision;
    height: 38*@precision;
  }

  .iphone-input,
  .iphone-passworld-input {
    width: 300*@precision;
    float: left;
    margin-left: 25*@precision;
  }

  .login-button {
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

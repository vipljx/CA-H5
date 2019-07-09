<template>
  <div class="four-element-login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="银行四要素认证"/>
    <div class="login-line"></div>
    <div class="two-box">
      <div class="true-name">
        <div class="true-name-number">真实姓名</div>
        <div class="name-input">
          <van-cell-group>
            <van-field v-model="name" placeholder="填写真实姓名" autosize input-align="right" maxlength="8"/>
          </van-cell-group>
        </div>
      </div>
      <div class="idcard-number">
        <div class="id-card-number">身份证号</div>
        <div class="id-card-input">
          <van-cell-group>
            <van-field v-model="idcard" placeholder="填写身份证号码" autosize input-align="right" maxlength="18"/>
          </van-cell-group>
        </div>
      </div>
      <div class="account-number">
        <div class="account-card-number">银行卡号</div>
        <div class="account-input">
          <van-cell-group>
            <van-field v-model="accountnumber" placeholder="填写银行卡号" autosize input-align="right" maxlength="19"/>
          </van-cell-group>
        </div>
      </div>
      <div class="iphone-number">
        <div class="ipone-card-number">手机号码</div>
        <div class="iphone-input">
          <van-cell-group>
            <van-field v-model="phone" placeholder="填写银行手机预留号码" autosize input-align="right" maxlength="11"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-register-icon">
        <div class="indication-code">验证码</div>
        <div class="ipone-register-input">
          <van-cell-group>
            <van-field v-model="registerNumber" placeholder="填写短信验证码" autosize input-align="right" maxlength="6"/>
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
      提交
    </div>
  </div>
</template>

<script>
  import {
    bankAuth,
    checkUser,
    getCode
  } from '@/api/login'
  import {addSeal} from '@/api/user'
  import {mapState, mapActions} from 'vuex'
  import {textToImg} from '@/libs/util'

  export default {
    data() {
      return {
        name: '',
        accountnumber: '',
        idcard: '',
        phone: '',
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
      ...mapActions([
        'setUser'
      ]),
      showIphoneMessage() {
        let cardReg =
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        let errorMsg = ''
        if (this.name == '') {
          errorMsg = '姓名不能为空'
        } else if (!(cardReg.test(this.idcard))) {
          errorMsg = '身份证号格式错误'
        } else if (!(/^\d{16}$|^\d{19}$/.test(this.accountnumber))) {
          errorMsg = '银行卡号格式错误'
        } else if (this.phone == "") {
          errorMsg = '手机号码不能为空'
        } else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          errorMsg = '手机号码格式错误'
        } else if (!(/^[0-9]{6}$/).test(this.registerNumber)) {
          errorMsg = '验证码格式错误'
        }
        if (errorMsg) {
          this.$toast({
            message: errorMsg,
            duration: 2000
          })
        } else {
          bankAuth(this.name, this.idcard, this.accountnumber, this.phone, this.registerNumber, this.userInfo.userId)
            .then(res => {
              if (res.code === 0) {
                this.setUser().then(resp => {
                  if (resp.code === 0) {
                    addSeal(this.userInfo.userId, textToImg(this.name)).then(seal => {
                      if (seal.code === 0) {
                        this.$toast('认证成功')
                        setTimeout(() => {
                          this.$router.go(-1)
                        }, 1000)
                      }
                    })
                  }
                })
              } else {
                this.$toast(res.msg)
              }
            })
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      checkLoginButton() {
        if (this.phone != "" && (/^1[3456789]\d{9}$/.test(this.phone))) {
          this.disabled = true
          this.time = 60
          this.timer = setInterval(() => {
            if (this.time === 0) {
              this.clearTime()
            } else {
              this.time--
              this.registercode = this.time + 's'
            }
          }, 1000)
          checkUser(this.phone).then((res) => {
            if (res.data = null) {
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

  .van-nav-bar .van-icon {
    color: #323233;
  }

  .four-element-login {
    width: 100%;
    background: #f2f2f2;
    height:100vh;
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

  .ipone-card-number,
  .indication-code,
  .id-card-number,
  .account-card-number,
  .true-name-number {
    font-size: 30*@precision;
    margin-left: 30*@precision;
  }

  .iphone-number,
  .idcard-number,
  .true-name,
  .account-number {
    border-bottom: 1px #e6e6e6 solid;
  }

  .iphone-number,
  .login-register-icon,
  .idcard-number,
  .true-name,
  .account-number {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iphone-input,
  .id-card-input,
  .name-input,
  .account-input {
    margin-right: 20*@precision;
  }
  .iphone-input,
  .id-card-input,
  .account-input{
    width: 60vw;
  }
  .ipone-register-input {
    width: 300*@precision;
    margin-left: 50*@precision;
  }

  .register-number {
    display: flex;
    align-items: center;
    margin-right: 45*@precision;
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
    width: 690*@precision;
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
<style lang="less">

</style>

<template>
  <div class="modify-address-login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="修改地址" />
    <div class="login-line"></div>
    <div class="two-box">
      <div class="true-name">
        <div class="true-name-number">收件人</div>
        <div class="name-input">
          <van-cell-group>
            <van-field v-model="name" placeholder="填写收件人姓名" autosize input-align="right" maxlength="8" />
          </van-cell-group>
        </div>
      </div>
      <div class="iphone-number">
        <div class="ipone-card-number">手机号码</div>
        <div class="iphone-input">
          <van-cell-group>
            <van-field v-model="phone" placeholder="填写收件人手机号码" autosize input-align="right" maxlength="11" />
          </van-cell-group>
        </div>
      </div>
      <div class="area-number">
        <div class="area-card-number">所在地区</div>
        <div class="area-card-input">
          <span @click="selectAddress">{{areacard}}</span>
        </div>
        <img class="box-enter" @click="selectAddress" src="../assets/矩形10.png" alt="">
      </div>
      <div class="detailed-number">
        <div class="detailed-card-number">详细地址</div>
        <div class="detailed-input">
          <van-cell-group>
            <van-field v-model="detailednumber" placeholder="填写详细地址" autosize input-align="right" />
          </van-cell-group>
        </div>
      </div>
      <!-- <div class="login-register-icon">
          <div class="indication-code">设为默认地址</div>
           <div class="register-number">
                <van-switch v-model="checked" size="24px"/>
           </div>
        </div> -->
    </div>
    <div class="login-button" @click='showIphoneMessage'>
      保存
    </div>
    <van-popup v-model="show" position="bottom">

      <van-area :area-list="areaList" @confirm="onAddrConfirm" @cancel="onAddrCancel" title="选择地区" :value="value" />
    </van-popup>
  </div>
</template>

<script>
  import {
    updateAddress,
    addressById
  } from '@/api/user';
  import {
    mapState
  } from 'vuex';
  import addressjson from '@/libs/addressJSON';
  export default {
    data() {
      return {
        name: '',
        detailednumber: '',
        areacard: '',
        phone: '',
        // checked:false,
        value: '',
        show: false,
        default: '',
        provinceId: '',
        cityId: '',
        districtidId: '',
        areaList: addressjson
      }
    },
    computed: {
      ...mapState({
        'userInfo': state => state.user.userInfo
      })
    },
    methods: {
      showIphoneMessage() {
        let errorMes = ''
        if (this.name == "") {
          errorMes = '收件人姓名不能为空'
        } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.name))) {
          errorMes = '收件人姓名格式错误'
        } else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          errorMes = '手机号码格式错误'
        } else if (this.phone == '') {
          errorMes = '手机号码不能为空'
        } else if (this.areacard == '') {
          errorMes = '所选地区不能为空'
        } else if (this.detailednumber == '') {
          errorMes = '详细地址不能为空'
        }
        if (errorMes) {
          this.$toast({
            message: errorMes,
            duration: 2000
          })
        } else {
          let modifyaddressdata = this.userInfo;
          if (this.checked = false) {
            this.default = 0;
          } else {
            this.default = 1;
          }
          let obj = {
            userId: modifyaddressdata.userId,
            addressId: this.$route.query.addressId,
            provinceId: this.provinceId,
            cityId: this.cityId,
            districtidId: this.districtidId,
            addressRemark: this.detailednumber,
            name: this.name,
            phone: this.phone,
            isDefault: this.default
          }
          updateAddress(obj).then(res => {
            if (res.code == 0) {
              this.$router.push('receiveAddress')
            }
          })
        }
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      selectAddress() {
        this.show = true;
      },
      onAddrCancel() {
        this.show = false;
      },
      onAddrConfirm(value) {
        this.show = false;
        this.areacard = value[0].name + '/' + value[1].name + '/' + value[2].name;
        this.provinceId = value[0].code;
        this.cityId = value[1].code;
        this.districtidId = value[2].code;
      },
      choiceNowArea() {
        this.show = true;
      }
    },
    created() {
      addressById(this.$route.query.addressId).then(res => {
        console.log(res.data);
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.detailednumber = res.data.addressRemark;
        this.areacard = res.data.provinceName + '/' + res.data.cityName + '/' + res.data.districtidName;
        this.value = res.data.districtidId.toString();
      })
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

  .modify-address-login {
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

  .ipone-card-number,
  .indication-code,
  .area-card-number,
  .detailed-card-number,
  .true-name-number {
    font-size: 30*@precision;
    margin-left: 30*@precision;
  }

  .iphone-number,
  .area-number,
  .true-name {
    border-bottom: 1px #e6e6e6 solid;
  }

  .iphone-number,
  .login-register-icon,
  .area-number,
  .true-name,
  .detailed-number {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iphone-input,
  .name-input,
  .detailed-input {
    margin-right: 20*@precision;
  }

  .iphone-input,
  .detailed-input {
    width: 60vw;
  }

  .area-card-input {
    margin-right: -30*@precision;
    width: 400*@precision;
    color: #323233;
    font-size: 30*@precision;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
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

  .box-enter {
    margin-right: 70*@precision;
    height: 30*@precision;
    width: 17*@precision;
  }

</style>
<style lang="less">
  .van-picker__cancel,
  .van-picker__confirm {
    color: #1abc9c;
  }

</style>

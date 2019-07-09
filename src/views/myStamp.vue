<template>
  <div class="my-stamp-login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="我的签章" />
    <div class="two-box-big">
      <div class="none-data" v-if="nonedataimg"><img src="../assets/data_none.png" alt=""><span>暂无数据哦~</span></div>
      <div class="two-box" v-for="(item,index) in stampdata">
        <img src="../assets/delete_icon.png" alt="" class="default-delete" @click="defaultDelete(item.sealId)"
          v-if='item.isDefault!=1&&index!=0'>
        <div class="two-box-two">
          <img :src="item.sealImage" alt="">
        </div>
        <div class="two-box-three">
          <img :src="item.isDefault==0 ? defaultimgother:defaultimg" alt="" class="default-icon">
          <span :class="[defaultone,item.isDefault==1 ? defaulttwo : '']"
            @click='setStampDefault(item.sealId)'>{{item.isDefault==1?'默认签章':'设为默认'}}</span>
        </div>
      </div>
    </div>
    <div class="login-button-big">
      <div class="login-button" @click="resetMessage">
        <span class="receive-address-icon">+</span>&nbsp;&nbsp;&nbsp;<span class="add-receive-address">添加手绘签章</span>
      </div>
    </div>
    <van-dialog v-model="showed" show-cancel-button title="您确认要删除该签章吗？">

    </van-dialog>
  </div>
</template>

<script>
  import {
    userSeal,
    deleteSealId,
    setuserSeal
  } from '@/api/user';
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        stampdata: [],
        defaultone: 'set-default-icon',
        defaulttwo: 'set-default-icon-two',
        showed: false,
        defaultimg: require('../assets/light_star.png'),
        defaultimgother: require('../assets/gray_star.png'),
        nonedataimg: true
      }
    },
    computed: {
      ...mapState({
        'userInfo': state => state.user.userInfo
      })
    },
    methods: {
      onClickLeft() {
        this.$router.push('userIndication');
      },
      resetMessage() {
        this.$router.push({
          name: 'write'
        })
      },
      defaultDelete(sealId) {
        this.$dialog.confirm({
          message: '您确认要删除该签章吗？',
          cancelButtonText: '不要'
        }).then(() => {
          deleteSealId(sealId).then(res => {
            if (res.code == 0) {
              this.showStampData();
            }
          })
        }).catch(() => {
          // 取消
        });
      },
      setStampDefault(sealId) {
        setuserSeal(this.userInfo.userId, sealId).then(res => {
          if (res.code == 0) {
            this.showStampData();
          }
        })
      },
      showStampData() {
        console.log(this.userInfo)
        userSeal(this.userInfo.userId).then(res => {
          this.stampdata = res.data.records;
          if (res.data != null) {
            this.nonedataimg = false;
          }
        })
      }
    },
    created() {
      this.showStampData();
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
  .login-passworld-icon {
    background: #ffffff;
  }

  .van-nav-bar .van-icon {
    color: #323233;
  }

  .my-stamp-login {
    width: 100%;
    background: #f2f2f2;
    height: 100vh;
  }

  .two-box-big {
    height: calc(100vh - 22vw);
    padding-top: 30*@precision;
    overflow-y: scroll;
  }

  .none-data {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 30vw;
    height: 30vw;
    text-align: center;
    margin: -15vw;
  }

  .none-data img {
    width: 20vw;
    height: 20vw;
  }

  .none-data span {
    font-size: 4vw;
    color: #cccccc;
    display: block;
  }

  .two-box {
    width: 90%;
    height: 336*@precision;
    margin: 0 auto 40*@precision;
    padding-top: 4*@precision;
    background: #ffffff;
    border-radius: 14*@precision;
  }

  .default-icon,
  .default-delete {
    width: 40*@precision;
    height: 40*@precision;
  }

  .default-delete {
    float: right;
    margin-top: 12*@precision;
    margin-right: 12*@precision;
  }

  .default-icon {
    margin-left: 32*@precision;
  }

  .two-box-two {
    width: 90%;
    margin: 0 auto;
    height: 252*@precision;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .two-box-two img {
    width: 200*@precision;
    height: 200*@precision;
  }

  .two-box-three {
    margin-top: 10*@precision;
    width: 100%;
    height: 84*@precision;
    background: #d9d9d9;
    border-bottom-right-radius: 14*@precision;
    border-bottom-left-radius: 14*@precision;
    display: flex;
    align-items: center;
  }

  .set-default-icon {
    font-size: 32*@precision;
  }

  .set-default-icon {
    color: #a4a4a4;
    margin-left: 32*@precision;
  }

  .set-default-icon-two {
    font-size: 32*@precision;
    color: #1abc9c;
    margin-left: 32*@precision;
  }

  .login-button-big {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 130*@precision;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 2*@precision;
  }

  .login-button {
    width: 90%;
    cursor: pointer;
    height: 90*@precision;
    background: #1abc9c;
    border-radius: 10*@precision;
    display: flex;
    justify-content: center;
    line-height: 90*@precision;
  }

  .add-receive-address {
    font-size: 40*@precision;
    color: #ffffff;
  }

  .receive-address-icon {
    font-size: 58*@precision;
    color: #ffffff;
  }

</style>
<style lang="less">
  .my-stamp-login .van-dialog__confirm {
    background-color: #d2cccc !important;
  }

</style>

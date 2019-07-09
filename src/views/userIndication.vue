<template>
    <div class="user-indication-login">
      <van-nav-bar left-arrow  @click-left="onClickLeft" title="我的" />
      <div class="login-line"></div>
      <div class="user-photo">
         <div class="my-photo"><img src="../assets/mine-photo.png" alt=""></div>
         <div class="indication-message">
           <div v-if="!userInfo.isAuth" class="message-show">
             <span @click="trueNameIndication">实名认证</span>
             <img src="../assets/矩形10-3.png" alt="" @click="trueNameIndication">
          </div>
          <div v-else class="message-show-over">
              <span class="message-show-over-name">{{userInfo.userName}}</span>
              <span class="message-indication-icon">已认证</span>
          </div>
          <div class="phone-number">{{userInfo.userPhone}}</div>
         </div>
      </div>
      <div class="login-line"></div>
      <div class="box-function">
        <div class="imprint-box"  @click="myStamp">
          <img class="box-function-icon-one" src="../assets/图层12.png" alt="">
          <span>我的签章</span>
          <img class="box-enter-one" src="../assets/矩形10.png" alt="" @click="myStamp">
        </div>
        <div class="address-box"  @click="receiveAddress">
            <img class="box-function-icon-two" src="../assets/收件地址.png" alt="">
            <span>收件地址</span>
            <img class="box-enter-one" src="../assets/矩形10.png" alt="" @click="receiveAddress">
        </div>
        <div class="password-box"  @click="setModifySignpassword">
            <img class="box-function-icon-three" src="../assets/图层14.png" alt="">
            <span>签署密码</span>
            <span class="set-sign">{{userInfo.signPass=='0'?'设置':'修改'}}</span>
            <img class="box-enter" src="../assets/矩形10.png" alt="" @click="setModifySignpassword">
        </div>
        <div class="login-password-box" @click="modifyPassword">
            <img class="box-function-icon-four" src="../assets/图层15.png" alt="">
            <span>登录密码</span>
            <span class="set-password">修改</span>
            <img class="box-enter" src="../assets/矩形10.png" alt="" @click="modifyPassword">
        </div>
      </div>
      <div class="login-button" @click="centerLoginPage">退出</div>
      <van-dialog v-model="showed" show-cancel-button title="请先完成实名认证">

      </van-dialog>
    </div>
  </template>

  <script>
     import { mapState } from 'vuex';
     import { setToken } from '@/libs/util';
    export default {
      data() {
        return {
          showed:false
        }
      },
      computed: {
      ...mapState({
        'userInfo': state => state.user.userInfo
      })
    },
      methods:{
        onClickLeft(){
          this.$router.go(-1);
        },
        trueNameIndication(){
          this.$router.push({
            path:'/fourElementsIndication'
          })
        },
        centerLoginPage(){
               setToken("",true);
              this.$router.push('/')
        },
        myStamp(){
          if(this.userInfo.isAuth==1){
             this.$router.push({
             path:'/myStamp'
            })
          }else{
            this.$dialog.alert({
              message: '请先完成实名认证',
              canfirmButtonText:'知道了'
                })
          }
        },
        receiveAddress(){
          if(this.userInfo.isAuth==1){
              this.$router.push({
              path:'/receiveAddress'
            })
          }else{
            this.$dialog.alert({
              message: '请先完成实名认证',
              canfirmButtonText:'知道了'
                })
          }
        },
        setModifySignpassword(){
          if(this.userInfo.isAuth==1){
            if( this.userInfo.signPass=='0'){
            this.$router.push({
            path:'/setSignPassword'
             })
          }else{
            this.$router.push({
            path:'/modifySignPassword'
           })
           }
         }else{
          this.$dialog.alert({
              message: '请先完成实名认证',
              canfirmButtonText:'知道了'
                }).then(() => {
              // 确定
               }).catch(() => {
        //     // 取消
              });
         }
        },
        modifyPassword(){
            this.$router.push({
            path:'/modifyPassword'
          })
        },
      },
      mounted() {

      },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'margin:0px;');

    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')

  }
    }
  </script>
  <style scoped lang="less">
    .van-nav-bar .van-icon{
     color:#323233;
  }
   .user-photo,.box-function{
     background: #ffffff;
   }
    .user-indication-login{
      width:100%;
      background:#f2f2f2
    }
    .login-line {
       width: 100%;
       height:15*@precision;
       background: #f2f2f2;
     }
     .login-button{
       width: 90%;
       cursor:pointer;
       margin: 48*@precision auto 0;
       height:89*@precision;
       background: #1abc9c;
       color: white;
       text-align: center;
       line-height: 89*@precision;
       border-radius: 14*@precision;
       font-size:36*@precision;
     }
    .user-photo{
      height: 211*@precision;
      position:relative;
    }
    .my-photo{
      position: absolute;
      top:50%;
      margin-top:-60*@precision;
    }
    .my-photo img{
      width:120*@precision;
      height:120*@precision;
      border-radius:50%;
      margin-left:30*@precision;
    }
   .indication-message{
     width: 400*@precision;
     height: 104*@precision;
     left: 195*@precision;
     position: absolute;
     top: 50%;
     margin-top: -52*@precision;
   }
   .indication-message div{
     font-size: 32*@precision;
     display: flex;
     flex-wrap: wrap;
   }
   .indication-message .message-show,.message-show-over{
     margin-bottom: 26*@precision;
   }
   .message-show{
     display: flex;
     align-items: center;
   }
   .indication-message .message-show>span{
     font-size: 34*@precision;
     color:#ff4040;
   }
   .message-show-over-name{
     font-size: 34*@precision!important;
   }
   .message-indication-icon{
     margin-left:24*@precision;
     color:white;
     line-height:50*@precision;
     text-align:center;
    font-size: 32*@precision;
     width: 140*@precision;
     height:50*@precision;
     background:#1abc9c;
     border-radius:10px;
   }
   .indication-message .message-show img{
     width: 23*@precision;
     height:36*@precision;
     margin-left:32*@precision;
   }
   .phone-number{
     color: #666666;
   }
   .box-function{
     width: 100%;
   }
   .imprint-box,.address-box,.password-box,.login-password-box{
     height:100*@precision;
     width:100%;
     margin:0 auto;
     display:flex;
     align-items:center;
   }
   .imprint-box,.address-box,.password-box{
     border-bottom: 1px solid #dddddd;
   }
    .box-function-icon-one,.box-function-icon-two,.box-function-icon-three,.box-function-icon-four{
     margin:0 25*@precision;
   }
   .box-function-icon-one{
      width:32*@precision;
      height:32*@precision;
   }
   .box-function-icon-two,.box-function-icon-three,.box-function-icon-four{
      width:33*@precision;
      height:40*@precision;
   }
   .imprint-box>span,.address-box>span,.password-box>span,.login-password-box>span{
     color:#333333;
     font-size: 30*@precision;
   }
   .box-enter{
    float: right;
    height:36*@precision;
    width:23*@precision;
   }
   .box-enter-one{
    float: right;
    height:36*@precision;
    width:23*@precision;
    margin-left:64vw;
   }
   .set-sign,.set-password{
     margin-right: 20*@precision;
     color:#999999!important;
     margin-left: 53.666667vw;
   }
  </style>

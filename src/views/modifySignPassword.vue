<template>
        <div class="modify-sign-passworld-login"> 
          <van-nav-bar left-arrow  @click-left="onClickLeft" title="修改签署密码" />
          <div class="login-line"></div>
          <div class="two-box">
            <div class="login-passworld-icon login-one">
                    <img src="../assets/photo_16.png" alt="">
                    <div class="iphone-passworld-input">
                        <van-cell-group>
                           <van-field v-model="passworld" placeholder="请输入原签署密码" autosize type="password" maxlength="18" minlength="6"/>
                        </van-cell-group>
                     </div>
            </div>
            <div class="login-passworld-icon login-one">
                     <img src="../assets/photo_16.png" alt="">
                     <div class="iphone-passworld-input">
                        <van-cell-group>
                           <van-field v-model="confrimpassworld" placeholder="请输入新签署密码" autosize type="password" maxlength="18" minlength="6"/>
                        </van-cell-group>
                     </div>
            </div>
            <div class="login-passworld-icon login-two">
                    <img src="../assets/photo_16.png" alt="">
                    <div class="iphone-passworld-input">
                       <van-cell-group>
                          <van-field v-model="onceconfrimpassworld" placeholder="请确认新签署密码" autosize type="password" maxlength="18" minlength="6"/>
                       </van-cell-group>
                    </div>
           </div>
            <div class="login-button" @click="resetMessage">
               保存
            </div>
            <div class="find-password-login">
                    <router-link to="/idIndication">找回密码</router-link> 
                </div>
          </div>
         
        </div>
      </template>
      
      <script>
      import {modifySignPass} from '@/api/login';
      import { mapState } from 'vuex'
        export default {
          data() {
            return {
              passworld:'',
              confrimpassworld:'',
              onceconfrimpassworld:''  
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
            resetMessage(){
              let errormessage = '';
            if(this.passworld==''){
              errormessage = '原密码不能为空';
            }else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.passworld))){
              errormessage = '原密码格式不正确';
            }else if(this.confrimpassworld==''){
              errormessage = '新密码不能为空';
            }else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.confrimpassworld))){
              errormessage = '新密码格式不正确';
            }else if(this.onceconfrimpassworld==''){
              errormessage = '确认密码不能为空';   
            }else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.onceconfrimpassworld))){
              errormessage = '确认密码格式不正确';
            }
            if(errormessage){
              this.$toast({
                 message: errormessage,
                 duration: 2000,
               })
             }else{
              if(this.confrimpassworld!=this.onceconfrimpassworld){
                      this.$toast({
                        message:'密码不一致',
                        duration: 2000,
                      })
                    }else{
                      let obj ={
                        userId:this.userInfo.userId,
                        password:this.passworld, 
                        newPassword:this.confrimpassworld
                      }
                      modifySignPass(obj).then(res=>{
                             if(res.code==0){
                                 this.$router.push('userIndication');
                             }
                      })  
                    }  
             }      
            } 
          },
        beforeCreate() {
          document.querySelector('body').setAttribute('style', 'margin:0px;')
        },
        beforeDestroy () {
          document.querySelector('body').removeAttribute('style')
      
      }
        }
      </script>
      <style scoped lang="less">
          .login-passworld-icon{
            background: #ffffff;
          }
          .van-nav-bar .van-icon{
            color:#323233;
         }
        .modify-sign-passworld-login{
          width:100%;
          background: #f2f2f2;
          height:100vh;
        }
        .login-line {
           width: 100%;
           height:15*@precision;
           background: #f2f2f2;
         }
         .two-box{
           width:100%;
           margin:0 auto 0;
         }
         .login-passworld-icon{
           margin: 0 auto 0;
           position: relative;
           width:100%;
           height: 130*@precision;
           display:flex;
           align-items:center;
         }
         .login-one{
          border-bottom: 1px #e6e6e6 solid;
         }
         .login-passworld-icon img{
             width:37*@precision;
             height:38*@precision;
             margin-left:30*@precision;
         }
         .iphone-passworld-input{
          float:left;
          margin-left: 10*@precision;
         } 
         .login-button{
           width: 90%;
           margin:0 auto;
           cursor:pointer;
           margin-top: 48*@precision;
           height:89*@precision;
           background: #1abc9c;
           color: white;
           text-align: center;
           line-height: 89*@precision;
           border-radius: 10*@precision;
           font-size:36*@precision;
         }  
         .find-password-login{
             text-align: center;
             font-size: 30*@precision;
             margin-top:30*@precision;
         }
         .find-password-login a{
             color:#4f99f9;  
         }
      </style>
      
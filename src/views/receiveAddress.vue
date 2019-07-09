<template>
    <div class="receive-address-login">
      <van-nav-bar left-arrow  @click-left="onClickLeft" fixed title="收件地址" />
      <div class="two-box-big">
        <div class="none-data" v-if="addressdata.length === 0"><img src="../assets/data_none.png" alt=""><span>暂无数据哦~</span></div>
        <div class="two-box" v-for="(item,index) in addressdata" :key="item.addressId">
          <img src="../assets/delete_icon.png" alt="" class="default-delete" @click="defaultDelete(item.addressId)" v-if='!(item.isDefault===1)'>
          <div class="two-box-one">
              {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.phone}}
          </div>
          <div class="two-box-two">
                 {{item.province}}{{item.city}}{{item.area}}{{item.addressRemark}}
          </div>
          <div class="two-box-three">
             <img :src="item.isDefault===1 ? defaultimg:defaultimgother" alt="" class="default-icon" >
             <span :class="[defaultone,item.isDefault===1 ? defaulttwo : '']" @click="setApprove(item.addressId,item.userId)">设为默认</span>
             <span class="modify-default" @click="modifyDefaultAddress(item.addressId)">修改</span>
          </div>
        </div>
      </div>
      <div class="login-button-big">
        <div class="login-button" @click="resetMessage">
          <span class="receive-address-icon">+</span>&nbsp;&nbsp;&nbsp;<span class="add-receive-address">添加地址</span>
        </div>
      </div>

      <van-dialog v-model="showed" show-cancel-button title="您确认要删除该地址吗？">

      </van-dialog>
    </div>
  </template>

  <script>
    import {addressPage,deleteAddress,defaultAddress} from '@/api/user';
    import { mapState } from 'vuex';
    export default {
      data() {
        return {
           addressdata:[],
           defaultone:'set-default-icon',
           defaulttwo:'set-default-icon-two',
           showed:false,
           defaultimg:require('../assets/light_star.png'),
           defaultimgother:require('../assets/gray_star.png')
        }
      },
      computed: {
      ...mapState({
        'userInfo': state => state.user.userInfo
      })
    },
      methods:{
        onClickLeft(){
          this.$router.push('userIndication');
        },
        resetMessage(){
            this.$router.push({
              path:'/addAddress'
            })
        },
        setApprove(addressId,userId){
          defaultAddress(userId,addressId).then(res=>{
            this.addressLoad();
          })
        },
        defaultDelete(addressId){
          this.$dialog.confirm({
          message: '您确认要删除该地址吗？',
          cancelButtonText:'不要'
            }).then(() => {
              deleteAddress(addressId).then(res=>{
                this.addressLoad();
              })
           }).catch(() => {
        // 取消
          });
        },
        modifyDefaultAddress(addressId){
            this.$router.push({
              path:'modifyAddress',
              query:{
                addressId:addressId
              }
            });
        },
        addressLoad(){
          addressPage(this.userInfo.userId).then(res=>{
            if(res.code === 0){
              this.addressdata = res.data.records;
            }
        })
        }
      },
      created() {
           this.addressLoad();
      },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'margin:0px;');
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style');

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
    .receive-address-login{
      width:100%;
      background: #f2f2f2;
      height: 100vh;
    }
      .two-box-big{
        height:calc(100vh - 20vw);
        padding-top:4vw;
        overflow-y:scroll;
      }
      .none-data{
        position: fixed;
        left:50%;
        top:50%;
        width:40vw;
        height:40vw;
        text-align: center;
        margin: -30vw -20vw;
      }
      .none-data img{
        width:25vw;
        height:25vw;
      }
      .none-data span{
           font-size: 4vw;
           color:#cccccc;
           display: block;
      }
     .two-box{
       width:90%;
       min-height:286*@precision;
       margin:0 auto 40*@precision;
       padding-top:4*@precision;
       background: #ffffff;
       border-radius:14*@precision;
     }
     .default-icon,.default-delete{
       width: 40*@precision;
       height:40*@precision;
     }
     .default-delete{
       float: right;
       margin-top:12*@precision;
       margin-right:12*@precision;
     }
     .default-icon{
       margin-left: 32*@precision;
     }
     .two-box-one,.two-box-two{
       width:90%;
       margin:0 auto;
       color:#333333;
       font-size:32*@precision;
       text-align:left;
     }
     .two-box-one{
       height: 52*@precision;
       margin-top:37*@precision;
       line-height:52*@precision;

     }
     .two-box-two{
       min-height: 105*@precision;
     }
     .two-box-three{
       margin-top:10*@precision;
       width: 100%;
       height: 84*@precision;
       background:#d9d9d9;
       border-bottom-right-radius:14*@precision;
       border-bottom-left-radius:14*@precision;
       display:flex;
       align-items:center;
     }
     .set-default-icon,.modify-default{
      font-size:32*@precision;
     }
     .set-default-icon{
      color:#a4a4a4;
      margin-left: 32*@precision;
     }
     .set-default-icon-two{
      font-size:32*@precision;
       color:#1abc9c;
       margin-left: 32*@precision;
     }
     .modify-default{
       margin-left: 320*@precision;
       color:#6ba6f3;
       cursor: pointer;
     }
     .login-button-big{
      position: fixed;
       z-index: 10000;
       width: 100%;
       height:130*@precision;
       background: #ffffff;
       display:flex;
       align-items:center;
       justify-content:center;
       bottom:2*@precision;
     }
     .login-button{
       width:90%;
       cursor:pointer;
       height:90*@precision;
       background: #1abc9c;
       border-radius: 10*@precision;
       display:flex;
       justify-content:center;
       line-height:90*@precision;
     }
     .add-receive-address{
      font-size:40*@precision;
      color:#ffffff;
     }
     .receive-address-icon{
      font-size:58*@precision;
      color:#ffffff;
     }
  </style>
  <style>
  .receive-address-login .van-dialog__confirm{
    background: #a4a4a4;
  }
  </style>

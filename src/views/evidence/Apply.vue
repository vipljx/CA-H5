<template>
  <div class="apply">
    <van-nav-bar title="申请出证" left-text left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field
        clearable
        label="出证方式"
        placeholder="选择出证方式"
        :right-icon="arrow1"
        readonly
        v-model="param.type.text"
        @click="showPopup1"
      />
      <van-field
        clearable
        label="出证费用"
        :value="param.type.index==1?'免费':payInfo.money"
        class="red"
        readonly
      />
      <van-field
        clearable
        label="支付方式"
        placeholder="选择支付方式"
        :right-icon="arrow1"
        readonly
        @click="showPopup2"
        v-model="param.paytype.text"
        v-show="param.type.index==2"
      />
      <van-field
        v-show="param.type.index==2"
        readonly
        label="收件地址"
        type="textarea"
        :value="payInfo.address?payInfo.name+'，'+payInfo.phone+'，'+payInfo.address:'暂无'"
        rows="2"
        autosize
      />
      <div
        class="change cont"
        v-show="param.type.index==2"
        @click="onChange"
      >{{payInfo.address?"更换地址":"添加地址"}}</div>
    </van-cell-group>

    <ul class="btn-ul cont">
      <li>
        <button @click="submit">提交</button>
      </li>
    </ul>
    <!--出证方式弹出层 -->
    <van-popup v-model="show1" position="bottom">
      <van-picker
        title="出证方式"
        :columns="columns1"
        show-toolbar
        @cancel="show1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!--支付方式弹出层 -->
    <van-popup v-model="show2" position="bottom">
      <van-picker
        title="支付方式"
        :columns="columns2"
        show-toolbar
        @cancel="show2 = false"
        @confirm="onConfirm2"
      />
    </van-popup>
    <!-- 更换地址 -->
    <van-popup
      v-model="show3"
      position="right"
      :style="{ width: '100%',height:'100%' }"
      class="bgGray"
    >
      <Address
        :title="payInfo.address?'更换地址':'添加地址'"
        @childInfo="loadPayInfo"
        @childClose="onClose"
      ></Address>
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import Address from "@/views/evidence/addAddress";
import {
  applyCertificateSub,
  applyCertificate,
  addAddress
} from "@/api/toNotarize";
import { wxQcodePay, oldWapAliPay, WXHDOrder, WapWxPay } from "@/api/pay";
import { mapState } from "vuex";
import config from "@/config";

import { NavBar, CellGroup, Field, Popup, Picker, Button, Toast } from "vant";

Vue.use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(Button)
  .use(Toast);
export default {
  name: "apply",
  components: {
    Address: Address
  },
  data() {
    return {
      arrow1: require("../../static/images/ios/arrow2.png"),
      show1: false,
      show2: false,
      show3: false,
      columns1: [
        { text: "电子出证", index: 1 },
        { text: "纸质出证", index: 2 }
      ],
      columns2: [
        { text: "微信支付", index: 1 },
        { text: "支付宝支付", index: 2 }
      ],
      param: {
        type: { text: "电子出证", index: 1 },
        paytype: { text: "支付宝支付", index: 2 }
      },
      payInfo: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.loadPayInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //出证方式
    showPopup1() {
      this.show1 = true;
    },
    onConfirm1(value) {
      console.log(value);
      this.param.type = value;
      this.show1 = false;
    },
    //支付方式
    showPopup2() {
      this.show2 = true;
    },
    onConfirm2(value) {
      console.log(value);
      this.param.paytype = value;
      this.show2 = false;
    },
    //加载支付信息
    loadPayInfo(id) {
      applyCertificate(this.$route.query.taskId, this.userInfo.userId, id).then(
        res => {
          console.log(res);
          if (res.code === 0) {
            let info = res.data;
            this.payInfo = {
              money: info.fee,
              name: info.apply ? info.apply.name : "",
              phone: info.apply ? info.apply.phone : "",
              address: info.apply
                ? info.apply.province +
                  info.apply.city +
                  info.apply.area +
                  info.apply.addressRemark
                : "",
              addressId: info.apply ? info.apply.addressId : ""
            };
          }
        }
      );
    },
    //更换地址
    onChange() {
      this.show3 = true;
    },
    //关闭更换地址
    onClose() {
      this.show3 = false;
    },
    //提交
    submit() {
      if (this.param.type.index == 1) {
        this.updateAjax(0);
      } else {
        if (!this.payInfo.addressId) {
          Toast("请添加地址");
          return;
        }
        this.updateAjax(1);
      }
    },

    updateAjax(type) {
      let data = {
        outType: type,
        storeHistoryId: this.$route.query.storeHistoryId,
        taskId: this.$route.query.taskId,
        userId: this.userInfo.userId
      };
      if (type) {
        data.pay_way = this.param.paytype.index === 1 ? "weixin" : "alipay";
        data.addressId = this.payInfo.addressId;
      }
      applyCertificateSub(data).then(res => {
        if (res.code === 0) {
          if (type) {
            if (data.pay_way === "weixin") {
              this.WXPay(res.data);
            } else {
              this.ALiPay(res.data);
            }
          } else {
            Toast(res.msg);
            this.$router.push({
              path: "evidence",
              query: {
                where: 1
              }
            });
          }
        }else{
          Toast(res.msg)
        }
      });
    },
    //微信支付
    WXPay(sn) {
      Toast("正在努力开发中...");
      // WapWxPay(sn,"MWEB").then(res=>{
      //   console.log(res)
      // })
    },
    //支付宝支付
    ALiPay(sn) {
      const userAgent = window.navigator.userAgent;
      const inWindowsWechat = /MicroMessenger/i.test(userAgent);
      if(inWindowsWechat){
          Toast("微信环境下不支持支付宝支付，请使用微信支付或在浏览器中打开！")
          return 
      }
      oldWapAliPay(sn, "app").then(res => {
        if (res.code === 0) {
          document.write(res.data);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.apply {
  background: #f2f2f2;
  font-size: 30 * @precision;
  min-height: 100vh;
}
.van-cell:not(:last-child)::after {
  left: 0;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.btn-ul {
  padding: 20 * @precision 0;
  li {
    padding: 20 * @precision;
    button {
      width: 100%;
      border: 0;
      font-size: 28 * @precision;
      color: #ffffff;
      height: 90 * @precision;
      border-radius: 10 * @precision;
    }
  }
  li:first-child button {
    background: #1abc9c;
  }
}
.change {
  text-align: right;
  color: #4f99f9;
  padding: 0 0 15 * @precision 0;
}
.van-cell-group {
  .van-cell:nth-child(4)::after {
    border: 0;
  }
}
</style>
<style lang="less">
.apply .van-field__label {
  width: auto;
  margin-right: 10 * @precision;
}
.apply .van-icon__image {
  width: 16 * @precision;
}
.apply .van-field__control {
  text-align: right;
}
.red .van-field__control {
  color: #ff0000;
}
</style>
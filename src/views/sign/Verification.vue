<template>
  <div class="Verification">
    <van-nav-bar title="意愿核验" left-text left-arrow @click-left="onClickLeft" />
    <van-cell-group v-if="show1">
      <van-field :left-icon="ico1" :value="userInfo.userPhone" readonly />
      <van-field :left-icon="ico2" center clearable placeholder="请输入验证码" v-model="code" maxlength="6">
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="getAuthCode"
        >{{sendAuthCode?"获取验证码":auth_time+' 秒后重新发送'}}</van-button>
      </van-field>
    </van-cell-group>
    <van-cell-group v-if="!show1">
      <van-field :left-icon="ico3" placeholder="请输入签署密码" type="password" v-model="code" maxlength="18"/>
    </van-cell-group>
    <ul class="btn-ul cont">
      <li>
        <button @click="confirm">确认</button>
      </li>
      <li>
        <button @click="back">返回</button>
      </li>
    </ul>
    <div class="other" v-if="userInfo.signPass==='1'">
      <div class="other-top">
        <div>其他校验方式</div>
      </div>
      <div class="other-bottom" @click="onSwitch" v-show="show1">
        <div class="other-tp">
          <img src="../../static/images/ios/other1.png" alt />
        </div>
        <div class="other-bt">签署密码</div>
      </div>
      <div class="other-bottom" @click="onSwitch" v-show="!show1">
        <div class="other-tp">
          <img src="../../static/images/ios/other2.png" alt />
        </div>
        <div class="other-bt">短信验证</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import { NavBar, CellGroup, Field, Button, Toast } from "vant";
import { getCode } from "@/api/login";
Vue.use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast);
export default {
  name: "waitSign",
  data() {
    return {
      show1: true,
      ico1: require("../../static/images/ios/Verification1.png"),
      ico2: require("../../static/images/ios/Verification2.png"),
      ico3: require("../../static/images/ios/Verification3.png"),
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /*倒计时 计数器*/,
      code: "", //验证码
      type: 2
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    onClickLeft() {
      this.$emit('childClose')
    },
    onSwitch() {
      this.show1 = !this.show1;
      this.code="";
      this.type = this.show1 ? 2 : 3;
    },
    getAuthCode() {
      if (!this.sendAuthCode) {
        return false;
      }
      this.sendAuthCode = false;
      this.auth_time = 60;
      let auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.clearTime(auth_timetimer);
        }
      }, 1000);

      this.getCodeAjax(this.userInfo.userPhone, auth_timetimer);
    },
    //清楚定时器
    clearTime(timer) {
      this.auth_time = 0;
      this.sendAuthCode = true;
      clearInterval(timer);
    },
    //获取验证码ajax
    getCodeAjax(phone, timer) {
      getCode(phone).then(res => {
        if (res.code === 0) {
          // 发送成功
        } else {
          this.clearTime(timer);
        }
      });
    },
    confirm() {
      if (this.show1) {
        if (!/^[0-9]{6}$/.test(this.code)) {
          Toast("请填写6位数验证码");
          return;
        }
        this.$emit("childSubmit", this.code, this.type);
      } else {
        if (!this.code) {
          Toast("请填写签署密码");
          return;
        }
        // console.log(this.code)
        // console.log(this.type)
        this.$emit("childSubmit", this.code, this.type);
      }
    },
    //返回
    back() {
      this.$emit('childClose')
    },
  }
};
</script>
<style lang="less" scoped>
.Verification {
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
  li:nth-child(2) button {
    background: #cccccc;
  }
}
.other {
  text-align: center;
  .other-top {
    font-size: 28 * @precision;
    color: #999999;
    position: relative;
    max-width: 450 * @precision;
    margin: 0 auto;
    margin-bottom: 25 * @precision;
    div {
      display: inline-block;
    }
  }
  .other-top:before {
    display: inline-block;
    content: "";
    background: #e6e6e6;
    width: 124 * @precision;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 0;
  }

  .other-top:after {
    display: inline-block;
    content: "";
    background: #e6e6e6;
    width: 124 * @precision;
    height: 1px;
    position: absolute;
    top: 50%;

    right: 0;
  }
  .other-bottom {
    .other-tp {
      width: 101 * @precision;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .other-bt {
      color: #1abc9c;
      font-size: 28 * @precision;
    }
  }
}
</style>
<style lang="less">
.Verification {
  .van-field:first-child {
    .van-icon__image {
      width: 27 * @precision;
    }
  }
  .van-field:last-child {
    .van-icon__image {
      width: 38 * @precision;
    }
  }
}
</style>

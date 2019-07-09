<template>
  <div class="detail">
    <van-nav-bar title="出证详情" left-text left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field clearable label="签署任务" v-model="msg.taskName" />
      <van-field clearable label="申请人" v-model="msg.userName" />
      <van-field clearable label="申请出证方式" :value="outTypes[msg.outType]" />
      <van-field clearable label="申请时间" v-model="msg.createTime" />
      <van-field clearable label="处理状态" :value="outStatus[msg.outStatus]" />
    </van-cell-group>
    <ul class="btn-ul cont">
      <li v-if="msg.outType===0" @click="download">
        <button>下载</button>
      </li>
      <li v-if="msg.outType!==0 && msg.outStatus!==0 && msg.kdCode" @click="look">
        <button>快递信息</button>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";

import { NavBar, CellGroup, Field, Button, Toast, Dialog } from "vant";
import config from "@/config";

Vue.use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Dialog);
export default {
  name: "detail",
  data() {
    return {
      msg: {},
      outTypes: ["电子证据", "纸质证据"],
      outStatus: ["受理中", "通过"]
    };
  },
  created() {
    this.msg = JSON.parse(localStorage.getItem("detail"));
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //下载
    download() {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev
          : config.baseUrl.pro;
      window.open(
        baseUrl +
          "/certificate/certificateouthistory/proveDownload?outHistoryId=" +
          this.msg.outHistoryId
      );
    },
    //快递信息
    look() {
      Dialog.alert({
        message:
          "快递名称：" + this.msg.kdName + "\n快递单号：" + this.msg.kdCode,
        confirmButtonText: "知道了",
        messageAlign: "left"
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="less" scoped>
.detail {
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
</style>
<style lang="less">
.detail .van-field__label {
  width: auto;
  margin-right: 10 * @precision;
}

.detail .van-field__control {
  text-align: right;
}
</style>
<template>
  <div class="deny">
    <van-nav-bar title="拒签原因" left-text left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field v-model="refuseReason" type="textarea" placeholder="请输入拒签原因" rows="5" autosize />
    </van-cell-group>
    <ul class="btn-ul cont">
      <li>
        <button @click="next">确认</button>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";

import { NavBar, CellGroup, Field, Button, Toast } from "vant";
import { refuseSign } from "@/api/fileSigning";
import { mapState } from "vuex";
Vue.use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast)
export default {
  name: "deny",
  data() {
    return {
      refuseReason:""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    next() {
      if(!this.refuseReason){
        Toast("请输入拒签原因");
        return;
      }
      let data = {
        taskId: this.$route.query.taskId,
        userId: this.userInfo.userId,
        jjyy: this.refuseReason
      };
      refuseSign(data).then(res => {
        console.log(res);
        if (res.code === 0) {
          Toast("操作成功");
          sessionStorage.setItem("active",1)
          this.$router.push("/document");

        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.deny {
  background: #f2f2f2;
  font-size: 30 * @precision;
  min-height: 100vh;
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
</style>
<style lang="less">
.deny textarea {
  border: 1px solid #cccccc;
  padding: 0 10 * @precision;
}
</style>

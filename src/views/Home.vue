<template>
  <div class="home">
    <van-nav-bar title="首页" left-text left-arrow @click-left="onClickLeft" />
    <div class="height20" v-show="userInfo.isAuth==0"></div>
    <div class="smrz" v-show="userInfo.isAuth==0">
      <div class="cont smrz-cont">
        <img src="../static/images/ios/smrz1.png" alt class="smrz-ico1" />
        <span class="smrz-nr">您的账号尚未实名认证</span>
        <span class="smrz-btn" @click="jumpD">立即认证</span>
        <img src="../static/images/ios/arrow1.png" alt class="smrz-ico2" />
      </div>
    </div>
    <div class="height10"></div>
    <div class="quick">
      <ul class="quick-ul">
        <li @click="jumpC(1)">
          <div class="quick-ico">
            <img src="../static/images/ios/待我签@2x.png" alt />
          </div>
          <div class="quick-bt">待我签({{dwsign}})</div>
        </li>
        <li @click="jumpC(2)">
          <div class="quick-ico">
            <img src="../static/images/ios/待他人签@2x.png" alt />
          </div>
          <div class="quick-bt">待他人签({{dtsign}})</div>
        </li>
        <li @click="jumpC(3)">
          <div class="quick-ico">
            <img src="../static/images/ios/已完成@2x.png" alt />
          </div>
          <div class="quick-bt">已完成({{completed}})</div>
        </li>
        <li @click="jumpC(7)">
          <div class="quick-ico">
            <img src="../static/images/ios/草稿箱@2x.png" alt />
          </div>
          <div class="quick-bt">草稿箱({{drafts}})</div>
        </li>
      </ul>
      <van-button plain type="primary" round class="quick-btn" @click="jumpA">
        <img src="../static/images/ios/quick1.png" alt /> 发起签署
      </van-button>
    </div>

    <div class="cate">
      <div class="cont cate-cont">
        <img src="../static/images/ios/圆角矩形4@2x.png" alt class="cate-ico1" />
        <span class="cate-bt">最近签署</span>
        <span class="cate-more" @click="more">更多</span>
        <img src="../static/images/ios/arrow1.png" alt class="cate-ico2" />
      </div>
    </div>
    <ul class="zjqs">
      <li v-for="(tmp,index) in list" :key="tmp.taskId" @click="jumpB(index)">
        <div class="cont">
          <div :class="['zjqs-state',signStatus[tmp.taskStatus].color]">
            <span class="zjqs-state-left"></span>
            <span class="zjqs-state-right">{{signStatus[tmp.taskStatus].name}}</span>
          </div>
          <div class="zjqs-top">{{tmp.taskName}}</div>
          <div class="zjqs-middle">
            <img src="../static/images/ios/发起人@2x.png" alt class="zjqs-ico1" />
            {{tmp.userName}}（{{tmp.taskStartTime}} 发起）
          </div>
          <div class="zjqs-bottom">
            <img src="../static/images/ios/签字@2x.png" alt class="zjqs-ico2" />
            {{tmp.qsName}}
          </div>
        </div>
      </li>
    </ul>
    <div class="none" v-if="list.length===0">
      <div class="none-tp">
        <img src="../static/images/ios/none1.png" alt />
      </div>
      <div class="none-bt">暂无数据哦~</div>
    </div>

    <div class="height98" v-if="list.length!==0"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";
import { mapState } from "vuex";
import { getHomeInfo } from "@/api/home";
import signStatus from "@/libs/signStatus";
Vue.use(NavBar)
  .use(Button)
  .use(Toast);

export default {
  name: "home",
  data() {
    return {
      dwsign: "", //待我签
      dtsign: "", //待他人签
      completed: "", //已完成
      drafts: "", //草稿箱
      list: [], //最近属性
      signStatus
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    getHomeInfo(this.userInfo.userId).then(res => {
      if (res.code === 0) {
        console.log(res.data.object);
        this.dwsign = res.data.dwsign;
        this.dtsign = res.data.dtsign;
        this.completed = res.data.completed;
        this.drafts = res.data.drafts;
        this.list = res.data.object;
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //发起签署
    jumpA() {
      console.log(this.userInfo.isAuth);
      if (this.userInfo.isAuth === 0) {
        Toast("请先完成实名认证");
        return;
      }
      this.$router.push("/Initiation");
    },
    //点击跳转
    jumpB(i) {
      if (this.userInfo.isAuth === 0) {
        Toast("请先完成实名认证");
        return;
      }

      if (this.list[i].taskStatus === 0) {
        this.$router.push({
          path: "/Initiation",
          query: {
            taskId: this.list[i].taskId
          }
        });
        return;
      }
      this.$router.push({
        path: "/waitSign",
        query: {
          taskId: this.list[i].taskId
        }
      });
    },
    jumpC(i) {
      this.$router.push({
        path: "/document",
        query: {
          index: i
        }
      });
    },
    //立即认证
    jumpD() {
      this.$router.push("/fourElementsIndication");
    },
    //更多
    more() {
      this.$router.push("document");
    }
  }
};
</script>
<style scoped lang="less">
.home {
  background: #ffffff;
  min-height: 100vh;
}
.van-nav-bar .van-icon {
  color: #333333;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.smrz {
  padding: 30 * @precision 0;
  .smrz-cont {
    display: flex;
    align-items: center;
    .smrz-ico1 {
      width: 29 * @precision;
      margin-right: 16 * @precision;
    }
    .smrz-ico2 {
      width: 15 * @precision;
      margin-left: 20 * @precision;
    }
    .smrz-nr {
      flex: 1;
      text-align: left;
    }
    .smrz-btn {
      color: #4f99f9;
      font-size: 30 * @precision;
    }
  }
}
.height20 {
  height: 20 * @precision;
  background: #f2f2f2;
}

.height10 {
  height: 10 * @precision;
  background: #f2f2f2;
}
.none {
  padding: 50 * @precision 0;
  .none-tp {
    width: 215 * @precision;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .none-bt {
    text-align: center;
    color: #cccccc;
  }
}
.quick {
  background: #ffffff;
  text-align: center;
  .quick-ul {
    display: flex;
    justify-content: space-around;
    padding: 32 * @precision 0;
    ::after {
      clear: both;
    }
    .quick-bt {
      font-size: 28 * @precision;
      margin-top: 10*@precision;
    }
    .quick-ico {
      height: 80*@precision;
      margin: 0 auto;
      img {
        height: 100%;
      }
    }
  }
  .quick-btn {
    width: 600 * @precision;

    margin-bottom: 35 * @precision;
    height: 68 * @precision;
    .van-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30 * @precision;
      height: 68 * @precision;
      img {
        margin-right: 45 * @precision;
        width: 32 * @precision;
      }
    }
  }
}
.cate {
  padding: 20 * @precision 0;
  background: #f2f2f2;
  .cate-cont {
    display: flex;
    align-items: center;
    .cate-ico1 {
      width: 9 * @precision;
      margin-right: 15 * @precision;
    }
    .cate-ico2 {
      width: 15 * @precision;
      margin-left: 15 * @precision;
    }
    .cate-bt {
      flex: 1;
      text-align: left;
    }
  }
}
.zjqs {
  li {
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    text-align: left;
    background: #ffffff;
    padding: 20 * @precision 0;
    .zjqs-state {
      position: absolute;
      right: 0;
      top: 0;
      color: #ffffff;
      height: 50 * @precision;
      line-height: 50 * @precision;
      font-size: 26 * @precision;
      display: flex;
      justify-content: flex-end;
      .zjqs-state-left {
        width: 0;
        height: 0;
        border-left: 20 * @precision solid #ffffff;
      }
      .zjqs-state-right {
        width: 150 * @precision;
        text-align: center;
      }
      img {
        width: 17 * @precision;
        float: left;
      }
    }
    .zjqs-top {
      font-size: 32 * @precision;
      width: 500 * @precision;
    }
    .zjqs-middle {
      margin: 10 * @precision 0;
    }
    img {
      margin-right: 8 * @precision;
      width: 27 * @precision;
      vertical-align: middle;
    }
  }
  li:last-child {
    border-bottom: none;
  }
}
.blue span {
  background-color: #72adfa;
}
.blue span:first-child {
  border-bottom: 50 * @precision solid#72adfa;
}
.orange span {
  background-color: #ffb06a;
}
.orange span:first-child {
  border-bottom: 50 * @precision solid#ffb06a;
}
.green span {
  background-color: #48c9b0;
}
.green span:first-child {
  border-bottom: 50 * @precision solid#48c9b0;
}
.gray span {
  background-color: #adadad;
}
.gray span:first-child {
  border-bottom: 50 * @precision solid#adadad;
}
.yellow span {
  background-color: #fde059;
}
.yellow span:first-child {
  border-bottom: 50 * @precision solid#fde059;
}
.red span {
  background-color: #ff5c5c;
}
.red span:first-child {
  border-bottom: 50 * @precision solid#ff5c5c;
}
.purple span {
  background-color: #bd7bff;
}
.purple span:first-child {
  border-bottom: 50 * @precision solid#bd7bff;
}
.height98 {
  height: 100 * @precision;
}
</style>

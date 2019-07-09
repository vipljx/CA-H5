<template>
  <div class="appoint">
    <van-nav-bar left-arrow right-text="更多" @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="more" v-show="show2">
      <div class="more-top">
        <img src="../../static/images/ios/more3.png" alt />
      </div>
      <div class="more-bottom">
        <ul class="more-ul">
          <li @click="jumpA">
            <img src="../../static/images/ios/more1.png" alt />
            <a>签署信息</a>
          </li>
          <li @click="jumpB" v-if="canISign && !isFQ">
            <img src="../../static/images/ios/more2.png" alt />
            <a>拒签</a>
          </li>
          <li @click="jumpC" v-if="(canISign || taskStatus === 2) && isFQ">
            <img src="../../static/images/ios/more4.png" alt />
            <a>撤销</a>
          </li>
          <li @click="jumpD" v-if="taskStatus === 5  && isFQ">
            <img src="../../static/images/ios/more5.png" alt />
            <a>重新发起</a>
          </li>
        </ul>
      </div>
    </div>
    <section class="acc_apply">
      <ul>
        <li>
          <div class="firstdiv_m">
            <div class="seconddiv_m">
              <div
                v-for="(tmp,index) of imgList"
                :key="index"
                :style="{backgroundImage:'url('+tmp.fileUrl+')',height:high+'px'}"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <div v-if="isZD">
      <div
        v-for="tmp of signList"
        class="sign"
        :key="tmp.userId"
        :style="{left:width/640*tmp.signY+'px',top:(width/640*tmp.signX)+46+'px',width:width/640*120+'px'}"
        v-show="tmp.isFalg==0"
      >
        <div class="sign1" v-if="!tmp.sealImage">
          <div class="sign-name">{{tmp.userName}}</div>
          <div class="sign-postion">签署位置</div>
        </div>
        <div class="sign2" v-if="tmp.sealImage">
          <div class="sign-close" ref="closed" @click="close">
            <img src="../../static/images/ios/file3.png" alt />
          </div>
          <div class="sign-name">
            <img :src="tmp.sealImage" alt />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!isZD"
      class="sign"
      ref="sign2"
      :style="{left:0,top:46+'px',width:width/640*120+'px'}"
      @touchstart="down($event)"
      @touchmove="move($event)"
      @touchend="end($event)"
    >
      <div v-for="tmp of signList" :key="tmp.userId" v-show="tmp.sealImage">
        <div class="sign2">
          <div class="sign-close" ref="closed" @click="close">
            <img src="../../static/images/ios/file3.png" alt />
          </div>
          <div class="sign-name">
            <img :src="tmp.sealImage" alt />
          </div>
        </div>
      </div>
    </div>

    <div class="height130" v-if="canISign"></div>
    <!-- canISign -->
    <footer class="acc_foot" ref="foot" v-if="canISign">
      <ul class="btn-ul2 cont">
        <li>
          <button @click="select" class="bgGreen">签署</button>
        </li>
        <li>
          <button @click="next" class="bgWhite">提交</button>
        </li>
      </ul>
    </footer>

    <div class="height130" v-if="taskStatus  === 3"></div>
    <footer class="acc_foot" ref="foot" v-if="taskStatus  === 3">
      <ul class="btn-ul2 cont">
        <li>
          <button @click="download" class="bgGreen">下载</button>
        </li>
        <li>
          <button @click="give" class="bgRed">出证</button>
        </li>
      </ul>
    </footer>

    <van-popup v-model="show1" position="bottom">
      <div class="shqz">
        <div class="shqz-top">
          <img src="../../static/images/ios/shqz1.png" alt  v-show="false"/>选择签章
        </div>
        <ul class="shqz-ul">
          <li v-for="(tmp,index) of columns1" :key="index" @click="confirm(index)">
            <img :src="tmp.sealImage" alt />
          </li>
        </ul>
      </div>
    </van-popup>

    <!-- 意愿核验 -->
    <van-popup
      v-model="show3"
      position="right"
      :style="{ width: '100%',height:'100%' }"
      class="bgGray"
    >
      <verification @childSubmit="submit" @childClose="onClose"></verification>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import Verification from "@/views/sign/Verification";
import { NavBar, Popup, Picker, Button, Toast, Dialog } from "vant";

import {
  taskSignInfo,
  identityCheck,
  refuseSign,
  revokeSign
} from "@/api/fileSigning";
import { mapState } from "vuex";
import config from "@/config";
import { mkdir } from "fs";
Vue.use(NavBar)
  .use(Popup)
  .use(Picker)
  .use(Toast)
  .use(Dialog);
export default {
  name: "waitSign",
  components: {
    verification: Verification
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      columns1: [
        // {
        //   img: require("../../static/images/ios/shqz2.png"),
        //   index: 1
        // },
        // {
        //   img: require("../../static/images/ios/shqz3.png"),
        //   index: 2
        // },
        // {
        //   img: require("../../static/images/ios/shqz3.png"),
        //   index: 3
        // }
      ],
      imgList: [],
      signList: [
        // {
        //   text: "李雷",
        //   index: 1,
        //   nx: 50,
        //   ny: 100
        // },
        // {
        //   text: "韩梅梅",
        //   index: 2,
        //   nx: 185,
        //   ny: 1260
        // }
      ],
      //移动端拖拽
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",

      isZD: "",
      signUserIndex: "",
      width: 0,
      high: 0,
      taskStatus: "",
      isFQ: false,
      canISign: false,
      //提交数据
      sealId: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    //console.log(this.$route.query.taskId)
    this.loadInfo(this.$route.query.taskId, this.userInfo.userId);
    this.width = window.innerWidth;
    this.high = (window.innerWidth / 640) * 905;
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.show2 = !this.show2;
    },
    loadInfo(taskId, userId) {
      taskSignInfo(taskId, userId).then(res => {
        console.log(res);
        if (res.code === 0) {
          let info = res.data;
          this.imgList = info.signFiles;
          this.signList = info.list;
          this.columns1 = info.sealList;
          this.isZD = !!info.list[0].signX;
          // this.isZD =false;
          this.taskStatus = info.taskStatus;
          this.isFQ = info.fqId === this.userInfo.userId;
          console.log(this.isFQ);
          this.signInfo = {
            taskName: info.taskName,
            platform: info.platform,
            taskMode: ["一人签", "多人有序签", "多人无序签"][
              parseInt(info.taskMode)
            ],
            fileName: info.fileName,
            fqName: info.fqName,
            taskStartTime: info.taskStartTime,
            endTime: info.endTime,
            historyList: info.historyList
          };
          //当前人在签章人列表下标
          this.signList.forEach((item, index) => {
            if (item.userId === this.userInfo.userId) {
              this.signUserIndex = index;
            }
          });

          this.canISign = this.taskStatus === 1;
        }
      });
    },

    confirm(i) {
      console.log(this.columns1[i]);
      this.signList[this.signUserIndex].sealImage = this.columns1[i].sealImage;
      this.sealId = this.columns1[i].sealId;
      this.show1 = false;
    },
    close() {
      this.signList[this.signUserIndex].sealImage = "";
      this.$forceUpdate();
    },
    //签署信息
    jumpA() {
      this.$router.push({
        path: "/Information",
        query: {
          taskId: this.$route.query.taskId
        }
      });
    },
    //拒签
    jumpB() {
      this.$router.push({
        path: "/deny",
        query: {
          taskId: this.$route.query.taskId
        }
      });
    },
    //撤销
    jumpC() {
      Dialog.alert({
        title: "提示",
        message: "确定要撤销此项签署吗？",
        showCancelButton: true
      })
        .then(() => {
          let data = {
            taskId: this.$route.query.taskId,
            userId: this.userInfo.userId
          };
          revokeSign(data).then(res => {
            console.log(res);
            if (res.code === 0) {
              Toast("操作成功");
              sessionStorage.setItem("active", 1);
              this.$router.push("/document");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
      return;
    },
    //重新发起
    jumpD() {
      this.$router.push({
        path: "/Initiation",
        query: {
          taskId: this.$route.query.taskId
        }
      });
    },
    //选择位置
    select() {
      this.show1 = true;
    },

    // 实现移动端拖拽
    down(e) {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }

      this.maxW =
        document.body.clientWidth -
        e.currentTarget.offsetWidth -
        this.$refs.closed[0].offsetWidth / 2;

      this.maxH =
        document.body.clientHeight -
        e.currentTarget.offsetHeight -
        this.$refs.foot.offsetHeight;
      this.position.x = touch.clientX - e.currentTarget.offsetLeft;
      this.position.y = touch.clientY - e.currentTarget.offsetTop;
      this.dx = touch.clientX;
      this.dy = touch.clientY;
    },
    move(e) {
      event.preventDefault();
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 46) {
          this.ny = 46;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
        }

        e.currentTarget.style.left = this.nx + "px";
        e.currentTarget.style.top = this.ny + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function() {
            // event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end(e) {
      this.flags = false;
    },
    //下一步
    next() {
      if (!this.sealId) {
        Toast("请先完成签署");
        return;
      }
      this.show3 = true;
      // this.$router.push("/Verification");
    },
    onClose() {
      this.show3 = false;
    },
    submit(msg, type) {
      console.log(this.isZD);

      let imgX = this.isZD
        ? this.signList[this.signUserIndex].signY
        : (parseFloat(this.$refs.sign2.style.left) / this.width) * 640;
      let imgY = this.isZD
        ? this.signList[this.signUserIndex].signX
        : ((parseFloat(this.$refs.sign2.style.top) - 46) / this.width) * 640;
      let data = {
        sealId: this.sealId,
        taskId: this.$route.query.taskId,
        userId: this.userInfo.userId,

        imgX: parseFloat(imgX),
        imgY: parseFloat(imgY) + 120,
        type: type,
        msg: msg,
        phone: this.userInfo.userPhone
      };
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      identityCheck(data).then(res => {
        Toast.clear();
        //console.log(res);
        if (res.code === 0) {
          Toast(res.msg);
          sessionStorage.setItem("active", 1);
          this.$router.push("/document");
        } else {
          Toast(res.msg);
        }
      });
    },
    //下载
    download() {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev
          : config.baseUrl.pro;
      window.open(
        baseUrl +
          "/certificate/certificateouthistory/pdfDownload?taskId=" +
          this.$route.query.taskId +
          "&userId" +
          this.userInfo.userId
      );
    },
    //出证
    give() {
      sessionStorage.setItem("active", 2);
      this.$router.push("/evidence");
    }
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  display: block !important;
}
.more {
  width: 320 * @precision;
  position: absolute;
  z-index: 29;
  top: 46px;
  right: 24 * @precision;

  .more-top {
    text-align: right;
    height: 16 * @precision;
  }
  .more-bottom {
    background: #4c4c4c;
    border-radius: 8px;
    .more-ul {
      width: 80%;
      margin: 0 auto;
      li {
        text-align: left;
        color: #ffffff;
        padding: 30 * @precision 0;
        display: flex;
        align-items: center;
        img {
          width: 32 * @precision;
          margin-right: 30 * @precision;
        }
      }
    }
  }
}
.shqz {
  .shqz-top {
    color: #484848;
    font-size: 34 * @precision;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15*@precision 0;
    img {
      width: 31 * @precision;
      padding: 20 * @precision 0;
    }
  }
  .shqz-ul {
    li {
      border-top: 1px solid #dfdfdf;
      text-align: center;
      img {
        height: 120 * @precision;
      }
    }
  }
}
button {
  padding: 0;
  margin: 0;
}
.appoint {
  background: #f2f2f2;
  font-size: 30 * @precision;
  min-height: 100vh;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.height130 {
  height: 130 * @precision;
}
.sign {
  position: absolute;
  z-index: 19;
  left: 30%;
  top: 50%;
  text-align: center;
  .sign1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ff5e17;
    background: #feede6;
    border: 1px dashed #ff824b;
    font-size: 28 * @precision;
    padding: 5 * @precision 0;
    height: auto;
    .sign-postion {
      margin-top: 5 * @precision;
    }
    .sign-close {
      position: absolute;
      right: -13 * @precision;
      top: -13 * @precision;
      width: 26 * @precision;
      img {
        width: 100%;
      }
    }
  }
  .sign2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 28 * @precision;
    padding: 5 * @precision 0;
    height: auto;
    text-align: center;
    .sign-name {
      img {
        width: 100%;
      }
    }
    .sign-close {
      position: absolute;
      right: -13 * @precision;
      top: -13 * @precision;
      width: 26 * @precision;
      img {
        width: 100%;
      }
    }
  }
}

.acc_foot {
  width: 100%;
  height: 130 * @precision;
  position: fixed;
  z-index: 29;
  bottom: 0;
  background: #ffffff;
  .btn-ul2 {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      width: 312 * @precision;
    }
    li button {
      width: 100%;
      height: 90 * @precision;
      line-height: 90 * @precision;

      font-size: 34 * @precision;
      color: #ffffff;
      border-radius: 15 * @precision;
      box-sizing: border-box;
    }

    .bgGreen {
      background: #1abc9c;
      border: 1px solid #1abc9c;
    }
    .bgWhite {
      background: #ffffff;
      border: 1px solid #1abc9c;
      color: #1abc9c;
    }
    .bgRed {
      background: #fe6a6a;
      border: 1px solid #fe6a6a;
    }
  }
}
</style>
<style lang="less">
.seconddiv_m {
  margin: 0 auto;
  position: relative;
  div {
    background-size: cover;
    width: 100%;
    height: 750/827 * 1170 * @precision;
  }
}
.firstdiv_m {
  width: 100%;
  margin: 0 auto;
  border-radius: 0px;
}
</style>

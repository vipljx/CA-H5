<template>
  <div class="appoint">
    <van-nav-bar />
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

    <div
      class="sign"
      ref="sign"
      @touchstart="down($event)"
      @touchmove="move($event,index)"
      @touchend="end($event)"
      v-for="(tmp,index) of signList"
      :key="index"
      :style="{left:tmp.nx+'px',top:tmp.ny+'px',width:width/640*120+'px'}"
    >
      <div class="sign-close" ref="closed" @click="close(index)">
        <img src="../../static/images/ios/file3.png" alt />
      </div>
      <div class="sign-name">{{tmp.userName}}</div>
      <div class="sign-postion">签署位置</div>
    </div>
    <div class="height130"></div>

    <footer class="acc_foot" ref="foot">
      <ul class="btn-ul2 cont">
        <li>
          <button @click="select">设置位置</button>
        </li>
        <li>
          <button @click="next">发起签署</button>
        </li>
      </ul>
    </footer>

    <van-popup v-model="show1" position="bottom">
      <van-picker
        title="选择签署人"
        :columns="columns1"
        value-key="userName"
        show-toolbar
        @cancel="show1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { NavBar, Popup, Picker, Button, Toast } from "vant";
import { launchSignPosition } from "@/api/fileSigning";
Vue.use(NavBar)
  .use(Popup)
  .use(Picker);

export default {
  name: "appoint",
  data() {
    return {
      show1: false,
      columns1: [],
      imgList: [],
      signList: [],
      //移动端拖拽
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      taskId: "",
      width: 0,
      high: 0
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    let info = JSON.parse(localStorage.getItem("signInfo"));
    this.imgList = info.signFileList;
    this.taskId = info.taskId;
    this.columns1 = info.userList;
    console.log(window);
    this.width = window.innerWidth;
    this.high = (window.innerWidth / 640) * 905;
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //选择位置
    select() {
      this.show1 = true;
    },
    onConfirm1(value) {
      console.log(value);
      this.show1 = false;
      for (var tmp of this.signList) {
        if (tmp.userId == value.userId) {
          Toast("该签署人已指定过位置！");
          return;
        }
      }
      value.nx = 0;
      value.ny = 46;
      this.signList.push(value);
    },
    close(index) {
      this.signList.splice(index, 1);
      console.log(this.signList);
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
    move(e, index) {
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

        this.signList[index].nx = this.nx;
        this.signList[index].ny = this.ny;
        this.$forceUpdate();
        // e.currentTarget.style.left = this.nx + "px";
        // e.currentTarget.style.top = this.ny + "px";
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
    end(e, index) {
      this.flags = false;
    },
    //发起签署
    next() {
      if (this.columns1.length !== this.signList.length) {
        Toast("请为所有签署人指定签署位置");
        return;
      }
      this.request();
    },
    request() {
      let arr = [];
      this.columns1.forEach((item, index) => {
        arr.push({
          signX: (this.signList[index].ny - 46) / this.width * 640,
          signY: this.signList[index].nx / this.width * 640,
          signUserId: item.signUserId
        });
      });

      let data = {
        // list: JSON.stringify(list),
        str: JSON.stringify(arr),
        taskId: this.taskId,
        userId: this.userInfo.userId
      };
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      launchSignPosition(data).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code === 0) {
          this.$router.push({
            path: "/waitSign",
            query: {
              taskId: this.taskId
            }
          });
        } else {
          Toast(res.msg);
        }
        
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar{display: block!important}
.van-hairline--bottom::after{
  border: 0;
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
  left: 30%;
  top: 50%;

  z-index: 19;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ff5e17;
  background: #feede6;
  border: 1px dashed #ff824b;
  font-size: 28* @precision;
  padding: 5* @precision 0;
  height: auto;
  text-align: center;
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
    li:first-child button {
      width: 100%;
      height: 90 * @precision;
      line-height: 90 * @precision;
      background: #1abc9c;
      font-size: 34 * @precision;
      color: #ffffff;
      border: 1px solid #8dddcd;
      border-radius: 15 * @precision;
      box-sizing: border-box;
    }
    li:last-child button {
      width: 100%;
      height: 90 * @precision;
      line-height: 90 * @precision;
      background: #ffffff;
      font-size: 34 * @precision;
      color: #1abc9c;
      border: 1px solid #8dddcd;
      border-radius: 15 * @precision;
      box-sizing: border-box;
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
  }
}
.firstdiv_m {
  width: 100%;
  margin: 0 auto;
  border-radius: 0px;
}
</style>

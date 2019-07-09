<template>
  <div class="list">
    <van-nav-bar title="证据" left-text left-arrow @click-left="onClickLeft" />
    <van-search
      v-model="taskName"
      placeholder="请输入签署任务名称"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs v-model="active" title-active-color="#1abc9c" @click="onClick">
      <van-tab title="存证记录">
        <ul class="zjqs" ref="zjqs">
          <div class="none" v-if="list.length===0">
            <div class="none-tp">
              <img src="../../static/images/ios/none1.png" alt />
            </div>
            <div class="none-bt">暂无数据哦~</div>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list.length==0?'':'没有更多了'"
            @load="onLoad1"
          >
            <li v-for="(tmpB,index) in list" :key="tmpB.taskId" @click="jumpA(index)">
              <div class="cont">
                <div :class="['zjqs-state',outEvidenceStatus[tmpB.outEvidenceStatus].color]">
                  <span class="zjqs-state-left"></span>
                  <span class="zjqs-state-right">{{outEvidenceStatus[tmpB.outEvidenceStatus].name}}</span>
                </div>
                <div class="zjqs-top">{{tmpB.taskName}}</div>
                <div class="zjqs-middle">
                  <img src="../../static/images/ios/发起人@2x.png" alt class="zjqs-ico1" />
                  {{tmpB.userName}}（{{tmpB.taskStartTime}} 发起）
                </div>
                <div class="zjqs-bottom">
                  <img src="../../static/images/ios/签字@2x.png" alt class="zjqs-ico2" />
                  {{tmpB.qsName}}
                </div>
              </div>
            </li>
          </van-list>
        </ul>
        <div class="height98" v-if="list.length!==0"></div>
      </van-tab>
      <van-tab title="出证记录">
        <ul class="zjqs" ref="zjqs">
          <div class="none" v-if="list2.length===0">
            <div class="none-tp">
              <img src="../../static/images/ios/none1.png" alt />
            </div>
            <div class="none-bt">暂无数据哦~</div>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list2.length==0?'':'没有更多了'"
            @load="onLoad2"
          >
            <li v-for="(tmpB,index) in list2" :key="tmpB.taskId" @click="jumpB(index)">
              <div class="cont">
                <div :class="['zjqs-state',outStatus[tmpB.outStatus].color]">
                  <span class="zjqs-state-left"></span>
                  <span class="zjqs-state-right">{{outStatus[tmpB.outStatus].name}}</span>
                </div>
                <div class="zjqs-top">{{tmpB.taskName}}</div>
                <div class="zjqs-middle">
                  <img src="../../static/images/ios/申请图标@2x.png" alt class="zjqs-ico1" />
                  {{tmpB.userName}}（{{tmpB.createTime}} 发起）
                </div>
                <div class="zjqs-bottom">
                  <img src="../../static/images/ios/电子证据@2x.png" alt class="zjqs-ico2" />
                  {{outTypes[tmpB.outType]}}
                </div>
              </div>
            </li>
          </van-list>
        </ul>
        <div class="height98" v-if="list2.length!==0"></div>
      </van-tab>
       
    </van-tabs>
    
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Search, Tab, Tabs, List, Cell, Button, Toast } from "vant";
import { mapState } from "vuex";
import { depositCertificate } from "@/api/list";
import { showAllProve } from "@/api/list";
Vue.use(NavBar)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell)
  .use(Button)
  .use(Toast);
export default {
  name: "evidence",
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      list2: [],
      signStatus2: [
        {
          status: "",
          name: "存证记录"
        },
        {
          status: 1,
          name: "出证记录"
        }
      ],
      outStatus: [
        {
          name: "处理中",
          color: "blue"
        },
        {
          name: "通过",
          color: "green"
        }
      ],
      outEvidenceStatus: [
        {
          name: "未出证",
          color: "gray"
        },
        {
          name: "已出证",
          color: "blue"
        }
      ],
      outTypes: ["电子证据", "纸质证据"],
      current: 0,
      taskName: "",
      param1: {
        userId: "",
        taskName: "",
        userName: "",
        outType: "",
        outStatus: "",
        startTime: "",
        endTime: "",
        size: 10,
        current: 0
      },
      param2: {
        userId: "",
        taskName: "",
        userName: "",
        outType: "",
        outStatus: "",
        startTime: "",
        endTime: "",
        size: 10,
        current: 0
      },
      innerHeight:0
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.param1.userId = this.userInfo.userId;
    this.param2.userId = this.userInfo.userId;
    if (this.$route.query.where == 1) {
      this.active = 1;
    }
    this.innerHeight=localStorage.getItem("innerHeight") || window.innerHeight
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.zjqs.style.height =
        this.innerHeight - 44 - 54 - 50 + "px";
    });
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch() {
      //console.log(this.active);
      if (this.active == 1) {
        this.param2.taskName = this.taskName;
        this.list2 = [];
        this.init2();
      } else {
        this.param1.taskName = this.taskName;
        this.list = [];
        this.init1();
      }
    },
    onClick(index, title) {
      this.$nextTick(() => {
        this.$refs.zjqs.style.height =
          this.innerHeight- 44 - 54 - 50 + "px";
      });
      this.taskName = "";
      this.current = 0;
      if (index === 1) {
        this.param2.taskName = "";
        this.list2 = [];
        this.onLoad2();
      } else {
        this.param1.taskName = "";
        this.list = [];
        this.onLoad1();
      }
    },
    onLoad1() {
      // console.log(1)
      this.current++;
      this.param1.current = this.current;
      this.init1();
    },
    //初始化列表
    init1() {
      depositCertificate(this.param1).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.loading = false;
          this.finished = res.data.current * res.data.size >= res.data.total;
          this.list = this.list.concat(res.data.records);
          console.log(this.list);
        }
      });
    },
    onLoad2() {
      //console.log(2)
      this.current++;
      this.param2.current = this.current;
      this.init2();
    },
    //初始化列表
    init2() {
      showAllProve(this.param2).then(res => {
        //console.log(res)
        if (res.code === 0) {
          this.loading = false;
          this.finished = res.data.current * res.data.size >= res.data.total;
          this.list2 = this.list2.concat(res.data.records);
          console.log(this.list2);
        }
      });
    },
    //未出证跳转
    jumpA(i) {
      if (this.userInfo.isAuth === 0) {
        Toast("请先完成实名认证");
        return;
      }
      if (this.list[i].outEvidenceStatus === 0) {
        this.$router.push({
          path: "/apply",
          query: {
            storeHistoryId: this.list[i].storeHistoryId,
            taskId: this.list[i].taskId
          }
        });
      }
      console.log(this.list[i]);
    },
    //出证详情
    jumpB(i) {
      if (this.userInfo.isAuth === 0) {
        Toast("请先完成实名认证");
        return;
      }
      this.$router.push({
        path: "/detail"
      });
      localStorage.setItem("detail", JSON.stringify(this.list2[i]));
      console.log(this.list2[i]);
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  background: #ffffff;
}
.van-nav-bar .van-icon {
  color: #333333;
}
.van-search {
  background: #f2f2f2 !important;
}
.van-search__content {
  background: #fff;
}
.van-search__action {
  color: #4f99f9;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.none {
  background: #ffffff;
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


<style lang="less">
.list .van-tabs__line {
  background-color: #1abc9c !important;
}
.list .van-tabs--line .van-tabs__wrap {
  border-bottom: 1px solid #f2f2f2;
}
</style>

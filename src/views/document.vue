<template>
  <div class="document">
    <van-nav-bar title="文档" left-text left-arrow @click-left="onClickLeft" />
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
      <van-tab :title="tmpA.name" v-for="(tmpA,index) in signStatus2" :key="index">
        <ul class="zjqs" ref="zjqs">
          <div class="none" v-if="list.length===0">
            <div class="none-tp">
              <img src="../static/images/ios/none1.png" alt />
            </div>
            <div class="none-bt">暂无数据哦~</div>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list.length==0?'':'没有更多了'"
            @load="onLoad"
          >
            <li v-for="(tmpB,index2) in list" :key="tmpB.taskId" @click="jumpA(index2)">
              <div class="cont">
                <div :class="['zjqs-state',signStatus[tmpB.taskStatus].color]">
                  <span class="zjqs-state-left"></span>
                  <span class="zjqs-state-right">{{signStatus[tmpB.taskStatus].name}}</span>
                </div>
                <div class="zjqs-top">{{tmpB.taskName}}</div>
                <div class="zjqs-middle">
                  <img src="../static/images/ios/发起人@2x.png" alt class="zjqs-ico1" />
                  {{tmpB.userName}}（{{tmpB.taskStartTime}} 发起）
                </div>
                <div class="zjqs-bottom">
                  <img src="../static/images/ios/签字@2x.png" alt class="zjqs-ico2" />
                  {{tmpB.qsName}}
                </div>
              </div>
            </li>
          </van-list>
        </ul>
      </van-tab>
    </van-tabs>
     <div class="height98" v-if="list.length!==0"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Search, Tab, Tabs, List, Cell, Button, Toast } from "vant";
import { mapState } from "vuex";
import { signList } from "@/api/fileSigning";
import signStatus from "@/libs/signStatus";
Vue.use(NavBar)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell)
  .use(Button)
  .use(Toast);
export default {
  name: "document",
  data() {
    return {
      active: 0,
      index: 0,
      taskName: "",
      loading: false,
      finished: false,
      list: [],
      signStatus,
      signStatus2: [
        {
          status: "",
          name: "全部"
        },
        {
          status: 1,
          name: "待我签"
        },
        {
          status: 2,
          name: "待他人签"
        },
        {
          status: 3,
          name: "已完成"
        },
        {
          status: 4,
          name: "已过期"
        },
        {
          status: 5,
          name: "已撤销"
        },
        {
          status: 6,
          name: "已拒签"
        },
        {
          status: 0,
          name: "草稿"
        }
      ],
      current: 0,
      innerHeight:0
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    if (this.$route.query.index) {
      this.active = this.$route.query.index;
      this.index = this.$route.query.index;
      // this.list =[];
    }
    this.innerHeight=localStorage.getItem("innerHeight") || window.innerHeight
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.zjqs);
      this.$refs.zjqs[0].style.height =
        this.innerHeight  - 44 - 54 - 50 + "px";
    });
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch() {
      this.list = [];
      this.init(this.signStatus2[this.index].status);
    },
    //点击跳转
    jumpA(i) {
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
    onLoad() {
      this.current++;
      console.log(this.current);
      this.init(this.signStatus2[this.index].status);
    },
    //标签页切换
    onClick(index, title) {
     // console.log(this.$refs.zjqs)
      this.$nextTick(() => {
        this.$refs.zjqs[index].style.height =
          this.innerHeight - 44 - 54 - 50 + "px";
      });
      this.index = index;
      this.taskName="";
      this.list = [];
      this.current = 1;
      this.init(this.signStatus2[this.index].status);
    },
    //初始化列表
    init(type = "") {
      signList(
        this.userInfo.userId,
        "",
        this.taskName,
        type,
        "",
        "",
        10,
        this.current
      ).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.loading = false;
          this.finished =
            res.data.object.current * res.data.object.size >=
            res.data.object.total;

          this.list = this.list.concat(res.data.object.records);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.document {
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
  overflow-y: auto;
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
.document .van-tabs__line {
  background-color: #1abc9c !important;
}
.document .van-tabs--line .van-tabs__wrap {
  border-bottom: 1px solid #f2f2f2;
}
</style>
